/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component} from '@wordpress/element';
import {
	PanelBody,
	Disabled,
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
const { InspectorControls, BlockControls } = wp.editor;

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
		const { attributes, setAttributes, className } = this.props;

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
			importRSS,
			height,
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

		if ( this.state.editing ) {
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
				<ServerSideRender
					block="coblocks/blog"
					attributes={ this.props.attributes }
					className="coblocks-slick"
				/>
			</div>
		);
	}
}

// export default withSelect( ( select, props ) => {
// 	const { postsToShow, order, orderBy, categories } = props.attributes;
// 	const { getEntityRecords } = select( 'core' );
// 	const latestPostsQuery = pickBy( {
// 		categories,
// 		order,
// 		orderby: orderBy,
// 		per_page: postsToShow,
// 	}, ( value ) => ! isUndefined( value ) );
//
// 	let latestPosts = getEntityRecords( 'postType', 'post', latestPostsQuery );
// 	if ( latestPosts ) {
// 		latestPosts = latestPosts.map( ( post ) => {
// 			return {
// 				...post,
// 				featured_media_object: select( 'core' ).getMedia( post.featured_media ),
// 			};
// 		} );
// 	}
//
// 	return {
// 		latestPosts: latestPosts,
// 	};
// } )( LatestPostsEdit );

export default LatestPostsEdit;
