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
import { Component, RawHTML, Fragment } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { withSelect } from '@wordpress/data';
import { BlockControls, PlainText } from '@wordpress/block-editor';
import {
	Button,
	Disabled,
	Icon,
	Placeholder,
	QueryControls,
	ServerSideRender,
	Spinner,
	TextControl,
	Toolbar,
} from '@wordpress/components';
import { edit } from '@wordpress/icons';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};

class PostCarousel extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			categoriesList: [],
			editing: ! this.props.attributes.externalRssUrl,
		};

		this.onSubmitURL = this.onSubmitURL.bind( this );
	}

	componentDidMount() {
		this.isStillMounted = true;
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', CATEGORIES_LIST_QUERY ),
		} ).then(
			( categoriesList ) => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	componentDidUpdate() {
		const { displayPostContent, displayPostLink } = this.props.attributes;
		if ( displayPostLink && ! displayPostContent ) {
			this.props.setAttributes( {
				displayPostLink: false,
			} );
		}
	}

	onSubmitURL( event ) {
		event.preventDefault();

		const { externalRssUrl } = this.props.attributes;
		if ( externalRssUrl ) {
			this.setState( { editing: false } );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			latestPosts,
			className,
			isRTL,
		} = this.props;

		const { categoriesList } = this.state;

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

		const editToolbarControls = [
			{
				icon: edit,
				title: __( 'Edit RSS URL', 'coblocks' ),
				onClick: () => this.setState( { editing: true } ),
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
				<Fragment>
					<InspectorControls
						{ ...this.props }
						attributes={ attributes }
						hasPosts={ hasPosts }
						editing={ this.state.editing }
						categoriesList={ categoriesList }
						postCount={ latestPosts && latestPosts.length }
					/>
					<Placeholder
						icon={ <Icon icon={ icon } /> }
						label={ __( 'Post Carousel', 'coblocks' ) }
					>
						{ ! Array.isArray( latestPosts )
							? <Spinner />
							: <Fragment>
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
							</Fragment>
						}
					</Placeholder>
				</Fragment>
			);
		}

		if ( this.state.editing && postFeedType === 'external' ) {
			return (
				<Fragment>
					<InspectorControls
						{ ...this.props }
						attributes={ attributes }
						hasPosts={ hasPosts }
						editing={ this.state.editing }
						categoriesList={ categoriesList }
						postCount={ latestPosts && latestPosts.length }
					/>
					<Placeholder
						icon={ <Icon icon={ icon } /> }
						label={ __( 'RSS Feed', 'coblocks' ) }
						instructions={ __( 'RSS URLs are generally located at the /feed/ directory of a site.', 'coblocks' ) }
					>
						<form onSubmit={ this.onSubmitURL }>
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
				</Fragment>
			);
		}

		return (
			<Fragment>
				<InspectorControls
					{ ...this.props }
					attributes={ attributes }
					hasPosts={ hasPosts }
					editing={ this.state.editing }
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
						attributes={ this.props.attributes }
						className="coblocks-slick pb-8"
					/>
				}
				{ postFeedType === 'internal' &&
					<Fragment>
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
					</Fragment>
				}
			</Fragment>
		);
	}
}

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
				? categories.map( ( cat ) => cat.id )
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
