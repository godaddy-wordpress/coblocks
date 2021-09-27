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
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, PanelBody, ToggleControl, RangeControl, TextControl, Button, ButtonGroup, ExternalLink } from '@wordpress/components';
import { ENTER } from '@wordpress/keycodes';

const GET_KEY_URL = 'https://cloud.google.com/maps-platform';
const HELP_URL = 'https://developers.google.com/maps/documentation/javascript/get-api-key';

class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			apiKey: props.apiKey,
			isSavedKey: false,
			keySaved: false,
			address: props.attributes.address,
		};

		this.setControls = this.setControls.bind( this );
		this.updateApiKey = this.updateApiKey.bind( this );
		this.removeApiKey = this.removeApiKey.bind( this );
		this.handleKeyDown = this.handleKeyDown.bind( this );
	}

	componentDidMount() {
		this.setState( { apiKey: this.props.apiKey } );
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

	updateApiKey() {
		this.props.updateApiKeyCallBack( this.state.apiKey );
	}

	removeApiKey() {
		this.setState( { apiKey: '' } );
		this.props.updateApiKeyCallBack( '' );
	}

	handleKeyDown( keyCode ) {
		if ( keyCode !== ENTER ) {
			return;
		}

		this.updateApiKey();
	}

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
						<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
							<div className="components-coblocks-map-styles">
								<ButtonGroup aria-label={ __( 'Select map style', 'coblocks' ) }>
									{ map( styleOptions, ( { label, value } ) => (
										<div className={ value === skin ? 'components-coblocks-map-styles__button-wrapper components-button--${ value } is-selected' : 'components-coblocks-map-styles__button-wrapper components-button--${ value }' }>
											<Button
												className={ value === skin ? `components-coblocks-map-styles__button components-button--${ value } components-coblocks-map-styles__button--selected` : `components-button--${ value } components-coblocks-map-styles__button` }
												isSmall
												onClick={ () => {
													setAttributes( { skin: value } );
												} }
											>
											</Button>
											<div className="block-editor-block-styles__item-label">
												{ label }
											</div>
										</div>
									) ) }
								</ButtonGroup>
							</div>
						</PanelBody>
					}
					{ address &&
						<PanelBody title={ __( 'Map settings', 'coblocks' ) }>
							<Fragment>
								<BaseControl label={ __( 'Height in pixels', 'coblocks' ) } id="map-height-control">
									<input
										type="number"
										aria-label={ __( 'Height for the map in pixels', 'coblocks' ) }
										onChange={ ( event ) => setAttributes( { height: parseInt( event.target.value, 10 ) } ) }
										value={ height }
										min={ 200 }
										step={ 10 }
									/>
								</BaseControl>
								<RangeControl
									label={ __( 'Zoom Level', 'coblocks' ) }
									value={ zoom }
									onChange={ ( nextZoom ) => setAttributes( { zoom: nextZoom } ) }
									min={ 5 }
									max={ 20 }
									step={ 1 }
								/>
								{
									!! apiKey &&
									<RangeControl
										label={ __( 'Marker size', 'coblocks' ) }
										value={ iconSize }
										onChange={ ( nextIconSize ) => setAttributes( { iconSize: nextIconSize } ) }
										min={ 20 }
										max={ 100 }
										step={ 2 }
									/>
								}
								{
									!! apiKey &&
									<ToggleControl
										label={ __( 'Map controls', 'coblocks' ) }
										checked={ !! controls }
										onChange={ this.setControls }
										help={ !! controls ? __( 'Fine control options are enabled.', 'coblocks' ) : __( 'Toggle to enable map control options.', 'coblocks' ) }
									/>
								}
							</Fragment>
						</PanelBody>
					}
					{ !! apiKey && address && pinned && controls &&
						<PanelBody
							title={ __( 'Map controls', 'coblocks' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Map type', 'coblocks' ) }
								checked={ !! mapTypeControl }
								onChange={ () => setAttributes( { mapTypeControl: ! mapTypeControl } ) }
								help={ !! mapTypeControl ? __( 'Switching between standard and satellite map views is enabled.', 'coblocks' ) : __( 'Toggle to enable switching between standard and satellite maps.', 'coblocks' ) }
							/>
							<ToggleControl
								label={ __( 'Zoom controls', 'coblocks' ) }
								checked={ !! zoomControl }
								onChange={ () => setAttributes( { zoomControl: ! zoomControl } ) }
								help={ !! zoomControl ? __( 'Showing map zoom controls.', 'coblocks' ) : __( 'Toggle to enable zooming in and out on the map with zoom controls.', 'coblocks' ) }
							/>
							<ToggleControl
								label={ __( 'Street view', 'coblocks' ) }
								checked={ !! streetViewControl }
								onChange={ () => setAttributes( { streetViewControl: ! streetViewControl } ) }
								help={ !! streetViewControl ? __( 'Showing the street view map control.', 'coblocks' ) : __( 'Toggle to show the street view control at the bottom right.', 'coblocks' ) }
							/>
							<ToggleControl
								label={ __( 'Fullscreen toggle', 'coblocks' ) }
								checked={ !! fullscreenControl }
								onChange={ () => setAttributes( { fullscreenControl: ! fullscreenControl } ) }
								help={ !! fullscreenControl ? __( 'Showing the fullscreen map control.', 'coblocks' ) : __( 'Toggle to show the fullscreen map control.', 'coblocks' ) }
							/>
						</PanelBody>
					}
					<PanelBody
						title={ __( 'Google Maps API key', 'coblocks' ) }
						initialOpen={ false }
						className="components-coblocks-block-settings-sidebar"
					>
						<p>{ __( 'Add a Google Maps API key. Updating this API key will set all your maps to use the new key.', 'coblocks' ) }</p>
						{ apiKey === '' &&
							<p>
								<ExternalLink href={ GET_KEY_URL }>{ __( 'Get a key', 'coblocks' ) }</ExternalLink>|&nbsp;
								<ExternalLink href={ HELP_URL }>{ __( 'Need help?', 'coblocks' ) }</ExternalLink>
							</p>
						}
						<TextControl
							value={ this.state.apiKey }
							onChange={ ( value ) => this.setState( { apiKey: value } ) }
							placeholder={ __( 'Add Google API key…', 'coblocks' ) }
							onKeyDown={ ( { keyCode } ) => this.handleKeyDown( keyCode ) }
							className="components-block-coblocks-map-api-key__custom-input"
						/>
						<Button
							isPrimary
							onClick={ this.updateApiKey }
							disabled={ ( this.state.apiKey === '' ) || ( this.state.apiKey === this.props.apiKey ) }
						>
							{ ( this.state.apiKey === this.props.apiKey && this.props.apiKey !== '' ) ? __( 'Saved', 'coblocks' ) : __( 'Save', 'coblocks' ) }
						</Button>
						{ apiKey &&
							<Button
								className="components-block-coblocks-map-api-key-remove__button"
								isSecondary
								onClick={ this.removeApiKey }
								disabled={ this.state.apiKey !== this.props.apiKey || ! this.state.apiKey }
							>
								{ __( 'Remove', 'coblocks' ) }
							</Button>
						}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;

