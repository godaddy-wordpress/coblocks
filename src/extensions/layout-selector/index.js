/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';
import { pick } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { isBlobURL } from '@wordpress/blob';
import { Button, Modal, Icon, SVG, Path, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';
import { createBlock, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './store';

const getBlocksFromTemplate = ( name, attributes, innerBlocks = [] ) => {
	return createBlock( name, attributes,
		innerBlocks && innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
			getBlocksFromTemplate( blockName, blockAttributes, blockInnerBlocks )
		)
	);
};

const getTemplateFromBlocks = ( name, attributes, innerBlocks = [] ) => {
	return [ name, attributes,
		innerBlocks && innerBlocks.map( ( blockObject ) => {
			return getTemplateFromBlocks( blockObject.name, blockObject.attributes, blockObject.innerBlocks );
		} ),
	];
};

/**
 * Is the url for the image hosted externally. An externally hosted image has no
 * id and is not a blob url.
 *
 * @param {number=} id  The id of the image.
 * @param {string=} url The url of the image.
 *
 * @return {boolean} Is the url an externally hosted url?
 */
const isExternalImage = ( id, url ) => url && ! id && ! isBlobURL( url ) && ! url.includes( window.location.host );

const LayoutPreview = ( { layout, isSelected, registeredBlocks, onClick } ) => {
	const [ overlay, setOverlay ] = useState( false );

	const layoutBlocks = layout.blocks || rawHandler( { HTML: layout.postContent } ).map(
		( blockObject ) => getTemplateFromBlocks( blockObject.name, blockObject.attributes, blockObject.innerBlocks )
	);

	return (
		<a href="#!"
			key={ layout }
			className={ classnames( 'coblocks-layout-selector__layout', { 'is-selected': isSelected } ) }
			onClick={ ( event ) => {
				event.preventDefault();
				onClick();
			} }
			onMouseEnter={ () => setOverlay( true ) }
			onMouseLeave={ () => setOverlay( false ) }>

			<div className={ classnames( 'coblocks-layout-selector__layout--overlay', { 'is-active': overlay } ) }>
				<Button isPressed>
					{ __( 'Select Layout', 'coblocks' ) }
				</Button>
			</div>

			<BlockPreview
				autoHeight
				blocks={
					layoutBlocks
						.filter( ( currentLayout ) => registeredBlocks.includes( currentLayout[ 0 ] ) )
						.map(
							( [ name, attributes, innerBlocks = [] ] ) => {
								return getBlocksFromTemplate( name, attributes, innerBlocks );
							}
						)
				}
			/>
		</a>
	);
};

const SidebarItem = ( { slug, title, isSelected, onClick } ) => {
	return (
		<li key={ slug } className="coblocks-layout-selector__sidebar__item">
			<a href={ `#${ slug }` }
				className={ classnames( { 'is-selected': isSelected } ) }
				onClick={ ( event ) => {
					event.preventDefault();
					onClick();
				} }>
				{ title }
			</a>
		</li>
	);
};

class LayoutSelector extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedCategory: 'about',
		};
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.clientIds.length !== 0 ) {
			return;
		}

		this.detectImageBlocks( this.props.clientIds )
			.filter( ( block ) => !! block )
			.forEach(
				( block ) => {
					const [ clientId, attributes ] = Object.entries( block )[ 0 ];
					this.uploadExternalImages( clientId, attributes );
				}
			);
	}

	useEmptyTemplateLayout = () => {
		const {
			editPost,
		} = this.props;

		editPost( { title: '', blocks: [] } );
	}

	// Replace any blocks with the selected layout.
	useTemplateLayout = ( layout, registeredBlocks ) => {
		const {
			editPost,
		} = this.props;

		const layoutBlocks = layout.blocks || rawHandler( { HTML: layout.postContent } ).map(
			( blockObject ) => getTemplateFromBlocks( blockObject.name, blockObject.attributes, blockObject.innerBlocks )
		);

		editPost( {
			title: layout.label,
			blocks: layoutBlocks.filter( ( layoutElem ) => registeredBlocks.includes( layoutElem[ 0 ] ) )
				.map( ( [ name, attributes, innerBlocks = [] ] ) => {
					return getBlocksFromTemplate( name, attributes, innerBlocks );
				} ),
		} );
	}

	detectImageBlocks = ( clientIds ) => {
		const { getBlockAttributes } = this.props;

		return clientIds.map( ( clientId ) => {
			const blockAttributes = getBlockAttributes( clientId );

			switch ( true ) {
				// For core/image
				case !! blockAttributes?.url : {
					return { [ clientId ]: pick( blockAttributes, [ 'id', 'url' ] ) };
				}
				// For coblocks/gallery-*
				case !! blockAttributes?.images : {
					return { [ clientId ]: pick( blockAttributes, [ 'ids', 'images' ] ) };
				}
				// For coblocks/service
				case !! blockAttributes?.imageUrl : {
					return { [ clientId ]: pick( blockAttributes, [ 'imageUrl' ] ) };
				}
				// For core/media-text
				case !! blockAttributes?.mediaUrl && blockAttributes?.mediaType === 'image' : {
					return { [ clientId ]: pick( blockAttributes, [ 'mediaId', 'mediaUrl' ] ) };
				}
				default: {
					return null;
				}
			}
		} );
	}

	getUrlsFromBlockAttributes( blockAttributes ) {
		console.log('test', blockAttributes);
		switch ( true ) {
			case isExternalImage( 0, blockAttributes?.imageUrl ): {
				return [ blockAttributes.imageUrl ];
			}
			case isExternalImage( blockAttributes?.id, blockAttributes?.url ): {
				return [ blockAttributes.url ];
			}
			case isExternalImage( blockAttributes?.mediaId, blockAttributes?.mediaUrl ): {
				return [ blockAttributes.mediaUrl ];
			}
			case !! blockAttributes?.images : {
				return blockAttributes.images.filter( ( image ) =>
					isExternalImage( image?.id, image?.url )
				).map( ( image ) => image.url );
			}
		}
	}

	uploadExternalImages = ( clientId, blockAttributes ) => {
		const {
			createWarningNotice,
			getBlockAttributes,
			mediaUpload,
			updateBlockAttributes,
		} = this.props;

		let urls = this.getUrlsFromBlockAttributes( blockAttributes );

		urls = urls.filter( ( url ) => typeof url !== 'undefined' );
		if ( ! urls.length ) {
			return;
		}

		urls.forEach( ( imageUrl, index ) => {
			window.fetch( imageUrl )
				.then( ( response ) => response.blob() )
				.then( ( blob ) => {
					mediaUpload( {
						filesList: [ blob ],
						allowedTypes: [ 'image' ],
						onFileChange( [ media ] ) {
							console.log(media, blockAttributes);
							switch ( true ) {
								case !! blockAttributes?.imageUrl: {
									updateBlockAttributes( clientId, {
										imageUrl: media.url,
									} );

									break;
								}
								case !! blockAttributes?.url : {
									updateBlockAttributes( clientId, {
										id: media.id,
										url: media.url,
									} );

									break;
								}
								case !! blockAttributes?.mediaUrl : {
									updateBlockAttributes( clientId, {
										mediaId: media.id,
										mediaUrl: media.url,
									} );

									break;
								}
								case !! blockAttributes?.images : {
									const currentAttributes = getBlockAttributes( clientId );

									const newImages = currentAttributes.images.map( ( oldImage, oldIndex ) => {
										return oldIndex === index
											? { ...oldImage, id: media.id, url: media.url }
											: oldImage;
									} );

									updateBlockAttributes( clientId, {
										ids: newImages.map( ( image ) => image.id || null ),
										images: newImages,
									} );
								}
							}
						},
						onError: ( message ) => createWarningNotice( message ),
					} );
				} )
				.catch( ( error ) => createWarningNotice( error ) );
		} );
	}

	getLayoutsInCategory( category ) {
		return this.props.layouts.filter( ( layout ) => layout.category === category ) || [];
	}

	hasLayoutsInCategory( category ) {
		return !! this.getLayoutsInCategory( category ).length;
	}

	renderContent = ( selectedCategory ) => {
		const registeredBlocks = map( wp.blocks.getBlockTypes(), 'name' );

		const foundLayouts = this.getLayoutsInCategory( selectedCategory );

		const layoutsCol1 = foundLayouts.slice( 0, Math.ceil( foundLayouts.length / 2 ) );
		const layoutsCol2 = foundLayouts.slice( Math.ceil( foundLayouts.length / 2 ) );

		return this.hasLayoutsInCategory( selectedCategory ) ? (
			<div className="coblocks-layout-selector__layouts">
				<div className="coblocks-layout-selector__layouts-column">
					{ layoutsCol1.map( ( layout, index ) => (
						<LayoutPreview
							key={ index }
							layout={ layout }
							registeredBlocks={ registeredBlocks }
							onClick={ () => {
								this.useTemplateLayout( layout, registeredBlocks );
								this.props.closeTemplateSelector();
							} }
						/>
					) ) }
				</div>
				<div className="coblocks-layout-selector__layouts-column">
					{ layoutsCol2.map( ( layout, index ) => (
						<LayoutPreview
							key={ index }
							layout={ layout }
							registeredBlocks={ registeredBlocks }
							onClick={ () => {
								this.useTemplateLayout( layout, registeredBlocks );
								this.props.closeTemplateSelector();
							} }
						/>
					) ) }
				</div>
			</div>
		) : ( <p><em>{ __( 'No layouts are available for this category.', 'coblocks' ) }</em></p> );
	}

	render() {
		const { selectedCategory } = this.state;
		const {
			isActive,
			closeTemplateSelector,
			layoutSelectorEnabled,
		} = this.props;

		if ( ! layoutSelectorEnabled ) {
			return null;
		}

		return ! isActive ? null : (
			<Modal
				title={ (
					<Fragment>
						{ __( 'Add new page', 'coblocks' ) }
						<span>{ __( 'Pick one of these layouts or start with a blank page', 'coblocks' ) }</span>
					</Fragment>
				) }
				onRequestClose={ () => {
					this.useEmptyTemplateLayout();
					closeTemplateSelector();
				} }
				className="coblocks-layout-selector-modal">

				<div className="coblocks-layout-selector">
					<aside className="coblocks-layout-selector__sidebar">
						<ul className="coblocks-layout-selector__sidebar__items">
							{ this.props.categories.filter( ( category ) => this.hasLayoutsInCategory( category.slug ) ).map( ( category, index ) => (
								<SidebarItem
									key={ index }
									slug={ category.slug }
									title={ category.title }
									isSelected={ category.slug === selectedCategory }
									onClick={ () => this.setState( { selectedCategory: category.slug } ) }
								/>
							) ) }
						</ul>

						<Button
							className="coblocks-layout-selector__add-button"
							onClick={ () => {
								this.useEmptyTemplateLayout();
								closeTemplateSelector();
							} }
							isLink>
							<span><SVG width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><Path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z" /></SVG></span>
							{ __( 'Add blank page', 'coblocks' ) }
						</Button>
					</aside>

					<div className="coblocks-layout-selector__topbar">
						<div className="coblocks-layout-selector__topbar__left">
							<strong>{ __( 'Layouts', 'coblocks' ) }:</strong> { selectedCategory }
							<DropdownMenu label="Select a layout category">
								{ ( { onClose } ) => (
									<Fragment>
										<MenuGroup onClick={ onClose }>
											{ this.state.templates.map( ( category, index ) => {
												return (
													<MenuItem key={ index } onClick={ () => {
														this.setState( { selectedCategory: category.label } );
														onClose();
													} }>
														{ category.label }
													</MenuItem>
												);
											} ) }
										</MenuGroup>
									</Fragment>
								) }
							</DropdownMenu>
						</div>
						<div className="coblocks-layout-selector__topbar__right">
							<Button
								className="coblocks-layout-selector__add-button"
								onClick={ () => {
									this.useEmptyTemplateLayout();
									closeTemplateSelector();
								} }
								isLink>
								<span><Icon icon="plus" size={ 16 } /></span> { __( 'Add blank page', 'coblocks' ) }
							</Button>
						</div>
					</div>

					<div className="coblocks-layout-selector__content">
						{ this.renderContent( selectedCategory ) }
					</div>
				</div>
			</Modal>
		);
	}
}

