/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment, useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Button, Modal, Icon, SVG, Path, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { createBlock, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './store';
import { LayoutSelectorResults } from './layout-selector-results';
import CoBlocksLayoutSelectorFill from './layout-selector-slot';

const getBlocksFromTemplate = ( name, attributes, innerBlocks = [] ) => {
	return createBlock( name, attributes,
		innerBlocks && innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
			getBlocksFromTemplate( blockName, blockAttributes, blockInnerBlocks )
		)
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

	useEmptyTemplateLayout = () => {
		const {
			editPost,
		} = this.props;

		editPost( { title: '', blocks: [] } );
	}

	// Replace any blocks with the selected layout.
	useTemplateLayout = ( layout ) => {
		const {
			editPost,
		} = this.props;

		editPost( {
			title: layout.label,
			blocks: layout.blocks,
		} );
	}

	getLayoutsInCategory( category ) {
		return this.props.layouts.filter( ( layout ) => layout.category === category ) || [];
	}

	hasLayoutsInCategory( category ) {
		return !! this.getLayoutsInCategory( category ).length;
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

		const settings = applyFilters( 'coblocks-layout-selector-controls', [] );

		return ! isActive ? null : (
			<Modal
				title={ (
					<Fragment>
						<div>{ __( 'Add New Page', 'coblocks' ) }</div>
						<span>{ __( 'Pick one of these layouts or start with a blank page.', 'coblocks' ) }</span>
					</Fragment>
				) }
				onRequestClose={ () => {
					this.useEmptyTemplateLayout();
					closeTemplateSelector();
				} }
				className="coblocks-layout-selector-modal">
				<div className="coblocks-layout-selector">
					<aside className="coblocks-layout-selector__sidebar">
						<CoBlocksLayoutSelectorFill.Slot />

						{ settings && settings.map( ( Control, index ) => (
							<CoBlocksLayoutSelectorFill key={ `layout-control-${ index }` }>
								<Control />
							</CoBlocksLayoutSelectorFill>
						) ) }

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
						<LayoutSelectorResults
							layouts={ this.props.layouts }
							category={ selectedCategory }
							onInsert={ ( layout ) => {
								this.useTemplateLayout( layout );
								this.props.closeTemplateSelector();
							} }
						/>
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
				const { getLayoutSelector } = select( 'coblocks-settings' );

				const layouts = getLayouts();

				// Get block objects before passing into the component.
				const layoutsMemo = useMemo( () => layouts.map(
					( layout ) => {
						const blocks = layout.blocks
							? layout.blocks.map(
								( block ) => Array.isArray( block )
									? getBlocksFromTemplate( block[ 0 ], block[ 1 ], block[ 2 ] )
									: block
							)
							: rawHandler( { HTML: layout.postContent } );

						const computedLayout = { ...layout, blocks };

						// Remove postContent because blocks retain original content
						// and makes debugging object layout easier to read
						delete computedLayout.postContent;

						return computedLayout;
					}
				), [ layouts ] );

				return {
					isActive: isTemplateSelectorActive(),
					layoutSelectorEnabled: getLayoutSelector() && hasLayouts() && hasCategories(),
					layouts: layoutsMemo,
					categories: getCategories(),
				};
			} ),
			withDispatch( ( dispatch ) => {
				const { closeTemplateSelector } = dispatch( 'coblocks/template-selector' );
				const { editPost } = dispatch( 'core/editor' );
				const { createWarningNotice } = dispatch( 'core/notices' );

				return {
					closeTemplateSelector,
					createWarningNotice,
					editPost,
				};
			} ),
		] )( LayoutSelector ),
	} );
}
