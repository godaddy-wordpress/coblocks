/**
 * External dependencies
 */
import classnames from 'classnames';
import { get, isEqual, isUndefined, pickBy } from 'lodash';
import { PostCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import InspectorControls from './inspector';
import Swiper from '../../components/swiper';
import PostItem from './post-item';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
// Disable reason: We choose to use unsafe APIs in our codebase.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { useDispatch, withSelect } from '@wordpress/data';
import { BlockControls } from '@wordpress/block-editor';
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
		clientId,
	} = props;

	const {
		displayPostContent,
		displayPostDate,
		displayPostLink,
		externalRssUrl,
		postFeedType,
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
			onClick: () => setEditing( true ),
			title: __( 'Edit RSS URL', 'coblocks' ),
		},
	];

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

	const displayPosts = Array.isArray( latestPosts ) && latestPosts.length > postsToShow ? latestPosts.slice( 0, postsToShow ) : latestPosts;

	const renderCarousel = useMemo( () => {
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
						list={ displayPosts || [] }
						loop={ false }
						navigation
						slidesPerView={ columns }
					>
						{ ( { index: i, item: post } ) => {
							return (
								<PostItem clientId={ clientId } key={ i } post={ post } setAttributes={ setAttributes } />
							);
						} }
					</Swiper>
				</div>
			</>
		);
	}, [ columns, displayPostContent, displayPostDate, displayPostLink, displayPosts ] );

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
			{ postFeedType === 'internal' && renderCarousel }
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
				exclude: currentPost.id,
				order,
				orderby: orderBy,
				per_page: postsToShow,
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
