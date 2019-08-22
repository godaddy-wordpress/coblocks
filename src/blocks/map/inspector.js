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
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, RangeControl, TextControl, Button, ButtonGroup, ExternalLink } = wp.components;
const { ENTER } = wp.keycodes;

const RETRIEVE_KEY_URL = 'https://cloud.google.com/maps-platform';
const HELP_URL = 'https://developers.google.com/maps/documentation/javascript/get-api-key';

class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			apiKey: props.apiKey,
			isSavedKey: false,
			isLoading: true,
			isSaving: false,
			keySaved: false,
			address: props.attributes.address,
		};
	}

	setControls = () => {
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
	};

	updateApiKey = () => {
		this.props.updateApiKeyCallBack( this.state.apiKey );
	};

	removeApiKey = () => {
		this.setState( { apiKey: '' } );
		this.props.updateApiKeyCallBack( '' );
	};

	handleKeyDown = ( keyCode ) => {
		if ( keyCode !== ENTER ) {
			return;
		}

		this.updateApiKey();
	};

	render() {
		const {
			attributes,
			setAttributes,
			apiKey,
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
					{ !! apiKey && address && pinned &&
						<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
							<div className="components-coblocks-visual-dropdown">
								<ButtonGroup aria-label={ __( 'Select Map Style' ) }>
									{ map( styleOptions, ( { label, value } ) => (
										<div className={ value === skin ? 'components-coblocks-visual-dropdown__button-wrapper components-button--${ value } is-selected' : 'components-coblocks-visual-dropdown__button-wrapper components-button--${ value }' }>
											<Button
												className={ value === skin ? `components-coblocks-visual-dropdown__button components-button--${ value } components-coblocks-visual-dropdown__button--selected` : `components-button--${ value } components-coblocks-visual-dropdown__button` }
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
					{ address &&
						<PanelBody title={ __( 'Map Settings' ) }>
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
									label={ __( 'Height in pixels' ) }
									aria-label={ __( 'Height for the map in pixels' ) }
									value={ height }
									onChange={ ( event ) => setAttributes( { height: parseInt( event.target.value, 10 ) } ) }
									className="components-block-coblocks-height__custom-input"
									min={ 200 }
									max={ 1000 }
									step={ 10 }
								/>
								{
									!! apiKey &&
									<RangeControl
										label={ __( 'Marker Size' ) }
										value={ iconSize }
										onChange={ ( nextIconSize ) => setAttributes( { iconSize: nextIconSize } ) }
										className="components-block-coblocks-map-icon-size__custom-input"
										min={ 20 }
										max={ 100 }
										step={ 2 }
									/>
								}
								{
									!! apiKey &&
									<ToggleControl
										label={ __( 'Map Controls' ) }
										checked={ !! controls }
										onChange={ this.setControls }
										help={ !! controls ? __( 'Fine control options are enabled.' ) : __( 'Toggle to enable map control options.' ) }
									/>
								}
							</Fragment>
						</PanelBody>
					}
					{ !! apiKey && address && pinned && controls &&
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
					<PanelBody
						title={ __( 'Google Maps API Key' ) }
						initialOpen={ false }
						className="components-coblocks-block-settings-sidebar"
					>
						<p>{ __( 'Add your Google Maps API key. Updating this API key will set all your maps to use the new key.' ) }</p>
						{ apiKey === '' &&
							<p>
								<ExternalLink href={ RETRIEVE_KEY_URL }>{ __( 'Retrieve your key' ) }</ExternalLink>|&nbsp;
								<ExternalLink href={ HELP_URL }>{ __( 'Need help?' ) }</ExternalLink>
							</p>
						}
						<TextControl
							value={ this.state.apiKey }
							onChange={ value => this.setState( { apiKey: value } ) }
							placeholder={ __( 'Enter Google API Key…' ) }
							onKeyDown={ ( { keyCode } ) => this.handleKeyDown( keyCode ) }
							className="components-block-coblocks-map-api-key__custom-input"
						/>
						<Button
							isPrimary
							onClick={ this.updateApiKey }
							disabled={ ( this.state.apiKey === '' ) || ( this.state.apiKey === this.props.apiKey ) }
						>
							{ this.props.attributes.hasApiKey ? __( 'Saved' ) : __( 'Save' ) }
						</Button>
						<Button
							className="components-block-coblocks-map-api-key-remove__button"
							isDefault
							onClick={ this.removeApiKey }
							disabled={ this.state.apiKey !== this.props.apiKey || ! this.state.apiKey }
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
