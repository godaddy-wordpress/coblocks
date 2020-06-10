/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Button, Modal, Icon, SVG, Path, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

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

const LayoutPreview = ( { layout, isSelected, registeredBlocks, onClick } ) => {
	const [ overlay, setOverlay ] = useState( false );

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
				<Button isLarge isPressed>
					{ __( 'Select Layout', 'coblocks' ) }
				</Button>
			</div>

			<BlockPreview
				autoHeight
				blocks={
					layout.blocks
						.filter( ( layout ) => registeredBlocks.includes( layout[ 0 ] ) )
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

		this.useTemplateLayout = this.useTemplateLayout.bind( this );
		this.useEmptyTemplateLayout = this.useEmptyTemplateLayout.bind( this );
		this.renderContent = this.renderContent.bind( this );
	}

	useEmptyTemplateLayout() {
		const {
			editPost,
		} = this.props;

		editPost( { title: '', blocks: [] } );
	}

	// Replace any blocks with the selected layout.
	useTemplateLayout( layout, registeredBlocks ) {
		const {
			editPost,
		} = this.props;

		editPost( {
			title: layout.label,
			blocks: layout.blocks.filter( ( layout ) => registeredBlocks.includes( layout[ 0 ] ) )
				.map( ( [ name, attributes, innerBlocks = [] ] ) => {
					return getBlocksFromTemplate( name, attributes, innerBlocks );
				} ),
		} );
	}

	getLayoutsInCategory( category ) {
		return this.props.layouts.filter( ( layout ) => layout.category === category ) || [];
	}

	hasLayoutsInCategory( category ) {
		return !! this.getLayoutsInCategory( category ).length;
	}

	renderContent( selectedCategory ) {
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
							<span><SVG width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><Path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z" ></Path></SVG></span>
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
				const { isTemplateSelectorActive } = select( 'coblocks/template-selector' );
				const { hasEditorUndo, isCurrentPostPublished } = select( 'core/editor' );
				const { getLayoutSelector } = select( 'coblocks-settings' );

				const isCleanUnpublishedPost = ! isCurrentPostPublished() && ! hasEditorUndo();

				const layouts = coblocksLayoutSelector.layouts || [];
				const categories = coblocksLayoutSelector.categories || [];

				return {
					isActive: isCleanUnpublishedPost || isTemplateSelectorActive(),
					layoutSelectorEnabled: getLayoutSelector() && !! layouts.length && !! categories.length,
					layouts,
					categories,
				};
			} ),
			withDispatch( ( dispatch ) => {
				const { closeTemplateSelector } = dispatch( 'coblocks/template-selector' );
				const { editPost } = dispatch( 'core/editor' );

				return {
					closeTemplateSelector,
					editPost,
				};
			} ),
		] )( LayoutSelector ),
	} );
}
