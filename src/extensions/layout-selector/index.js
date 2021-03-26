/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, isValidElement } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';
import { compose, ifCondition } from '@wordpress/compose';
import { withSelect, useSelect, withDispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { Button, Modal, Icon, SVG, Path, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './store';
import CoBlocksSettingsToggleControl from '../coblocks-settings/coblocks-settings-toggle-control';
import { LayoutSelectorResults } from './layout-selector-results';
import CoBlocksLayoutSelectorFill, { Slot } from './layout-selector-slot';
import useComputedLayouts from './hooks/useComputedLayouts';
import useCategories from './hooks/useCategories';

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
	render() {
		const {
			categories,
			selectedCategory,
			updateSelectedCategory,
			isActive,
			isMobile,
			useEmptyTemplateLayout,
			useTemplateLayout,
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
				title={ (
					<>
						<div>{ __( 'Add New Page', 'coblocks' ) }</div>
						<span>{ __( 'Pick one of these layouts or start with a blank page.', 'coblocks' ) }</span>
					</>
				) }
				onRequestClose={ useEmptyTemplateLayout }
				className="coblocks-layout-selector-modal">

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
									onClick={ useEmptyTemplateLayout }
									isLink>
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
										key={ index }
										slug={ category.slug }
										title={ category.title }
										isSelected={ category.slug === selectedCategory }
										onClick={ () => updateSelectedCategory( category.slug ) }
									/>
								) ) }
							</ul>

							<Button
								className="coblocks-layout-selector__add-button"
								onClick={ useEmptyTemplateLayout }
								isLink>
								<span><SVG width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><Path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z" /></SVG></span>
								{ __( 'Add blank page', 'coblocks' ) }
							</Button>
						</aside>
					) }

					<div className="coblocks-layout-selector__content">
						<LayoutSelectorResults
							layouts={ this.props.layouts }
							category={ selectedCategory }
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
					isActive: isTemplateSelectorActive(),
					isMobile: isViewportMatch( '< medium' ),
					layouts,
					categories: useCategories( layouts ),
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
				const { createWarningNotice } = dispatch( 'core/notices' );

				return {
					closeTemplateSelector,
					createWarningNotice,
					editPost,
					updateSelectedCategory,

					// Replace any blocks with the selected layout.
					useTemplateLayout: ( layout ) => {
						editPost( {
							title: layout.label,
							blocks: layout.blocks,
						} );
						closeTemplateSelector();
						incrementLayoutUsage( layout );
					},

					useEmptyTemplateLayout: () => {
						editPost( { title: '', blocks: [] } );
						closeTemplateSelector();
					},
				};
			} ),
		] )( LayoutSelector ),
	} );

	registerPlugin( 'coblocks-layout-selector-control', {
		render: () => (
			<CoBlocksSettingsToggleControl
				settingsKey={ 'coblocks_layout_selector_controls_enabled' }
				label={ __( 'Layout selector', 'coblocks' ) }
				help={ __( 'Allow layout selection on new pages', 'coblocks' ) }
			/>
		),
	} );
}
