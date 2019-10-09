/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';
import { find, isUndefined, pickBy } from 'lodash';

/**
 * Internal dependencies
 */

import InspectorControls from './inspector';
import icons from './icons';
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
import { BlockControls, RichText, BlockIcon } from '@wordpress/block-editor';
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

const TokenList = wp.tokenList;

const styleOptions = [
	{
		name: 'stacked',
		label: _x( 'Stacked', 'block style' ),
		icon: icons.styleStacked,
		isDefault: true,
	},
	{
		name: 'horizontal',
		label: _x( 'Horizontal', 'block style' ),
		icon: icons.styleHorizontalImageRight,
		iconAlt: icons.styleHorizontalImageLeft,
	},
];

/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */
function getActiveStyle( styles, className ) {
	for ( const style of new TokenList( className ).values() ) {
		if ( style.indexOf( 'is-style-' ) === -1 ) {
			continue;
		}

		const potentialStyleName = style.substring( 9 );
		const activeStyle = find( styles, { name: potentialStyleName } );

		if ( activeStyle ) {
			return activeStyle;
		}
	}

	return find( styles, 'isDefault' );
}

/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */
function replaceActiveStyle( className, activeStyle, newStyle ) {
	const list = new TokenList( className );

	if ( activeStyle ) {
		list.remove( 'is-style-' + activeStyle.name );
	}

	list.add( 'is-style-' + newStyle.name );

	return list.value;
}

