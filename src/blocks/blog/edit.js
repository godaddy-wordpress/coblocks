/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Slider from 'react-slick';

/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component, RawHTML } from '@wordpress/element';
import {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	Spinner,
	ToggleControl,
	Toolbar,
	RadioControl,
	TextControl,
	Button,
	ServerSideRender,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { withSelect } from '@wordpress/data';
import blogIcons from './icons';
import includes from 'lodash/includes';
import { Fragment } from 'react';
import SlickSliderPanel from '../../components/slick-slider-panel';

/**
 * Module Constants
 */
const { InspectorControls, BlockControls, PlainText } = wp.editor;

const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};
const MAX_POSTS_COLUMNS = 3;

class LatestPostsEdit extends Component {
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
			( e ) => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			}
		);
	}

	onSubmitURL( event ) {
		event.preventDefault();

		const { externalRssUrl } = this.props.attributes;
		if ( externalRssUrl ) {
			this.setState( { editing: false } );
		}
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const { attributes, setAttributes, className, latestPosts } = this.props;

		const isListStyle = includes( className, 'is-style-list' );
		const isGridStyle = includes( className, 'is-style-grid' );
		const isCarouselStyle = includes( className, 'is-style-carousel' );

		const { categoriesList, editing } = this.state;
		const {
			displayPostContent,
			displayPostDate,
			displayPostLink,
			displayCategories,
			postLink,
			postFeedType,
			externalRssUrl,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
			excerptLength,
			listPosition,
			prevNextButtons,
			visibleItems,
			draggable,
			autoPlay,
			autoPlaySpeed } = attributes;

		const postSettingsControls = (
			<PanelBody title={ __( 'Post Settings' ) }>
				<ToggleControl
					label={ __( 'Display Date' ) }
					checked={ displayPostDate }
					help={ __( 'Showing the publish date.' ) }
					onChange={ ( value ) => setAttributes( { displayPostDate: value } ) }
				/>
				<ToggleControl
					label={ __( 'Display Link' ) }
					checked={ displayPostLink }
					help={ __( 'Showing links to individual posts.' ) }
					onChange={ ( value ) => setAttributes( { displayPostLink: value } ) }
				/>
				<ToggleControl
					label={ __( 'Display Excerpt' ) }
					checked={ displayPostContent }
					help={ __( 'Showing the post excerpt.' ) }
					onChange={ ( value ) => setAttributes( { displayPostContent: value } ) }
				/>
				<ToggleControl
					label={ __( 'Display Categories' ) }
					checked={ displayCategories }
					help={ __( 'Showing posts categories.' ) }
					onChange={ ( value ) => setAttributes( { displayCategories: value } ) }
				/>
				{ displayPostContent &&
					<RangeControl
						label={ __( 'Max words in post excerpt' ) }
						value={ excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 10 }
						max={ 100 }
					/>
				}
			</PanelBody>
		);

		const sortingAndFiltering = (
			<PanelBody title={ __( 'Sorting and Filtering' ) }>
				<QueryControls
					{ ...{ order, orderBy } }
					numberOfItems={ postsToShow }
					categoriesList={ categoriesList }
					selectedCategoryId={ categories }
					onOrderChange={ ( value ) => setAttributes( { order: value } ) }
					onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
					onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
					onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
				/>
				{ isGridStyle &&
				<RangeControl
					label={ __( 'Columns' ) }
					value={ columns }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
					min={ 2 }
					max={ 4 }
					required
				/>
				}
			</PanelBody>
		);

		const feedType = (
			<PanelBody title={ __( 'Feed type' ) }>
				<RadioControl
					label={ __( 'Post Feed' ) }
					selected={ postFeedType }
					options={ [
						{ label: 'My Blog', value: 'internal' },
						{ label: 'External Blog Feed', value: 'external' },
					] }
					onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
				/>
				{ postFeedType === 'external' &&
				<div>
					<Button isLarge onClick={ () => this.setState( { editing: true } ) } >
						{ 'Edit external RSS' }
					</Button>
				</div>
				}
			</PanelBody>
		);

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		if ( ! hasPosts && postFeedType === 'internal' ) {
			return (
				<Fragment>
					<InspectorControls>
						{ feedType }
					</InspectorControls>
					<Placeholder
						icon="admin-post"
						label={ __( 'Blog' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		const toolbarControls = [ {
			icon: blogIcons.mediaCardRight,
			title: __( 'Image on left' ),
			isActive: listPosition === 'left',
			onClick: () => setAttributes( { listPosition: 'left' } ),
		}, {
			icon: blogIcons.mediaCardLeft,
			title: __( 'Image on right' ),
			isActive: listPosition === 'right',
			onClick: () => setAttributes( { listPosition: 'right' } ),
		} ];

		const slickSettings = {
			autoPlay: autoPlay,
			autoPlaySpeed: autoPlaySpeed,
			dots: false,
			arrows: prevNextButtons,
			infinite: true,
			draggable: draggable,
			adaptiveHeight: false,
			speed: 500,
			slidesToShow: visibleItems,
			slidesToScroll: 1,
		};

		const dateFormat = __experimentalGetSettings().formats.date;

		if ( this.state.editing && postFeedType === 'external' ) {
			return (
				<Fragment>
					<InspectorControls>
						{ feedType }
					</InspectorControls>
					<Placeholder
						icon="rss"
						label="RSS"
					>
						<form onSubmit={ this.onSubmitURL }>
							<TextControl
								placeholder={ __( 'Enter URL here…' ) }
								value={ externalRssUrl }
								onChange={ ( value ) => setAttributes( { externalRssUrl: value } ) }
								className={ 'components-placeholder__input' }
							/>
							<Button isLarge type="submit">
								{ __( 'Use URL' ) }
							</Button>
						</form>
					</Placeholder>
				</Fragment>
			);
		}

		return (
			<div>
				<InspectorControls>
					{ feedType }
					{ postSettingsControls }
					{ isCarouselStyle &&
						<SlickSliderPanel { ...this.props } />
					}
					{ sortingAndFiltering }
				</InspectorControls>
				<BlockControls>
					{ isListStyle &&
						<Toolbar
							controls={ toolbarControls }
						/>
					}
				</BlockControls>
				{ postFeedType === 'external' &&
					<ServerSideRender
						block="coblocks/blog"
						attributes={ this.props.attributes }
						className="coblocks-slick"
					/>
				}
				{ postFeedType === 'internal' && ! isCarouselStyle &&
				<ul
					className={ classnames( this.props.className, {
						'image-to-left': listPosition === 'left',
						'image-to-right': listPosition === 'right',
						'wp-block-coblocks-blog__list': true,
						'has-dates': displayPostDate,
						[ `columns-${ columns }` ]: isGridStyle,
					} ) }
				>
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
							<li key={ i }>
								{ featuredImageUrl &&
								<div className="wp-block-coblocks-blog__post-image-wrapper"
									 style={ { backgroundImage: featuredImageStyle } }></div>
								}
								<div className="wp-block-coblocks-blog__post-info">
									{ displayPostDate && post.date_gmt &&
									<time dateTime={ format( 'c', post.date_gmt ) }
										  className="wp-block-coblocks-blog__post-date">
										{ dateI18n( dateFormat, post.date_gmt ) }
									</time>
									}
									<h5>
										{ titleTrimmed ? (
											<RawHTML>
												{ titleTrimmed }
											</RawHTML>
										) :
											__( '(Untitled)' )
										}
									</h5>
									{ displayPostContent &&
									<div className="wp-block-coblocks-blog__post-excerpt">
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
										className="wp-block-coblocks-blog__post-read-more"
										onChange={ ( newPostLink ) => setAttributes( { postLink: newPostLink } ) }
										value={ postLink }
										placeholder={ __( 'Continue Reading' ) }
									/>
									}
								</div>
							</li>
						);
					} ) }
				</ul>
				}
				{ postFeedType === 'internal' && isCarouselStyle &&
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
									<div className="wp-block-coblocks-blog__post-image-wrapper"
										 style={ { backgroundImage: featuredImageStyle } }></div>
									}
									<div className={ classnames('wp-block-coblocks-blog__post-info', {
										'full-height': !featuredImageUrl,
									} ) }>
										{ displayPostDate && post.date_gmt &&
										<time dateTime={ format( 'c', post.date_gmt ) }
											  className="wp-block-coblocks-blog__post-date">
											{ dateI18n( dateFormat, post.date_gmt ) }
										</time>
										}
										<h5>
											{ titleTrimmed ? (
												<RawHTML>
													{ titleTrimmed }
												</RawHTML>
											) :
												__( '(Untitled)' )
											}
										</h5>
										{ displayPostContent &&
										<div className="wp-block-coblocks-blog__post-excerpt">
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
											className="wp-block-coblocks-blog__post-read-more"
											onChange={ ( newPostLink ) => setAttributes( { postLink: newPostLink } ) }
											value={ postLink }
											placeholder={ __( 'Continue Reading' ) }
										/>
										}
									</div>
								</div>
							</div>
						);
					} ) }
				</Slider>
				}
			</div>
		);
	}
}

export default withSelect( ( select, props ) => {
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
				featured_media_object: select( 'core' ).getMedia( post.featured_media ),
			};
		} );
	}

	return {
		latestPosts: latestPosts,
	};
} )( LatestPostsEdit );
