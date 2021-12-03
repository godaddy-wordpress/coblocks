/**
 * External dependencies
 */
import classnames from 'classnames';
import { MapIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GMapStyles from './map-styles';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import {
	Button,
	Icon,
	Placeholder,
	ResizableBox,
	TextControl,
	withNotices,
} from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';

const Edit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
		setAttributes,
	} = props;

	const {
		address,
		hasApiKey,
		pinned,
		height,
		iconSize,
		skin,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
		zoom,
	} = attributes;

	const [ apiKeyState, setApiKey ] = useState( '' );
	const [ addressState, setAddress ] = useState( address );
	const [ coords, setCoords ] = useState( null );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			setApiKey( res.coblocks_google_maps_api_key );
		} );
	}, [] );

	useEffect( () => {
		if ( !! apiKeyState && ! hasApiKey ) {
			setAttributes( { hasApiKey: true } );
		}

		if ( ! isSelected && ! pinned && addressState && Object.keys( addressState ).length ) {
			setAttributes( {
				address: addressState,
				pinned: true,
			} );
		}
	}, [ apiKeyState, hasApiKey, isSelected, pinned, addressState ] );

	const updateApiKey = ( apiKey = apiKeyState ) => {
		apiKey = apiKey.trim();

		saveApiKey( apiKey );

		if ( apiKey === '' ) {
			setAttributes( { hasApiKey: false } );

			if ( ! address ) {
				setAttributes( { pinned: false } );
			}

			return;
		}

		if ( address ) {
			setAttributes( { pinned: true } );
		}
	};

	const saveApiKey = ( apiKey = apiKeyState ) => {
		setApiKey( apiKey );

		apiFetch( {
			data: { coblocks_google_maps_api_key: apiKey },
			method: 'POST',
			path: '/wp/v2/settings',
		} ).then( () => {
			// Everything went well
		} );
	};

	const locale = document.documentElement.lang;

	const renderMap = ( event ) => {
		if ( event ) {
			event.preventDefault();
		}

		setAttributes( { address: addressState, pinned: true } );
	};

	const marker = {
		scaledSize: { height: iconSize, width: iconSize },
		url:
			'/wp-content/plugins/coblocks/assets/markers/' +
			skin +
			'.svg',
	};

	const GoogleMapIframeRender = () => (
		<>
			<div
				style={ { height, position: 'absolute', width: '100%' } }
			/>
			<div className="iframe__overflow-wrapper">
				<iframe
					frameBorder="0"
					src={ `https://www.google.com/maps?q=${ encodeURIComponent(
						address
					) }&output=embed&hl=${ locale }&z=${ zoom }` }
					style={ { minHeight: height + 'px', width: '100%' } }
					title={ __( 'Google Map', 'coblocks' ) }
				/>
			</div>
		</>
	);

	const GoogleMapWithApiKey = () => {
		const { isLoaded } = useJsApiLoader( {
			googleMapsApiKey: apiKeyState,
			id: 'google-map-script',
		} );

		const onLoad = useCallback( () => {
			const geocoder = new window.google.maps.Geocoder();

			geocoder.geocode(
				{ address },
				function( results, status ) {
					if ( status !== 'OK' ) {
						setAttributes( {
							hasError: __( 'Invalid API key, or too many requests', 'coblocks' ),
							pinned: false,
						} );
						return;
					}

					setCoords( results[ 0 ].geometry.location.toJSON() );

					setAttributes( {
						hasError: '',
						lat: results[ 0 ].geometry.location.toJSON().lat.toString(),
						lng: results[ 0 ].geometry.location.toJSON().lng.toString(),
					} );
				}.bind( this )
			);
		} );

		return isLoaded && coords ? (
			<GoogleMap
				defaultCenter={ new window.google.maps.LatLng( coords ) }
				defaultOptions={ {
					draggable: false,
					fullscreenControl,
					mapTypeControl,
					streetViewControl,
					styles: GMapStyles[ skin ],
					zoomControl,
				} }
				defaultZoom={ zoom }
				isMarkerShown={ true }
				onLoad={ onLoad }
			>
				<Marker
					icon={ marker }
					position={ new window.google.maps.LatLng( coords ) }
				/>
			</GoogleMap>
		) : <></>;
	};

	return (
		<>
			{ isSelected && (
				<Inspector
					{ ...props }
					apiKey={ apiKeyState }
					updateApiKeyCallBack={ updateApiKey }
				/>
			) }
			{ isSelected && (
				<Controls { ...props } apiKey={ apiKeyState } />
			) }
			{ pinned ? (
				<ResizableBox
					className={ classnames( className, {
						'is-selected': isSelected,
					} ) }
					enable={ {
						bottom: true,
						bottomLeft: false,
						bottomRight: false,
						left: false,
						right: false,
						top: false,
						topLeft: false,
						topRight: false,
					} }
					minHeight="200"
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
					} }
					showHandle={ isSelected }
					size={ {
						height,
						width: '100%',
					} }
				>
					{ !! apiKeyState
						? GoogleMapWithApiKey() : GoogleMapIframeRender() }
				</ResizableBox>
			) : (
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					instructions={ __(
						'Enter a location or address to drop a pin on a Google map.',
						'coblocks'
					) }
					label={ __( 'Map', 'coblocks' ) }
				>
					<form onSubmit={ renderMap }>
						<TextControl
							className="components-placeholder__input"
							onChange={ ( nextAddress ) =>
								setAddress( nextAddress )
							}
							placeholder={ __(
								'Search for a place or address…',
								'coblocks'
							) }
							value={ addressState || '' }
						/>
						<Button
							disabled={ ! addressState }
							isPrimary={ !! addressState }
							isSecondary={ ! addressState }
							type="submit"
						>
							{ __( 'Search', 'coblocks' ) }
						</Button>
						<div className="components-placeholder__learn-more">
							{ address && (
								<Button
									className="components-placeholder__cancel-button"
									disabled={ ! address }
									isTertiary
									onClick={ () => {
										setAttributes( { pinned: ! pinned } );
										setAddress( address );
									} }
									title={ __( 'Cancel', 'coblocks' ) }
								>
									{ __( 'Cancel', 'coblocks' ) }
								</Button>
							) }
						</div>
					</form>
					{ attributes.lng && attributes.hasError && (
						<span className="invalid-google-maps-api-key">
							{ attributes.hasError }
						</span>
					) }
				</Placeholder>
			) }
		</>
	);
};

export default compose( [ withNotices ] )( Edit );

