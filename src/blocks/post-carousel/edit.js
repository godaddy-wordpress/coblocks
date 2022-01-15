/**
 * External dependencies
 */
import classnames from 'classnames';
import Slick from 'react-slick';
import { get, isEqual, isUndefined, pickBy } from 'lodash';
import { PostCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import InspectorControls from './inspector';
import Swiper from '../../components/swiper';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RawHTML, useEffect, useRef, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
// Disable reason: We choose to use unsafe APIs in our codebase.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalGetSettings, dateI18n, format } from '@wordpress/date';
import { useDispatch, withSelect } from '@wordpress/data';
import { BlockControls, PlainText } from '@wordpress/block-editor';
import {
	Button,
	Disabled,
	Icon,
	Placeholder,
	QueryControls,
	Spinner,
	TextControl,
	Toolbar,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { edit } from '@wordpress/icons';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};

const PostCarousel = ( props ) => {
	const {
		attributes,
		setAttributes,
		latestPosts,
		className,
		isRTL,
		clientId,
	} = props;

	const {
		displayPostContent,
		displayPostDate,
		displayPostLink,
		excerptLength,
		externalRssUrl,
		postFeedType,
		postLink,
		postsToShow,
		columns,
		align,
	} = attributes;

	const [ categoriesList, setCategoriesList ] = useState( [] );
	const [ editing, setEditing ] = useState( externalRssUrl );

	const { selectBlock } = useDispatch( 'core/block-editor' );

	let isStillMounted = useRef( true );

	useEffect( () => {
		apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', CATEGORIES_LIST_QUERY ),
		} ).then(
			( newCategoriesList ) => {
				if ( isStillMounted ) {
					setCategoriesList( newCategoriesList );
				}
			}
		).catch(
			() => {
				if ( isStillMounted ) {
					setCategoriesList( [] );
				}
			}
		);

		return () => {
			isStillMounted = false;
		};
	}, [] );

	useEffect( () => {
		if ( displayPostLink && ! displayPostContent ) {
			setAttributes( {
				displayPostLink: false,
			} );
		}
	}, [ displayPostLink, displayPostContent ] );

	const onSubmitURL = ( event ) => {
		event.preventDefault();

		if ( externalRssUrl ) {
			setEditing( false );
		}
	};

	const handleSelectBlock = () => {
		selectBlock( clientId );
	};

	const editToolbarControls = [
		{
			icon: edit,
			title: __( 'Edit RSS URL', 'coblocks' ),
			onClick: () => setEditing( true ),
		},
	];

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

	const displayPosts = Array.isArray( latestPosts ) && latestPosts.length > postsToShow ? latestPosts.slice( 0, postsToShow ) : latestPosts;

	const dateFormat = __experimentalGetSettings().formats.date; // eslint-disable-line no-restricted-syntax

	const renderCarousel = () => {
		return (
			<>
				<div
					className={ classnames( className, {
						[ `align${ align }` ]: align,
					} ) }
					onClick={ handleSelectBlock }
					onKeyDown={ handleSelectBlock }
					role="button"
					tabIndex="0"
				>
					<Swiper
						list={ displayPosts }
						navigation
						slidesPerView={ columns }
					>
						{ ( { index: i, item: post } ) => {
							const featuredImageUrl = post.featured_media_object ? post.featured_media_object.source_url : null;
							const featuredImageStyle = 'url(' + featuredImageUrl + ')';
							const titleTrimmed = post.title.rendered.trim();

							let excerpt = post.excerpt.rendered;
							if ( post.excerpt.raw === '' ) {
								excerpt = post.content.raw;
							}
							const excerptElement = document.createElement( 'div' );

							excerptElement.innerHTML = excerpt;
							excerpt = excerptElement.textContent || excerptElement.innerText || '';

							return (
								<div className="wp-block-coblocks-post-carousel__item" key={ i }>
									{ featuredImageUrl &&
									<div className="wp-block-coblocks-post-carousel__image">
										<div className="bg-cover bg-center-center" style={ { backgroundImage: featuredImageStyle } }></div>
									</div>
									}
									<div className={ classnames( 'wp-block-coblocks-post-carousel__content', {
										'full-height': ! featuredImageUrl,
									} ) }>
										{ displayPostDate && post.date_gmt &&
										<time className="wp-block-coblocks-post-carousel__date" dateTime={ format( 'c', post.date_gmt ) }>
											{ dateI18n( dateFormat, post.date_gmt ) }
										</time>
										}
										<Disabled>
											<a alt={ titleTrimmed } href={ post.link } rel="noreferrer noopener" target="_blank">
												{ titleTrimmed ? (
													<RawHTML>
														{ titleTrimmed }
													</RawHTML>
												)
												/* translators: placeholder when a post has no title */
													: __( '(no title)', 'coblocks' )
												}
											</a>
										</Disabled>
										{ displayPostContent &&
										<div className="wp-block-coblocks-post-carousel__excerpt">
											<RawHTML
												key="html"
											>
												{ excerpt.trim().split( ' ', excerptLength ).join( ' ' ) }
											</RawHTML>
										</div>
										}
										{ displayPostLink &&
										<PlainText
											className="wp-block-coblocks-post-carousel__more-link"
											onChange={ ( newPostLink ) => setAttributes( { postLink: newPostLink } ) }
											placeholder={ __( 'Read more', 'coblocks' ) }
											value={ postLink }
										/>
										}
									</div>
								</div>
							);
						} }
					</Swiper>
				</div>
			</>
		);
	};

	if ( ! hasPosts && postFeedType === 'internal' ) {
		return (
			<>
				<InspectorControls
					{ ...props }
					attributes={ attributes }
					categoriesList={ categoriesList }
					editing={ editing }
					hasPosts={ hasPosts }
					postCount={ latestPosts && latestPosts.length }
				/>
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					label={ __( 'Post Carousel', 'coblocks' ) }
				>
					{ ! Array.isArray( latestPosts )
						? <Spinner />
						: <>
							{ __( 'No posts found. Start publishing or add posts from an RSS feed.', 'coblocks' ) }
							<Button
								className="components-placeholder__cancel-button"
								isSecondary
								onClick={ () => {
									setAttributes( { postFeedType: 'external' } );
								} }
								title={ __( 'Retrieve an external feed', 'coblocks' ) }
							>
								{ __( 'Use External Feed', 'coblocks' ) }
							</Button>
						</>
					}
				</Placeholder>
			</>
		);
	}

	if ( editing && postFeedType === 'external' ) {
		return (
			<>
				<InspectorControls
					{ ...props }
					attributes={ attributes }
					categoriesList={ categoriesList }
					editing={ editing }
					hasPosts={ hasPosts }
					postCount={ latestPosts && latestPosts.length }
				/>
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					instructions={ __( 'RSS URLs are generally located at the /feed/ directory of a site.', 'coblocks' ) }
					label={ __( 'RSS Feed', 'coblocks' ) }
				>
					<form onSubmit={ onSubmitURL }>
						<TextControl
							className={ 'components-placeholder__input' }
							onChange={ ( value ) => setAttributes( { externalRssUrl: value } ) }
							placeholder={ __( 'https://example.com/feed…', 'coblocks' ) }
							value={ externalRssUrl }
						/>
						<Button disabled={ ! externalRssUrl } type="submit">
							{ __( 'Use URL', 'coblocks' ) }
						</Button>
					</form>
				</Placeholder>
			</>
		);
	}

	return (
		<>
			<InspectorControls
				{ ...props }
				attributes={ attributes }
				categoriesList={ categoriesList }
				editing={ editing }
				hasPosts={ hasPosts }
				postCount={ latestPosts && latestPosts.length }
			/>
			<BlockControls>
				{ postFeedType === 'external' &&
					<Toolbar
						controls={ editToolbarControls }
					/>
				}
			</BlockControls>
			{ postFeedType === 'external' &&
				<ServerSideRender
					attributes={ attributes }
					block="coblocks/post-carousel"
					className="coblocks-slick pb-8"
				/>
			}
			{ postFeedType === 'internal' && renderCarousel() }
		</>
	);
};

