/**
 * External dependencies
 */
import map from 'lodash/map';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import DisableBlocks from './options/disable-blocks';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Button, Modal, TextControl } = wp.components;
const { PluginMoreMenuItem } = wp.editPost;
const { getCategories, getBlockTypes, unregisterBlockType } = wp.blocks;

/**
 * Get settings.
 */

let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
});


/**
 * Render plugin
 */
class ModalSettings extends Component {

	constructor( props ) {
		super( ...arguments );

		//assign blocks per category
		let blocksPerCategory = {};
		{ map( getCategories(), ( category ) => {
			blocksPerCategory[ category.slug ] = category;
			blocksPerCategory[ category.slug ][ 'blocks' ] = {};
		} ) }

		{ map( getBlockTypes(), ( block ) => {
			blocksPerCategory[ block.category ][ 'blocks' ][ block.name ] = block;

		} ) }

		this.state   = {
			settings: '',
			isOpen: false,
			isSaving: false,
			isLoaded: false,
			searchValue: '',
			allBlocks: blocksPerCategory,
			getBlockTypes: getBlockTypes(),
			searchResults: {},
		}

		// this.saveSettings = this.saveSettings.bind( this );

		settings.on( 'change:coblocks_settings_api', ( model ) => {
			const getSettings = model.get( 'coblocks_settings_api' );
			this.setState( { settings: settings.get( 'coblocks_settings_api' ) } );
		});

		settings.fetch().then( response => {
			let optionSettings = response.coblocks_settings_api;
			if( optionSettings.length < 1 ){
				optionSettings = {};
			}else{
				optionSettings = JSON.parse( optionSettings );

				{ map( optionSettings, ( visible, block ) => {
					if( visible && !block.includes( 'mainCategory-' ) ){
						unregisterBlockType( block );
					}
				} ) }

			}
			this.setState({ settings: optionSettings });
			this.setState({ isLoaded: true });
		});
	}

	render() {

		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		const filterList = ( evt ) => {
			this.setState( { searchValue: evt } );

			var filtered = {};
			var getAllBlocks = this.state.allBlocks;

			var updatedList = Object.entries( this.state.getBlockTypes ).filter(function(item){
				var text = item[0] + ' ' + item[1].title  + ' ';
				if( item[1].keywords ){
					text += item[1].keywords.map( e => e ).join(' ');
				}
				return text.toLowerCase().search(
					evt.toLowerCase()) !== -1;
			});

			if( updatedList ){
				updatedList.forEach(([key, value]) => {
					if( !filtered[ value.category ] ){
						filtered[ value.category ] = {
							slug: value.category,
							title: getAllBlocks[ value.category ].title,
							blocks: {},
						}
					}
					filtered[ value.category ]['blocks'][ value.name ] = value;
				});
			}

			this.setState({ searchResults: filtered });
		}

		return (
			<Fragment>
				<PluginMoreMenuItem
					onClick={ () => {
						this.setState( { isOpen: true } );
					} }
				>
					{ __( 'Disable Blocks' ) }
				</PluginMoreMenuItem>
				{ this.state.isOpen ?
					<Modal
						title={ <span className="edit-post-options-modal__title">{ __( 'Disable Blocks' ) }</span> }
						onRequestClose={ () => closeModal() }
						closeLabel={ __( 'Close' ) }
						className='coblocks-modal-component coblocks-modal-component--disableBlocks'
					>
						<div className="coblocks-modal-component--disableBlocks--search">
							<TextControl
								type='text'
								autocomplete="off"
								placeholder={ __( 'Search Block....' ) }
								value={ this.state.searchValue }
								onChange={ (evt) => {
										filterList( evt );
									}
								}
							/>
						</div>
						<DisableBlocks optionSettings={ this.state.settings } allBlocks={ this.state.allBlocks } keyword={ this.state.searchValue } searchResults={ this.state.searchResults } />
					</Modal>
				: null }
			</Fragment>
		);
	}
};

export default ModalSettings;