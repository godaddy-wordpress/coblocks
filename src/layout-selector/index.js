/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Button, Modal, Icon, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import sortBy from 'lodash/sortBy';

/**
 * Internal dependencies
 */
import './store';
import { templateCategories } from './layouts';

const getBlocksFromTemplate = ( name, attributes, innerBlocks = [] ) => {
	return createBlock( name, attributes,
		innerBlocks && innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
			getBlocksFromTemplate( blockName, blockAttributes, blockInnerBlocks )
		)
	);
};

const titleCase = ( str ) => {
	const splitStr = str.toLowerCase().split( ' ' );
	for ( let i = 0; i < splitStr.length; i++ ) {
		splitStr[i] = splitStr[ i ].charAt( 0 ).toUpperCase() + splitStr[ i ].substring( 1 );
	}
	return splitStr.join( ' ' );
};

const LayoutPreview = ( { layout, isSelected, registeredBlocks, onClick } ) => {
	return (
		<a href="#!"
			key={ layout }
			className={ classnames( 'coblocks-layout-selector__layout', { 'is-selected': isSelected } ) }
			onClick={ ( event ) => {
				event.preventDefault();
				onClick();
			} }>
			<BlockPreview
				autoHeight
				blocks={
					layout.blocks
					.filter( layout => registeredBlocks.includes( layout[0] ) )
					.map(
						( [ name, attributes, innerBlocks = [] ] ) => {
							return getBlocksFromTemplate( name, attributes, innerBlocks );
						}
					)
				}
			/>
		</a>
	)
};

const SidebarItem = ( { item, isSelected, onClick } ) => {
	return (
		<li key={ item } className="coblocks-layout-selector__sidebar__item">
			<a href={ `#${item}` }
				className={ classnames( { 'is-selected': isSelected } ) }
				onClick={ ( event ) => {
					event.preventDefault();
					onClick();
				} }>
				{ item }
			</a>
		</li>
	)
}

class LayoutSelector extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedCategory: __( 'About', 'coblocks' ),
			templates: templateCategories,
		};

		this.useTemplateLayout = this.useTemplateLayout.bind( this );
		this.useEmptyTemplateLayout = this.useEmptyTemplateLayout.bind( this );
		this.addCustomLayoutsToTemplateCategories = this.addCustomLayoutsToTemplateCategories.bind( this );
		this.renderContent = this.renderContent.bind( this );
	}

	useEmptyTemplateLayout() {
		const {
			replacePostTitle,
			resetBlocks,
		} = this.props;

		resetBlocks( [ createBlock( 'core/paragraph' ) ] );
		replacePostTitle( '' );
	}

	// Replace any blocks with the selected layout.
	useTemplateLayout( layout, registeredBlocks ) {
		const {
			replacePostTitle,
			resetBlocks,
		} = this.props;

		resetBlocks(
			layout.blocks
			.filter( layout => registeredBlocks.includes( layout[0] ) )
			.map(
				( [ name, attributes, innerBlocks = [] ] ) => {
					return getBlocksFromTemplate( name, attributes, innerBlocks );
				}
			)
		);

		replacePostTitle( layout.label );
	}

	addCustomLayoutsToTemplateCategories() {
		const categoryNames = map( this.state.templates, 'label' ).map( function( e ) {
			return titleCase( e );
		} );

		for ( let index = 0; index < Object.keys( coblocksLayoutSelector.customLayouts ).length; index++ ) {

			// No category key set.
			if ( ! ( 'category' in coblocksLayoutSelector.customLayouts[ index ] ) ) {
				console.error( 'No category set for custom layout ' + coblocksLayoutSelector.customLayouts[ index ].label );
				continue;
			}

			// Loop over set template categories
			for ( let categoryIndex = 0; categoryIndex < Object.keys( coblocksLayoutSelector.customLayouts[ index ].category ).length; categoryIndex++ ) {

				const categoryName = titleCase( coblocksLayoutSelector.customLayouts[ index ].category[ categoryIndex ] );

				const customTemplateObject = omit( coblocksLayoutSelector.customLayouts[ index ], 'category' );

				// New Category
				if ( ! categoryNames.includes( categoryName ) ) {

					categoryNames.push( categoryName );

					this.state.templates = this.state.templates.concat( [ { label: categoryName, layouts: [ customTemplateObject ] } ] );

					continue;

				}

				const categoryIndex = findIndex( this.state.templates, function( template ) {
					return titleCase( template.label ) == categoryName;
				} );

				// Category not found or duplicate exists in array
				if ( categoryIndex === -1 || findIndex( this.state.templates[ categoryIndex ].layouts, customTemplateObject ) > -1 ) {
					continue;
				}

				this.state.templates[ categoryIndex ].layouts = this.state.templates[ categoryIndex ].layouts.concat( customTemplateObject );

			}

		}

		const sortedArray = sortBy( this.state.templates, 'label' );

		const mostUsedIndex = findIndex( sortedArray, function( template ) {
			return template.label == __( 'About', 'coblocks' );
		} );

		if ( mostUsedIndex === -1 ) {
			this.setState( { templates: sortedArray } );
			return;
		}

		sortedArray.unshift( sortedArray.splice( mostUsedIndex, 1 )[0] );

		this.setState( { templates: sortedArray } );

	}

	componentDidMount() {
		if ( this.props.layoutSelectorEnabled && Object.keys( coblocksLayoutSelector.customLayouts ).length ) {
			this.addCustomLayoutsToTemplateCategories();
		}
	}

	renderContent( selectedCategory ) {
		const layouts = [];

		const registeredBlocks = map( wp.blocks.getBlockTypes(), 'name' );

		const foundLayouts = templateCategories.find( category => category.label === selectedCategory ).layouts || [];
		foundLayouts.forEach( layout => layouts.push( layout ) );

		const layoutsCol1 = layouts.slice( 0, Math.ceil( layouts.length / 2 ) );
		const layoutsCol2 = layouts.slice( Math.ceil( layouts.length / 2 ) );

		return layouts.length ? (
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
		) : ( <p><em>{ __('No layouts are available for this category.', 'coblocks' ) }</em></p> );
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

		return !isActive ? null : (
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
							{ this.state.templates.filter( category => category.layouts.length > 0 ).map( ( category, index ) => (
								<SidebarItem
									key={ index }
									item={ titleCase( category.label ) }
									isSelected={ category.label === selectedCategory }
									onClick={ () => this.setState( { selectedCategory: category.label } ) }
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
							<span><Icon icon="plus" size={ 16 } /></span> { __( 'Add blank page', 'coblocks' ) }
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
												)
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

registerPlugin( 'coblocks-layout-selector', {
	render: compose( [
		withSelect( select => {
			const { isTemplateSelectorActive } = select( 'coblocks/template-selector' );
			const { isCleanNewPost } = select( 'core/editor' );
			const { getLayoutSelector } = select( 'coblocks-settings' );

			return {
				isActive: isCleanNewPost() || isTemplateSelectorActive(),
				layoutSelectorEnabled: getLayoutSelector(),
			};
		} ),
		withDispatch( dispatch => {
			const { resetBlocks } = dispatch( 'core/block-editor' );
			const { closeTemplateSelector } = dispatch( 'coblocks/template-selector' );
			const { editPost } = dispatch( 'core/editor' );

			return {
				closeTemplateSelector,
				replacePostTitle: ( title ) => { editPost( { title } ); },
				resetBlocks,
			};
		} ),
	] )( LayoutSelector )
} );
