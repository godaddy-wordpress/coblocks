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
import { ENTER } from '@wordpress/keycodes';
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, Button, ButtonGroup, ExternalLink, PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const GET_KEY_URL = 'https://cloud.google.com/maps-platform';
const HELP_URL = 'https://developers.google.com/maps/documentation/javascript/get-api-key';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		apiKey,
		updateApiKeyCallBack,
	} = props;

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

	const [ apiKeyState, setApiKey ] = useState( apiKey );

	useEffect( () => {
		setApiKey( apiKey );
	}, [] );

	const setControls = () => {
		setAttributes( {
			controls: ! controls,
			fullscreenControl: ! controls,
			mapTypeControl: ! controls,
			streetViewControl: ! controls,
			zoomControl: ! controls,
		} );
	};

	const updateApiKey = () => {
		updateApiKeyCallBack( apiKeyState );
	};

	const removeApiKey = () => {
		setApiKey( '' );
		updateApiKeyCallBack( '' );
	};

	const handleKeyDown = ( keyCode ) => {
		if ( keyCode !== ENTER ) {
			return;
		}

		updateApiKey();
	};

	return (
		<>
			<InspectorControls>
				{ !! apiKey && address && pinned &&
				<PanelBody initialOpen={ false } title={ __( 'Styles', 'coblocks' ) } >
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
					<>
						<BaseControl id="map-height-control" label={ __( 'Height in pixels', 'coblocks' ) } >
							<input
								aria-label={ __( 'Height for the map in pixels', 'coblocks' ) }
								min={ 200 }
								onChange={ ( event ) => setAttributes( { height: parseInt( event.target.value, 10 ) } ) }
								step={ 10 }
								type="number"
								value={ height }
							/>
						</BaseControl>
						<RangeControl
							label={ __( 'Zoom Level', 'coblocks' ) }
							max={ 20 }
							min={ 5 }
							onChange={ ( nextZoom ) => setAttributes( { zoom: nextZoom } ) }
							step={ 1 }
							value={ zoom }
						/>
						{
							!! apiKey &&
							<RangeControl
								label={ __( 'Marker size', 'coblocks' ) }
								max={ 100 }
								min={ 20 }
								onChange={ ( nextIconSize ) => setAttributes( { iconSize: nextIconSize } ) }
								step={ 2 }
								value={ iconSize }
							/>
						}
						{
							!! apiKey &&
							<ToggleControl
								checked={ !! controls }
								help={ !! controls ? __( 'Fine control options are enabled.', 'coblocks' ) : __( 'Toggle to enable map control options.', 'coblocks' ) }
								label={ __( 'Map controls', 'coblocks' ) }
								onChange={ setControls }
							/>
						}
					</>
				</PanelBody>
				}
				{ !! apiKey && address && pinned && controls &&
				<PanelBody
					initialOpen={ false }
					title={ __( 'Map controls', 'coblocks' ) }
				>
					<ToggleControl
						checked={ !! mapTypeControl }
						help={ !! mapTypeControl ? __( 'Switching between standard and satellite map views is enabled.', 'coblocks' ) : __( 'Toggle to enable switching between standard and satellite maps.', 'coblocks' ) }
						label={ __( 'Map type', 'coblocks' ) }
						onChange={ () => setAttributes( { mapTypeControl: ! mapTypeControl } ) }
					/>
					<ToggleControl
						checked={ !! zoomControl }
						help={ !! zoomControl ? __( 'Showing map zoom controls.', 'coblocks' ) : __( 'Toggle to enable zooming in and out on the map with zoom controls.', 'coblocks' ) }
						label={ __( 'Zoom controls', 'coblocks' ) }
						onChange={ () => setAttributes( { zoomControl: ! zoomControl } ) }
					/>
					<ToggleControl
						checked={ !! streetViewControl }
						help={ !! streetViewControl ? __( 'Showing the street view map control.', 'coblocks' ) : __( 'Toggle to show the street view control at the bottom right.', 'coblocks' ) }
						label={ __( 'Street view', 'coblocks' ) }
						onChange={ () => setAttributes( { streetViewControl: ! streetViewControl } ) }
					/>
					<ToggleControl
						checked={ !! fullscreenControl }
						help={ !! fullscreenControl ? __( 'Showing the fullscreen map control.', 'coblocks' ) : __( 'Toggle to show the fullscreen map control.', 'coblocks' ) }
						label={ __( 'Fullscreen toggle', 'coblocks' ) }
						onChange={ () => setAttributes( { fullscreenControl: ! fullscreenControl } ) }
					/>
				</PanelBody>
				}
				<PanelBody
					className="components-coblocks-block-settings-sidebar"
					initialOpen={ false }
					title={ __( 'Google Maps API key', 'coblocks' ) }
				>
					<p>{ __( 'Add a Google Maps API key. Updating this API key will set all your maps to use the new key.', 'coblocks' ) }</p>
					{ apiKey === '' &&
					<p>
						<ExternalLink href={ GET_KEY_URL }>{ __( 'Get a key', 'coblocks' ) }</ExternalLink>|&nbsp;
						<ExternalLink href={ HELP_URL }>{ __( 'Need help?', 'coblocks' ) }</ExternalLink>
					</p>
					}
					<TextControl
						className="components-block-coblocks-map-api-key__custom-input"
						onChange={ ( value ) => setApiKey( value ) }
						onKeyDown={ ( { keyCode } ) => handleKeyDown( keyCode ) }
						placeholder={ __( 'Add Google API key…', 'coblocks' ) }
						value={ apiKeyState }
					/>
					<Button
						disabled={ ( apiKeyState === '' ) || ( apiKeyState === apiKey ) }
						isPrimary
						onClick={ updateApiKey }
					>
						{ ( apiKeyState === apiKey && apiKey !== '' ) ? __( 'Saved', 'coblocks' ) : __( 'Save', 'coblocks' ) }
					</Button>
					{ apiKey &&
					<Button
						className="components-block-coblocks-map-api-key-remove__button"
						disabled={ apiKeyState !== apiKey || ! apiKeyState }
						isSecondary
						onClick={ removeApiKey }
					>
						{ __( 'Remove', 'coblocks' ) }
					</Button>
					}
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;

