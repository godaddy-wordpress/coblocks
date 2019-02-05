/**
 * External dependencies
 */
import classnames from 'classnames';
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
const { withSelect } = wp.data;

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
		this.state   = {
			isOpen: false,
		}

		this.state   = {
			settings: '',
			isSaving: false,
			isLoaded: false,
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
					{ __( 'CoBlocks' ) }
				</PluginMoreMenuItem>
				{ this.state.isOpen ?
					<Modal
						title={ <span className="edit-post-options-modal__title">{ __( 'CoBlocks Settings' ) }</span> }
						onRequestClose={ () => closeModal() }
						closeLabel={ __( 'Close' ) }
					>
						<Section title={ __( 'General' ) }>
							<DisableBlocks optionSettings={ this.state.settings } />
						</Section>
					</Modal>
				: null }
			</Fragment>
		);
	}
};

export default ModalSettings;