if ( typeof coblocksLayoutSelector !== 'undefined' && coblocksLayoutSelector.postTypeEnabled ) {
	registerPlugin( 'coblocks-layout-selector', {
		render: compose( [
			withSelect( ( select ) => {
				const {
					isTemplateSelectorActive,
					hasLayouts,
					getLayouts,
					hasCategories,
					getCategories,
				} = select( 'coblocks/template-selector' );
				const {
					getCurrentPostAttribute,
					hasEditorUndo,
					isCurrentPostPublished,
				} = select( 'core/editor' );
				const { getLayoutSelector } = select( 'coblocks-settings' );
				const {
					getBlockAttributes,
					getBlockName,
					getClientIdsWithDescendants,
					getSettings,
				} = select( 'core/block-editor' );

				const isDraft = [ 'draft' ].indexOf( getCurrentPostAttribute( 'status' ) ) !== -1;
				const isCleanUnpublishedPost = ! isCurrentPostPublished() && ! hasEditorUndo() && ! isDraft;

				return {
					isActive: isCleanUnpublishedPost || isTemplateSelectorActive(),
					layoutSelectorEnabled: getLayoutSelector() && hasLayouts() && hasCategories(),
					layouts: getLayouts(),
					categories: getCategories(),
					mediaUpload: getSettings().mediaUpload,
					clientIds: getClientIdsWithDescendants(),
					getBlockAttributes,
					getBlockName,
				};
			} ),
			withDispatch( ( dispatch ) => {
				const { closeTemplateSelector } = dispatch( 'coblocks/template-selector' );
				const { editPost } = dispatch( 'core/editor' );
				const { updateBlockAttributes } = dispatch( 'core/block-editor' );
				const { createWarningNotice } = dispatch( 'core/notices' );

				return {
					closeTemplateSelector,
					createWarningNotice,
					editPost,
					updateBlockAttributes,
				};
			} ),
		] )( LayoutSelector ),
	} );
}
