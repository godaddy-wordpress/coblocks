/**
 * External dependencies
 */
import map from 'lodash/map';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import Section from './section';
import DisableBlocks from './options/disable-blocks';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Button, Modal } = wp.components;
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
			allBlocks: blocksPerCategory,
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
					if( visible ){
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
						<DisableBlocks optionSettings={ this.state.settings } allBlocks={ this.state.allBlocks } />
					</Modal>
				: null }
			</Fragment>
		);
	}
};

export default ModalSettings;