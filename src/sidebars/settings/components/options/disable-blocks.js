/**
 * External dependencies
 */
import map from 'lodash/map';
import apiFetch from '@wordpress/api-fetch';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { PanelBody,CheckboxControl } = wp.components;
const { PluginMoreMenuItem } = wp.editPost;
const { getBlockTypes } = wp.blocks;

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
class DisableBlocks extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state   = {
			settings: props.optionSettings,
			isSaving: false,
			isLoaded: false,
		}

		this.saveSettings = this.saveSettings.bind( this );

		settings.fetch().then( response => {
			
		});
	}

	saveSettings( settingsState ) {
		this.setState( { isSaving: true } );
		const model = new wp.api.models.Settings( { coblocks_settings_api: JSON.stringify( settingsState ) } );
		model.save().then( response => {
			this.setState({ isSaving: false, settings: settingsState });
		} );

	}

	render() {

		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		const onChecked = ( key, checked ) => {
			let settingsState = this.state.settings;
			settingsState[ key ] = !checked;

			this.setState({ settings: settingsState });

			this.saveSettings( settingsState );
		}

		let savedSettings = this.state.settings;

		return (
			<Fragment>
				{ map( getBlockTypes(), ( block ) => {
					if( block.category == 'coblocks' ){
						return (
							<CheckboxControl
								className="edit-post-options-modal__option"
								label={ block.title }
								checked={ ( !savedSettings[ block.name ] ) ? true : false }
								value={ block.name }
								onChange={ ( checked ) => {
									onChecked( block.name , checked );
								} }
							/>		
						);
					}
				} ) }
			</Fragment>
		);
	}
};

export default DisableBlocks;