/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, ContrastChecker, ColorPalette } = wp.editor;
const { PanelBody, ToggleControl, SelectControl, RangeControl, TextControl, TextareaControl, Button } = wp.components;

/**
 * Get settings
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
});

const RETRIEVE_KEY_URL = '';
const HELP_URL = '';

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );

		this.saveApiKey = this.saveApiKey.bind( this );

		this.state = {
			apiKey: '',
			isSavedKey: false,
			isLoading: true,
			isSaving: false,
			keySaved: false,
		};

		settings.on( 'change:coblocks_google_maps_api_key', (model) => {
			const apiKey = model.get('coblocks_google_maps_api_key');
			this.setState({ apiKey: settings.get( 'coblocks_google_maps_api_key' ), isSavedKey: (apiKey === '' ) ? false : true  });
		});

		settings.fetch().then( response => {
			this.setState({ apiKey: response.coblocks_google_maps_api_key });
			if ( this.state.apiKey && this.state.apiKey !== '' ) {
				this.setState({ isSavedKey: true });
			}
			this.setState({ isLoading: false });
		});
	}

	saveApiKey() {
		this.setState( { isSaving: true } );
		const model = new wp.api.models.Settings( { coblocks_google_maps_api_key: this.state.apiKey } );
		model.save().then( response => {
			this.setState( { isSavedKey: true, isLoading: false, isSaving: false, keySaved: true } );
			settings.fetch();
		});
	}

	render() {

		const {
			attributes,
			setAddress,
			setAttributes,
			setHeight,
		} = this.props;

		const {
			address,
			height,
			skin,
			zoom,
			iconSize,
			mapTypeControl,
			zoomControl,
			streetViewControl,
			fullscreenControl,
		} = attributes;

		const styles = [
			{
				value: 'standard',
				label: __( 'Standard' ),
			},
			{
				value: 'silver',
				label: __( 'Silver' ),
			},
			{
				value: 'retro',
				label: __( 'Retro' ),
			},
			{
				value: 'dark',
				label: __( 'Dark' ),
			},
			{
				value: 'night',
				label: __( 'Night' ),
			},
			{
				value: 'aubergine',
				label: __( 'Aubergine' ),
			},
		];

		return (
			<Fragment>
				<InspectorControls>
					{ address &&
						<PanelBody title={ __( 'Map Settings' ) } className="block-coblocks__inspector-block-settings-panel-body">
							<TextareaControl
								label={ __( 'Address' ) }
								value={ address }
								placeholder={ __( 'Enter address…' ) }
								onChange={ ( nextAddress ) => this.props.setAttributes( { address: nextAddress, pinned: false } ) }
							/>
							<SelectControl
								label={ __( 'Style' ) }
								value={ skin }
								options={ styles }
								onChange={ ( nextSkin ) => setAttributes( { skin: nextSkin } ) }
							/>
							<RangeControl
								label={ __( 'Marker Size' ) }
								value={ iconSize }
								onChange={ ( nextIconSize ) => setAttributes( {  iconSize: nextIconSize } ) }
								className="components-block-coblocks-map-icon-size__custom-input"
								min={ 20 }
								max={ 100 }
								step={ 2 }
								beforeIcon={ 'location' }
							/>
							<RangeControl
								label={ __( 'Zoom Level' ) }
								value={ zoom }
								onChange={ ( nextZoom ) => setAttributes( {  zoom: nextZoom } ) }
								className="components-block-coblocks-map-zoom__custom-input"
								min={ 5 }
								max={ 20 }
								step={ 1 }
								beforeIcon={ 'plus' }
							/>
							<RangeControl
								label={ __( 'Height in pixels' ) }
								aria-label={ __( 'Height for the map in pixels' ) }
								value={ height }
								onChange={ ( ratio ) => setAttributes( {  height: parseInt( event.target.value, 10 ) } ) }
								className="components-block-coblocks-height__custom-input"
								min={ 200 }
								max={ 1000 }
								step={ 10 }
								beforeIcon={ 'image-crop' }
							/>
						</PanelBody>
					}
					{ address &&
						<PanelBody
							title={ __( 'Display Controls' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Display Selector' ) }
								checked={ !! mapTypeControl }
								onChange={ () => setAttributes( {  mapTypeControl: ! mapTypeControl } ) }
							/>
							<ToggleControl
								label={ __( 'Zoom Controls' ) }
								checked={ !! zoomControl }
								onChange={ () => setAttributes( {  zoomControl: ! zoomControl } ) }
							/>
							<ToggleControl
								label={ __( 'Street View Toggle' ) }
								checked={ !! streetViewControl }
								onChange={ () => setAttributes( {  streetViewControl: ! streetViewControl } ) }
							/>
							<ToggleControl
								label={ __( 'Fullscreen Toggle' ) }
								checked={ !! fullscreenControl }
								onChange={ () => setAttributes( {  fullscreenControl: ! fullscreenControl } ) }
							/>
						</PanelBody>
					}
					<PanelBody title={ __( 'API Settings' ) } className='block-coblocks__inspector-block-settings-panel-body' initialOpen={ false }>
						<p>{ __( 'Add your Google Maps API key to display a Google map. Updating this API key will set all your maps to use this new key.') }</p>
						{ ( this.state.apiKey === ''  ) ?
							<p><span><a href={ RETRIEVE_KEY_URL } target="_blank"> { __( 'Retrieve your key' ) }</a> | <a href={ HELP_URL } target="_blank">{ __( 'Need help?' ) }</a></span></p>
						: null }
						<TextControl
							value={ this.state.apiKey }
							onChange={ value => this.setState({ apiKey: value }) }
							placeholder={ __('Enter Google API Key…') }
						/>
						<Button
							isPrimary
							onClick={ this.saveApiKey }
							// isBusy={ this.state.isSaving }
							disabled={ this.state.apiKey === '' }
						>
							{ __('Update API Key') }
						</Button>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