class PostsEdit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			categoriesList: [],
			editing: ! this.props.attributes.externalRssUrl,
			lastColumnValue: null,

			stackedDefaultColumns: 2,
			horizontalDefaultColumns: 1,
			userModifiedColumn: false,
		};

		if (
			( this.props.className.includes( 'is-style-stacked' ) && this.props.attributes.columns !== this.state.stackedDefaultColumns ) ||
			( this.props.className.includes( 'is-style-horizontal' ) && this.props.attributes.columns !== this.state.horizontalDefaultColumns )
		) {
			this.state.userModifiedColumn = true;
		}

		this.onUserModifiedColumn = this.onUserModifiedColumn.bind( this );
		this.onSubmitURL = this.onSubmitURL.bind( this );
		this.updateStyle = this.updateStyle.bind( this );
	}

	componentDidMount() {
		const { className } = this.props;
		const activeStyle = getActiveStyle( styleOptions, className );

		this.updateStyle( activeStyle );

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

	componentDidUpdate( prevProps ) {
		const { displayPostContent, displayPostLink } = this.props.attributes;
		if ( displayPostLink && ! displayPostContent ) {
			this.props.setAttributes( {
				displayPostLink: false,
			} );
		}

		if ( this.props.className !== prevProps.className ) {
			if ( this.props.className.includes( 'is-style-stacked' ) ) {
				this.props.setAttributes( { columns: this.state.userModifiedColumn ? this.props.attributes.columns : this.state.stackedDefaultColumns } );
			}

			if ( this.props.className.includes( 'is-style-horizontal' ) ) {
				this.props.setAttributes( { columns: this.state.userModifiedColumn ? this.props.attributes.columns : this.state.horizontalDefaultColumns } );
			}
		}
	}

	onUserModifiedColumn() {
		this.setState( { userModifiedColumn: true } );
	}

	onSubmitURL( event ) {
		event.preventDefault();

		const { externalRssUrl } = this.props.attributes;
		if ( externalRssUrl ) {
			this.setState( { editing: false } );
		}
	}

	updateStyle( style ) {
		const { className, setAttributes } = this.props;

		const activeStyle = getActiveStyle( styleOptions, className );

		const updatedClassName = replaceActiveStyle(
			className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	}

	render() {
		const {
			attributes,
			setAttributes,
			className,
			latestPosts,
		} = this.props;

		const { categoriesList } = this.state;

		const isHorizontalStyle = includes( className, 'is-style-horizontal' );
		const isStackedStyle = includes( className, 'is-style-stacked' );

		const activeStyle = getActiveStyle( styleOptions, className );

		const {
			displayPostContent,
			displayPostDate,
			displayPostLink,
			postLink,
			postFeedType,
			externalRssUrl,
			columns,
			postsToShow,
			excerptLength,
			listPosition,
			imageSize,
		} = attributes;

		const imageClasses = classnames( 'wp-block-coblocks-posts__image', 'table', 'flex-0', 'relative', {
			'mr-3': isHorizontalStyle && listPosition === 'left',
			'mb-2': isStackedStyle,
			'ml-3': isHorizontalStyle && listPosition === 'right',
			[ imageSize ]: isHorizontalStyle,
		} );

		const editToolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit RSS URL' ),
				onClick: () => this.setState( { editing: true } ),
			},
		];

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		const displayPosts = Array.isArray( latestPosts ) && latestPosts.length > postsToShow ? latestPosts.slice( 0, postsToShow ) : latestPosts;

		const toolbarControls = [ {
			icon: icons.imageLeft,
			title: __( 'Image on left' ),
			isActive: listPosition === 'left',
			onClick: () => setAttributes( { listPosition: 'left' } ),
		}, {
			icon: icons.imageRight,
			title: __( 'Image on right' ),
			isActive: listPosition === 'right',
			onClick: () => setAttributes( { listPosition: 'right' } ),
		} ];

		const dateFormat = __experimentalGetSettings().formats.date; // eslint-disable-line no-restricted-syntax

		if ( ! hasPosts && postFeedType === 'internal' ) {
			return (
				<Fragment>
					<InspectorControls
						{ ...this.props }
						attributes={ attributes }
						hasPosts={ hasPosts }
						editing={ this.state.editing }
						activeStyle={ activeStyle }
						styleOptions={ styleOptions }
						onUpdateStyle={ this.updateStyle }
						categoriesList={ categoriesList }
						postCount={ latestPosts && latestPosts.length }
					/>
					<Placeholder
						icon={ <BlockIcon icon={ icon } /> }
						label={ __( 'Blog Posts' ) }
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
						onUserModifiedColumn={ this.onUserModifiedColumn }
						attributes={ attributes }
						hasPosts={ hasPosts }
						editing={ this.state.editing }
						activeStyle={ activeStyle }
						styleOptions={ styleOptions }
						onUpdateStyle={ this.updateStyle }
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
					onUserModifiedColumn={ this.onUserModifiedColumn }
					attributes={ attributes }
					hasPosts={ hasPosts }
					editing={ this.state.editing }
					activeStyle={ activeStyle }
					styleOptions={ styleOptions }
					onUpdateStyle={ this.updateStyle }
					categoriesList={ categoriesList }
					postCount={ latestPosts && latestPosts.length }
				/>
				<BlockControls>
					{ isHorizontalStyle &&
						<Toolbar
							controls={ toolbarControls }
						/>
					}
					{ postFeedType === 'external' &&
						<Toolbar
							controls={ editToolbarControls }
						/>
					}
				</BlockControls>
				{ postFeedType === 'external' &&
					<Disabled>
						<ServerSideRender
							block="coblocks/posts"
							attributes={ this.props.attributes }
						/>
					</Disabled>
				}
				{ postFeedType === 'internal' &&
					<Disabled>
						<div className={ className }>
							<div className={ classnames( 'list-none', 'ml-0', 'pl-0', 'pt-3', {
								columns: columns,
								[ `columns-${ columns }` ]: columns,
							} ) }>
								{ displayPosts.map( ( post, i ) => {
									const featuredImageUrl = post.featured_media_object ? post.featured_media_object.source_url : null;
									const featuredImageStyle = 'url(' + featuredImageUrl + ')';

									const listClasses = classnames( 'flex', 'flex-auto', 'items-stretch', 'w-full', 'mt-0', 'mb-3', 'ml-0', 'pl-0', {
										'flex-row-reverse': isHorizontalStyle && listPosition === 'right',
										'flex-col': isStackedStyle,
										'has-featured-image': featuredImageUrl,
									} );

									const contentClasses = classnames( 'wp-block-coblocks-posts__content', 'flex', 'flex-col', 'w-full', {
										'self-center': isHorizontalStyle && ! displayPostContent && columns <= 2,
									} );

									const titleTrimmed = post.title.rendered.trim();

									let excerpt = post.excerpt.rendered;
									if ( post.excerpt.raw === '' ) {
										excerpt = post.content.raw;
									}
									const excerptElement = document.createElement( 'div' );
									excerptElement.innerHTML = excerpt;
									excerpt = excerptElement.textContent || excerptElement.innerText || '';

									return (
										<div key={ i } className={ listClasses }>
											{ featuredImageUrl &&
												<div className={ imageClasses }>
													<div className="block w-full bg-cover bg-center-center pt-full" style={ { backgroundImage: featuredImageStyle } }></div>
												</div>
											}
											<div className={ contentClasses }>
												{ isStackedStyle && displayPostDate && post.date_gmt &&
													<time dateTime={ format( 'c', post.date_gmt ) } className="wp-block-coblocks-posts__date mb-1">
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
												{ isHorizontalStyle && displayPostDate && post.date_gmt &&
													<time dateTime={ format( 'c', post.date_gmt ) } className="wp-block-coblocks-posts__date mt-1">
														{ dateI18n( dateFormat, post.date_gmt ) }
													</time>
												}
												{ displayPostContent &&
													<div className="wp-block-coblocks-posts__post-excerpt mt-1">
														<RawHTML
															key="html"
														>
															{ excerptLength < excerpt.trim().split( ' ' ).length ?
																excerpt.trim().split( ' ', excerptLength ).join( ' ' ) + '…' :
																excerpt.trim().split( ' ', excerptLength ).join( ' ' ) }
														</RawHTML>
													</div>
												}
												{ displayPostLink &&
													<RichText
														tagName="a"
														className="wp-block-coblocks-posts__more-link block self-start mt-3"
														onChange={ ( newPostLink ) => setAttributes( { postLink: newPostLink } ) }
														value={ postLink }
														placeholder={ __( 'Read more' ) }
														multiline={ false }
														withoutInteractiveFormatting={ false }
														isSelected={ false }
													/>
												}
											</div>
										</div>
									);
								} ) }
							</div>
						</div>
					</Disabled>
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
] )( PostsEdit );
