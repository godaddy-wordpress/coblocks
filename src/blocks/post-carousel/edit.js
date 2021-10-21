/**
 * External dependencies
 */
import classnames from 'classnames';
import Slick from 'react-slick';
import { isUndefined, pickBy, get, isEqual } from 'lodash';
import { PostCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import InspectorControls from './inspector';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RawHTML, useState, useRef, useEffect } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
// Disable reason: We choose to use unsafe APIs in our codebase.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { withSelect } from '@wordpress/data';
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

	const editToolbarControls = [
		{
			icon: edit,
			title: __( 'Edit RSS URL', 'coblocks' ),
			onClick: () => setEditing( true ),
		},
	];

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

	const displayPosts = Array.isArray( latestPosts ) && latestPosts.length > postsToShow ? latestPosts.slice( 0, postsToShow ) : latestPosts;

	const slickSettings = {
		dots: false,
		arrows: true,
		infinite: true,
		draggable: true,
		adaptiveHeight: false,
		speed: 500,
		slidesToShow: columns,
		slidesToScroll: isRTL ? -1 : 1,
		rtl: isRTL ? true : false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const dateFormat = __experimentalGetSettings().formats.date; // eslint-disable-line no-restricted-syntax

	if ( ! hasPosts && postFeedType === 'internal' ) {
		return (
			<>
				<InspectorControls
					{ ...props }
					attributes={ attributes }
					hasPosts={ hasPosts }
					editing={ editing }
					categoriesList={ categoriesList }
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
								title={ __( 'Retrieve an external feed', 'coblocks' ) }
								isSecondary
								onClick={ () => {
									setAttributes( { postFeedType: 'external' } );
								} }
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
					hasPosts={ hasPosts }
					editing={ editing }
					categoriesList={ categoriesList }
					postCount={ latestPosts && latestPosts.length }
				/>
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					label={ __( 'RSS Feed', 'coblocks' ) }
					instructions={ __( 'RSS URLs are generally located at the /feed/ directory of a site.', 'coblocks' ) }
				>
					<form onSubmit={ onSubmitURL }>
						<TextControl
							placeholder={ __( 'https://example.com/feed…', 'coblocks' ) }
							value={ externalRssUrl }
							onChange={ ( value ) => setAttributes( { externalRssUrl: value } ) }
							className={ 'components-placeholder__input' }
						/>
						<Button type="submit" disabled={ ! externalRssUrl }>
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
				hasPosts={ hasPosts }
				editing={ editing }
				categoriesList={ categoriesList }
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
					block="coblocks/post-carousel"
					attributes={ attributes }
					className="coblocks-slick pb-8"
				/>
			}
			{ postFeedType === 'internal' &&
				<>
					<div className={ classnames( className, {
						[ `align${ align }` ]: align,
					} ) }
					>
						<Slick className="coblocks-slick pb-8" { ...slickSettings }>
							{ displayPosts.map( ( post, i ) => {
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
												<time dateTime={ format( 'c', post.date_gmt ) } className="wp-block-coblocks-post-carousel__date">
													{ dateI18n( dateFormat, post.date_gmt ) }
												</time>
											}
											<Disabled>
												<a href={ post.link } target="_blank" rel="noreferrer noopener" alt={ titleTrimmed }>
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
													value={ postLink }
													placeholder={ __( 'Read more', 'coblocks' ) }
												/>
											}
										</div>
									</div>
								);
							} ) }
						</Slick>
					</div>
				</>
			}
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
