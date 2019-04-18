/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { styleOptions } from './styles';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, ToggleControl, RangeControl, TextControl, TextareaControl, Button, ButtonGroup } = wp.components;

/**
 * Get settings
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

const RETRIEVE_KEY_URL = 'https://cloud.google.com/maps-platform';
const HELP_URL = 'https://developers.google.com/maps/documentation/javascript/get-api-key';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );

		this.saveApiKey = this.saveApiKey.bind( this );
		this.removeApiKey = this.removeApiKey.bind( this );
		this.setControls = this.setControls.bind( this );

		this.state = {
			apiKey: '',
			isSavedKey: false,
			isLoading: true,
			isSaving: false,
			keySaved: false,
		};

		settings.on( 'change:coblocks_google_maps_api_key', ( model ) => {
			const apiKey = model.get( 'coblocks_google_maps_api_key' );
			this.setState( { apiKey: settings.get( 'coblocks_google_maps_api_key' ), isSavedKey: ( apiKey === '' ) ? false : true } );
		} );

		settings.fetch().then( response => {
			this.setState( { apiKey: response.coblocks_google_maps_api_key } );
			if ( this.state.apiKey && this.state.apiKey !== '' ) {
				this.setState( { isSavedKey: true } );
			}
			this.setState( { isLoading: false } );
		} );
	}

	saveApiKey() {
		this.setState( { isSaving: true } );
		const model = new wp.api.models.Settings( { coblocks_google_maps_api_key: this.state.apiKey } );
		model.save().then( () => {
			this.setState( { isSavedKey: true, isLoading: false, isSaving: false, keySaved: true } );
			settings.fetch();
		} );
	}

	removeApiKey() {
		this.setState( { apiKey: '' } );
		if ( this.state.isSavedKey ) {
			this.setState( { isSaving: true } );
			const model = new wp.api.models.Settings( { coblocks_google_maps_api_key: '' } );
			model.save().then( () => {
				this.setState( { isSavedKey: false, isLoading: false, isSaving: false, keySaved: false } );
				settings.fetch();
			} );
		}
	}

	setControls() {
		const {
			setAttributes,
			attributes,
		} = this.props;

		const {
			controls,
		} = attributes;

		setAttributes( {
			controls: ! controls,
			mapTypeControl: ! controls,
			zoomControl: ! controls,
			streetViewControl: ! controls,
			fullscreenControl: ! controls,
		} );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			address,
			height,
			skin,
			pinned,
			controls,
			zoom,
			iconSize,
			mapTypeControl,
			zoomControl,
			streetViewControl,
			fullscreenControl,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					{ address && pinned &&
						<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
							<div className="components-coblocks-visual-dropdown">
								<ButtonGroup aria-label={ __( 'Select Map Style' ) }>
									{ map( styleOptions, ( { label, value } ) => (
										<div className={ ( value === skin ) ? 'components-coblocks-visual-dropdown__button-wrapper components-button--${ value } is-selected' : 'components-coblocks-visual-dropdown__button-wrapper components-button--${ value }' }>
											<Button
												className={ ( value === skin ) ? `components-coblocks-visual-dropdown__button components-button--${ value } components-coblocks-visual-dropdown__button--selected` : `components-button--${ value } components-coblocks-visual-dropdown__button` }
												isSmall
												onClick={ () => {
													setAttributes( { skin: value } );
												} }
											>
											</Button>
											<div className="editor-block-styles__item-label">
												{ label }
											</div>
										</div>
									) ) }
								</ButtonGroup>
							</div>
						</PanelBody>
					}
					<PanelBody title={ __( 'Map Settings' ) }>
						<TextareaControl
							label={ __( 'Address' ) }
							value={ address }
							placeholder={ __( 'Enter address…' ) }
							onChange={ ( nextAddress ) => setAttributes( { address: nextAddress, pinned: false } ) }
						/>
						{ address && pinned &&
						<Fragment>
							<RangeControl
								label={ __( 'Zoom Level' ) }
								value={ zoom }
								onChange={ ( nextZoom ) => setAttributes( { zoom: nextZoom } ) }
								className="components-block-coblocks-map-zoom__custom-input"
								min={ 5 }
								max={ 20 }
								step={ 1 }
							/>
							<RangeControl
								label={ __( 'Marker Size' ) }
								value={ iconSize }
								onChange={ ( nextIconSize ) => setAttributes( { iconSize: nextIconSize } ) }
								className="components-block-coblocks-map-icon-size__custom-input"
								min={ 20 }
								max={ 100 }
								step={ 2 }
							/>
							<RangeControl
								label={ __( 'Height in pixels' ) }
								aria-label={ __( 'Height for the map in pixels' ) }
								value={ height }
								onChange={ () => setAttributes( { height: parseInt( event.target.value, 10 ) } ) }
								className="components-block-coblocks-height__custom-input"
								min={ 200 }
								max={ 1000 }
								step={ 10 }
							/>
							<ToggleControl
								label={ __( 'Map Controls' ) }
								checked={ !! controls }
								onChange={ () => this.setControls() }
								help={ !! controls ? __( 'Fine control options are enabled.' ) : __( 'Toggle to enable map control options.' ) }
							/>
						</Fragment>
						}
					</PanelBody>
					{ address && pinned && controls &&
						<PanelBody
							title={ __( 'Map Controls' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Map Type' ) }
								checked={ !! mapTypeControl }
								onChange={ () => setAttributes( { mapTypeControl: ! mapTypeControl } ) }
								help={ !! mapTypeControl ? __( 'Switching between standard and satellite map views is enabled.' ) : __( 'Toggle to enable switching between standard and satellite maps.' ) }
							/>
							<ToggleControl
								label={ __( 'Zoom Controls' ) }
								checked={ !! zoomControl }
								onChange={ () => setAttributes( { zoomControl: ! zoomControl } ) }
								help={ !! zoomControl ? __( 'Showing map zoom controls.' ) : __( 'Toggle to enable zooming in and out on the map with zoom controls.' ) }
							/>
							<ToggleControl
								label={ __( 'Street View' ) }
								checked={ !! streetViewControl }
								onChange={ () => setAttributes( { streetViewControl: ! streetViewControl } ) }
								help={ !! streetViewControl ? __( 'Showing the street view map control.' ) : __( 'Toggle to show the street view control at the bottom right.' ) }
							/>
							<ToggleControl
								label={ __( 'Fullscreen Toggle' ) }
								checked={ !! fullscreenControl }
								onChange={ () => setAttributes( { fullscreenControl: ! fullscreenControl } ) }
								help={ !! fullscreenControl ? __( 'Showing the fullscreen map control.' ) : __( 'Toggle to show the fullscreen map control.' ) }
							/>
						</PanelBody>
					}
					<PanelBody title={ __( 'Google Maps API Key' ) } initialOpen={ false }>
						<p>{ __( 'Add your Google Maps API key. Updating this API key will set all your maps to use the new key.' ) }</p>
						{ ( this.state.apiKey === '' ) ?
							<p><span><a href={ RETRIEVE_KEY_URL } target="_blank" rel="noopener noreferrer"> { __( 'Retrieve your key' ) }</a> | <a href={ HELP_URL } target="_blank" rel="noopener noreferrer">{ __( 'Need help?' ) }</a></span></p> :
							null }
						<TextControl
							value={ this.state.apiKey }
							onChange={ value => this.setState( { apiKey: value } ) }
							placeholder={ __( 'Enter Google API Key…' ) }
							className="components-block-coblocks-map-api-key__custom-input"
						/>
						<Button
							isPrimary
							onClick={ this.saveApiKey }
							disabled={ this.state.apiKey === '' }
						>
							{ __( 'Update' ) }
						</Button>
						<Button
							className="components-block-coblocks-map-api-key-remove__button"
							isDefault
							onClick={ this.removeApiKey }
							disabled={ this.state.apiKey === '' }
						>
							{ __( 'Remove' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
