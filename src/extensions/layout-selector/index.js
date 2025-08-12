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
import { register, useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from './constants';
import { LayoutSelectorResults } from './layout-selector-results';
import templateStore from './store';
import useCategories from './hooks/useCategories';
import useComputedLayouts from './hooks/useComputedLayouts';
import CoBlocksLayoutSelectorFill, { Slot } from './layout-selector-slot';
import './settings-modal-control'; // CoBlocks Settings
import './layout-selector-control'; // CoBlocks Labs
register( templateStore );

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

const LayoutSelectorApp = () => {
	// Hooks must be called unconditionally and in the same order every render.
	const [ layoutSelectorEnabled ] = useEntityProp( 'root', 'site', LAYOUT_SELECTOR_FEATURE_ENABLED_KEY );
	const tsSelect = useSelect( ( select ) => select( 'coblocks/template-selector' ), [] ) || {};
	const viewportSelect = useSelect( ( select ) => select( 'core/viewport' ), [] ) || {};

	const layouts = useComputedLayouts();
	const categories = useCategories( layouts );

	const tsDispatch = useDispatch( 'coblocks/template-selector' ) || {};
	const editorDispatch = useDispatch( 'core/editor' ) || {};
	const noticesDispatch = useDispatch( 'core/notices' ) || {};

	// Non-hook logic can be conditional.
	const labsIsPresent = !! document.getElementsByClassName( 'coblocks-labs-modal' )?.[ 0 ];
	const hasLayouts = typeof tsSelect.hasLayouts === 'function' ? tsSelect.hasLayouts() : false;
	const hasCategories = typeof tsSelect.hasCategories === 'function' ? tsSelect.hasCategories() : false;
	const shouldRender = layoutSelectorEnabled && ! labsIsPresent && hasLayouts && hasCategories;
	// eslint-disable-next-line no-console
	if ( ! shouldRender ) {
		return null;
	}

	const getSelectedCategory = typeof tsSelect.getSelectedCategory === 'function' ? tsSelect.getSelectedCategory : () => 'most-used';
	const isTemplateSelectorActive = typeof tsSelect.isTemplateSelectorActive === 'function' ? tsSelect.isTemplateSelectorActive : () => false;
	const isViewportMatch = typeof viewportSelect.isViewportMatch === 'function' ? viewportSelect.isViewportMatch : () => false;

	const closeTemplateSelector = typeof tsDispatch.closeTemplateSelector === 'function' ? tsDispatch.closeTemplateSelector : () => {};
	const incrementLayoutUsage = typeof tsDispatch.incrementLayoutUsage === 'function' ? tsDispatch.incrementLayoutUsage : () => {};
	const updateSelectedCategory = typeof tsDispatch.updateSelectedCategory === 'function' ? tsDispatch.updateSelectedCategory : () => {};
	const editPost = typeof editorDispatch.editPost === 'function' ? editorDispatch.editPost : () => {};
	const createSuccessNotice = typeof noticesDispatch.createSuccessNotice === 'function' ? noticesDispatch.createSuccessNotice : () => {};

	const useEmptyTemplateLayout = () => {
		editPost( { blocks: [], title: '' } );
		closeTemplateSelector();
	};

	const useTemplateLayout = ( layout ) => {
		editPost( {
			blocks: layout.blocks,
			title: layout.label,
		} );
		closeTemplateSelector();
		incrementLayoutUsage( layout );
		createSuccessNotice(
			sprintf(
				/* translators: %s: layout name */
				__( '"%s" layout has been added to the page.', 'coblocks' ),
				layout.label
			),
			{ type: 'snackbar' }
		);
	};

	return (
		<LayoutSelector
			categories={ categories }
			selectedCategory={ getSelectedCategory() }
			updateSelectedCategory={ updateSelectedCategory }
			isActive={ isTemplateSelectorActive() }
			isMobile={ isViewportMatch( '< medium' ) }
			useEmptyTemplateLayout={ useEmptyTemplateLayout }
			useTemplateLayout={ useTemplateLayout }
			layouts={ layouts }
		/>
	);
};

if ( typeof coblocksLayoutSelector !== 'undefined' && coblocksLayoutSelector.postTypeEnabled ) {
	// eslint-disable-next-line no-console
	registerPlugin( 'coblocks-layout-selector', {
		render: LayoutSelectorApp,
	} );
}
