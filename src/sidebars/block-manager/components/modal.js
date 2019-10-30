/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import DisableBlocks from './options/disable-blocks';
import brandAssets from '../../../utils/brand-assets';
import MapInnerBlocks from './map-innerblocks';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import { Modal, TextControl } from '@wordpress/components';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { getCategories, getBlockTypes, unregisterBlockType } from '@wordpress/blocks';

/**
 * Render plugin
 */
class ModalSettings extends Component {
	constructor() {
		super( ...arguments );

		//assign blocks per category
		const blocksPerCategory = {};
		{ map( getCategories(), ( category ) => {
			blocksPerCategory[ category.slug ] = category;
			blocksPerCategory[ category.slug ].blocks = {};
		} ); }

		{ map( getBlockTypes(), ( block ) => {
			if ( ! [ 'core/paragraph' ].includes( block.name ) && ! block.parent ) {
				blocksPerCategory[ block.category ].blocks[ block.name ] = block;
			}
		} ); }

		this.state = {
			settings: '',
			isOpen: false,
			isSaving: false,
			isLoaded: false,
			searchValue: '',
			allBlocks: blocksPerCategory,
			getBlockTypes: getBlockTypes(),
			searchResults: {},
		};

		let settings;

		// this.saveSettings = this.saveSettings.bind( this );
		wp.api.loadPromise.then( () => {
			settings = new wp.api.models.Settings();

			settings.on( 'change:coblocks_settings_api', () => {
				this.setState( { settings: settings.get( 'coblocks_settings_api' ) } );
			} );

			settings.fetch().then( response => {
				let optionSettings = response.coblocks_settings_api;
				if ( optionSettings.length < 1 ) {
					optionSettings = {};
				} else {
					optionSettings = JSON.parse( optionSettings );

					//get current blocks
					const currentBlocks = wp.data.select( 'core/block-editor' ).getBlocks();
					const blockNames = MapInnerBlocks( currentBlocks );

					map( optionSettings, ( visible, block ) => {
						if ( visible && ! block.includes( 'mainCategory-' ) && ! blockNames[ block ] ) {
							unregisterBlockType( block );
						}
					} );
				}
				this.setState( { settings: optionSettings } );
				this.setState( { isLoaded: true } );
			} );
		} );
	}

	render() {
		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		const filterList = ( evt ) => {
			this.setState( { searchValue: evt } );

			const filtered = {};
			const getAllBlocks = this.state.allBlocks;

			const updatedList = Object.entries( this.state.getBlockTypes ).filter( function( item ) {
				let text = item[ 0 ] + ' ' + item[ 1 ].title + ' ';
				if ( item[ 1 ].keywords ) {
					text += item[ 1 ].keywords.map( e => e ).join( ' ' );
				}
				return text.toLowerCase().search(
					evt.toLowerCase() ) !== -1;
			} );

			if ( updatedList ) {
				updatedList.forEach( ( [ , value ] ) => {
					if ( ! filtered[ value.category ] ) {
						filtered[ value.category ] = {
							slug: value.category,
							title: getAllBlocks[ value.category ].title,
							blocks: {},
						};
					}
					if ( ! [ 'core/paragraph' ].includes( value.name ) && ! value.parent ) {
						filtered[ value.category ].blocks[ value.name ] = value;
					}
				} );
			}

			this.setState( { searchResults: filtered } );
		};

		return (
			<Fragment>
				<PluginMoreMenuItem
					icon={ brandAssets.sidebarMoreMenuIcon }
					onClick={ () => {
						this.setState( { isOpen: true } );
					} }
				>
					{ __( 'Manage Blocks', 'coblocks' ) }
				</PluginMoreMenuItem>
				{ this.state.isOpen ?
					<Modal
						title={ __( 'Block Manager', 'coblocks' ) }
						onRequestClose={ () => closeModal() }
						closeLabel={ __( 'Close', 'coblocks' ) }
						icon={ brandAssets.modalIcon }
						className="coblocks-modal-component components-modal--coblocks-block-manager"
					>
						<div className="coblocks-block-manager__search">
							<TextControl
								type="search"
								autoComplete="off"
								autofocus="autofocus"
								placeholder={ __( 'Search for a block', 'coblocks' ) }
								value={ this.state.searchValue }
								onChange={ ( evt ) => {
									filterList( evt );
								}
								}
							/>
						</div>
						<DisableBlocks optionSettings={ this.state.settings } allBlocks={ this.state.allBlocks } keyword={ this.state.searchValue } searchResults={ this.state.searchResults } />
					</Modal> :
					null }
			</Fragment>
		);
	}
}

export default ModalSettings;
