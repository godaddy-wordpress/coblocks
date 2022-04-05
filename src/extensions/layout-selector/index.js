/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

import { registerPlugin } from '@wordpress/plugins';
import { useEntityProp } from '@wordpress/core-data';
import { __, sprintf } from '@wordpress/i18n';
import { Button, DropdownMenu, Icon, MenuGroup, MenuItem, Modal, Path, SVG } from '@wordpress/components';
import { Component, isValidElement } from '@wordpress/element';
import { compose, ifCondition } from '@wordpress/compose';
import { useSelect, withDispatch, withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { LayoutSelectorResults } from './layout-selector-results';
import useCategories from './hooks/useCategories';
import useComputedLayouts from './hooks/useComputedLayouts';
import CoBlocksLayoutSelectorFill, { Slot } from './layout-selector-slot';
import './settings-modal-control'; // CoBlocks Settings
import './layout-selector-control'; // CoBlocks Labs
import './store';

const SidebarItem = ( { slug, title, isSelected, onClick } ) => {
	return (
		<li className="coblocks-layout-selector__sidebar__item" key={ slug }>
			<a className={ classnames( { 'is-selected': isSelected } ) }
				href={ `#${ slug }` }
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
	render() {
		const {
			categories,
			selectedCategory,
			updateSelectedCategory,
			isActive,
			isMobile,
			useEmptyTemplateLayout,
			useTemplateLayout,
			layouts,
		} = this.props;

		const settings = applyFilters( 'coblocks-layout-selector-controls', [] );

		const coblocksCustomLayoutsSettings = (
			<>
				<Slot />

				{
					Array.isArray( settings ) &&
					settings.map( ( Control, index ) => {
						let ControlElem = Control;

						if ( ! [ 'function', 'object' ].includes( typeof ControlElem ) ) {
							return null;
						}

						if ( ! isValidElement( ControlElem ) ) {
							ControlElem = <ControlElem />;
						}

						return (
							<CoBlocksLayoutSelectorFill key={ `layout-control-${ index }` }>
								{ ControlElem }
							</CoBlocksLayoutSelectorFill>
						);
					} )
				}
			</>
		);

		return ! isActive ? null : (
			<Modal
				className="coblocks-layout-selector-modal"
				onRequestClose={ useEmptyTemplateLayout }
				title={ (
					<>
						<div>{ __( 'Add New Page', 'coblocks' ) }</div>
						<span>{ __( 'Pick one of these layouts or start with a blank page.', 'coblocks' ) }</span>
					</>
				) }>

				<div className="coblocks-layout-selector">

					{ isMobile && (
						<div className="coblocks-layout-selector__topbar">
							<div className="coblocks-layout-selector__topbar__left">
								<div className="coblocks-layout-selector__topbar__left__settings">
									{ coblocksCustomLayoutsSettings }
								</div>
								<div className="coblocks-layout-selector__topbar__left__category">
									<strong>{ __( 'Layouts', 'coblocks' ) }:</strong> { categories.find( ( category ) => category.slug === selectedCategory )?.title }
									<DropdownMenu label="Select a layout category">
										{ ( { onClose } ) => (
											<>
												<MenuGroup onClick={ onClose }>
													{ categories.map( ( category, index ) => (
														<MenuItem key={ index } onClick={ () => {
															updateSelectedCategory( category.slug );
															onClose();
														} }>
															{ category.title }
														</MenuItem>
													) ) }
												</MenuGroup>
											</>
										) }
									</DropdownMenu>
								</div>
							</div>
							<div className="coblocks-layout-selector__topbar__right">
								<Button
									className="coblocks-layout-selector__add-button"
									isLink
									onClick={ useEmptyTemplateLayout }>
									<span><Icon icon="plus" size={ 16 } /></span> { __( 'Add blank page', 'coblocks' ) }
								</Button>
							</div>
						</div>
					) }

					{ ! isMobile && (
						<aside className="coblocks-layout-selector__sidebar">

							{ coblocksCustomLayoutsSettings }

							<ul className="coblocks-layout-selector__sidebar__items">
								{ categories.map( ( category, index ) => (
									<SidebarItem
										isSelected={ category.slug === selectedCategory }
										key={ index }
										onClick={ () => updateSelectedCategory( category.slug ) }
										slug={ category.slug }
										title={ category.title }
									/>
								) ) }
							</ul>

							<Button
								className="coblocks-layout-selector__add-button"
								isLink
								onClick={ useEmptyTemplateLayout }>
								<span><SVG aria-hidden="true" focusable="false" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><Path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z" /></SVG></span>
								{ __( 'Add blank page', 'coblocks' ) }
							</Button>
						</aside>
					) }

					<div className="coblocks-layout-selector__content">
						<LayoutSelectorResults
							category={ selectedCategory }
							layouts={ layouts }
							onInsert={ ( layout ) => useTemplateLayout( layout ) }
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
			ifCondition( () => {
				const [ layoutSelectorEnabled ] = useEntityProp( 'root', 'site', 'coblocks_layout_selector_controls_enabled' );

				const {
					hasLayouts,
					hasCategories,
				} = useSelect( ( select ) => select( 'coblocks/template-selector' ) );

				return layoutSelectorEnabled && hasLayouts() && hasCategories();
			} ),
			withSelect( ( select ) => {
				const {
					getSelectedCategory,
					isTemplateSelectorActive,
				} = select( 'coblocks/template-selector' );

				const { isViewportMatch } = select( 'core/viewport' );

				const layouts = useComputedLayouts();

				return {
					categories: useCategories( layouts ),
					isActive: isTemplateSelectorActive(),
					isMobile: isViewportMatch( '< medium' ),
					layouts,
					selectedCategory: getSelectedCategory(),
				};
			} ),
			withDispatch( ( dispatch ) => {
				const {
					closeTemplateSelector,
					incrementLayoutUsage,
					updateSelectedCategory,
				} = dispatch( 'coblocks/template-selector' );
				const { editPost } = dispatch( 'core/editor' );
				const { createWarningNotice, createSuccessNotice } = dispatch( 'core/notices' );

				return {
					closeTemplateSelector,
					createSuccessNotice,
					createWarningNotice,
					editPost,
					updateSelectedCategory,

					useEmptyTemplateLayout: () => {
						editPost( { blocks: [], title: '' } );
						closeTemplateSelector();
					},

					// Replace any blocks with the selected layout.
					useTemplateLayout: ( layout ) => {
						editPost( {
							blocks: layout.blocks,
							title: layout.label,
						} );
						closeTemplateSelector();
						incrementLayoutUsage( layout );
						createSuccessNotice(
							sprintf(
								// translators: %s is the post title.
								__( '"%s" layout has been added to the page.', 'coblocks' ),
								layout.label
							),
							{ type: 'snackbar' }
						);
					},
				};
			} ),
		] )( LayoutSelector ),
	} );
}