export default compose( [
	withSelect( ( select, props ) => {
		const { postsToShow, order, orderBy, categories, categoryRelation } = props.attributes;
		const { getEntityRecords, getMedia } = select( 'core' );
		const { getEditorSettings, getCurrentPost } = select( 'core/editor' );

		const { isRTL } = getEditorSettings();
		const currentPost = getCurrentPost();

		const useUpdatedQueryControls = QueryControls.toString().includes( 'selectedCategories' );

		const deprecatedQuery = () => {
			const latestPostsQuery = pickBy( {
				categories,
				order,
				orderby: orderBy,
				per_page: postsToShow,
				exclude: currentPost.id,
			}, ( value ) => ! isUndefined( value ) );

			let latestPosts = getEntityRecords( 'postType', 'post', latestPostsQuery );
			if ( latestPosts ) {
				latestPosts = latestPosts.map( ( post ) => {
					return {
						...post,
						featured_media_object: post.featured_media && select( 'core' ).getMedia( post.featured_media ),
					};
				} );
			}
			return latestPosts;
		};

		const updatedQuery = () => {
			const catIds = categories && categories.length > 0
				? categories.map( ( cat ) => cat?.id )
				: [];

			const latestPostsQuery = pickBy( {
				categories: catIds,
				order,
				orderby: orderBy,
				per_page: 'and' === categoryRelation ? '-1' : postsToShow,
				exclude: currentPost.id,
			}, ( value ) => ! isUndefined( value ) );

			let latestPosts = getEntityRecords( 'postType', 'post', latestPostsQuery );

			if ( 'and' === categoryRelation && latestPosts ) {
				latestPosts = latestPosts.filter( ( post ) =>
					// `concat` to prevent mutation `sort` to ensure order is consistent.
					isEqual( post.categories.concat().sort(), catIds.concat().sort() ) )
					.slice( 0, postsToShow );
			}

			return ! Array.isArray( latestPosts )
				? latestPosts
				: latestPosts.map( ( post ) => {
					if ( post.featured_media ) {
						const image = getMedia( post.featured_media );
						let url = get(
							image,
							[
								'media_details',
								'sizes',
								'source_url',
							],
							null
						);
						if ( ! url ) {
							url = get( image, 'source_url', null );
						}
						return { ...post, featuredImageSourceUrl: url };
					}
					return post;
				} );
		};

		return {
			latestPosts: useUpdatedQueryControls ? updatedQuery() : deprecatedQuery(),
			useUpdatedQueryControls,
			isRTL,
		};
	} ),
] )( PostCarousel );
