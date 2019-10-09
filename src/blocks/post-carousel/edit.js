/**
 * External dependencies
 */
import classnames from 'classnames';
import { isUndefined, pickBy } from 'lodash';
import Slider from 'react-slick';

/**
 * Internal dependencies
 */
import InspectorControls from './inspector';
import icon from './icon';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __, _x, sprintf } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Component, RawHTML, Fragment } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { withSelect } from '@wordpress/data';
import { BlockControls, PlainText, BlockIcon } from '@wordpress/block-editor';
import {
	Placeholder,
	Spinner,
	Toolbar,
	TextControl,
	Button,
	Disabled,
	ServerSideRender,
} from '@wordpress/components';

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
			path: addQueryArgs( '/wp-json/wp/v2/categories', CATEGORIES_LIST_QUERY ),
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
		} = attributes;

		const imageClasses = classnames( 'wp-block-coblocks-blogroll__image', 'table', 'flex-0', 'relative', 'mb-2', {} );

		const editToolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit RSS URL' ),
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
			slidesToScroll: 1,
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
						icon={ <BlockIcon icon={ icon } /> }
						label={ __( 'Post Carousel' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							<Fragment>
								{ /* translators: %s: RSS */ }
								{ sprintf( __( 'No posts found. Start publishing or add posts from an %s feed.' ), 'RSS' ) }
								<Button
									className="components-placeholder__cancel-button"
									title={ __( 'Retrieve an External Feed' ) }
									isLink
									onClick={ () => {
										setAttributes( { postFeedType: 'external' } );
									} }
								>
									{ __( 'Use External Feed' ) }
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
						icon={ <BlockIcon icon={ icon } /> }
						/* translators: %s: RSS */
						label={ sprintf( __( '%s Feed' ), 'RSS' ) }
						instructions={ sprintf( __( '%s URLs are generally located at the /feed/ directory of a site.' ), 'RSS' ) }
					>
						<form onSubmit={ this.onSubmitURL }>
							<TextControl
								placeholder={ __( 'https://example.com/feed…' ) }
								value={ externalRssUrl }
								onChange={ ( value ) => setAttributes( { externalRssUrl: value } ) }
								className={ 'components-placeholder__input' }
							/>
							<Button isLarge type="submit" disabled={ ! externalRssUrl }>
								{ __( 'Use URL' ) }
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
					<Disabled>
						<ServerSideRender
							block="coblocks/blogroll"
							attributes={ this.props.attributes }
							className="coblocks-slick"
						/>
					</Disabled>
				}
				{ postFeedType === 'internal' &&
					<Slider { ...slickSettings } className={ classnames( this.props.className ) }>
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
								<div className="coblocks-blog-post--item" key={ i }>
									<div className="coblocks-blog-post--item-inner">
										{ featuredImageUrl &&
											<div className={ imageClasses } style={ { backgroundImage: featuredImageStyle } }></div>
										}
										<div className={ classnames( 'wp-block-coblocks-blogroll__content', {
											'full-height': ! featuredImageUrl,
										} ) }>
											{ displayPostDate && post.date_gmt &&
												<time dateTime={ format( 'c', post.date_gmt ) } className="wp-block-coblocks-blogroll__date">
													{ dateI18n( dateFormat, post.date_gmt ) }
												</time>
											}
											<a href={ post.link } target="_blank" rel="noreferrer noopener" alt={ titleTrimmed }>
												{ titleTrimmed ? (
													<RawHTML>
														{ titleTrimmed }
													</RawHTML>
												) :
													_x( '(no title)', 'placeholder when a post has no title' )
												}
											</a>
											{ displayPostContent &&
												<div className="wp-block-coblocks-blogroll__post-excerpt">
													<p>
														<RawHTML
															key="html"
														>
															{ excerpt.trim().split( ' ', excerptLength ).join( ' ' ) }
														</RawHTML>
													</p>
												</div>
											}
											{ displayPostLink &&
												<PlainText
													className="wp-block-coblocks-blogroll__more-link"
													onChange={ ( newPostLink ) => setAttributes( { postLink: newPostLink } ) }
													value={ postLink }
													placeholder={ __( 'Read more' ) }
												/>
											}
										</div>
									</div>
								</div>
							);
						} ) }
					</Slider>
				}
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { postsToShow, order, orderBy, categories } = props.attributes;
		const { getEntityRecords } = select( 'core' );
		const latestPostsQuery = pickBy( {
			categories,
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

		return {
			latestPosts: latestPosts,
		};
	} ),
] )( PostCarousel );
