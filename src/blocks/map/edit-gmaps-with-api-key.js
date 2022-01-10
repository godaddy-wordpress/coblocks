/**
 * External dependencies
 */
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GMapStyles from './map-styles';

const GoogleMapWithApiKey = ( { apiKey, props } ) => {
	const { isLoaded } = useLoadScript( {
		googleMapsApiKey: apiKey,
	} );

	const {
		attributes,
	} = props;

	const {
		address,
		fullscreenControl,
		iconSize,
		mapTypeControl,
		skin,
		streetViewControl,
		zoom,
		zoomControl,
	} = attributes;

	const [ coords, setCoords ] = useState( null );

	useEffect( () => {
		if ( isLoaded ) {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode(
				{ address },
				function( results, status ) {
					if ( status !== 'OK' ) {
						props.setAttributes( {
							hasError: __( 'Invalid API key, or too many requests', 'coblocks' ),
							pinned: false,
						} );
						return;
					}

					setCoords( results[ 0 ].geometry.location.toJSON() );

					props.setAttributes( {
						hasError: '',
						lat: results[ 0 ].geometry.location.toJSON().lat.toString(),
						lng: results[ 0 ].geometry.location.toJSON().lng.toString(),
					} );
				}.bind( this )
			);
		}
	}, [ address, isLoaded ] );

	const marker = {
		scaledSize: { height: iconSize, width: iconSize },
		url:
			'/wp-content/plugins/coblocks/assets/markers/' +
			skin +
			'.svg',
	};

	const renderMap = () => {
		return coords ? <GoogleMap
			center={
				{
					lat: coords.lat,
					lng: coords.lng,
				}
			}
			id="coblocks-google-maps"
			mapContainerStyle={
				{
					height: '100%',
				}
			}
			options={
				{
					draggable: false,
					fullscreenControl,
					mapTypeControl,
					streetViewControl,
					styles: GMapStyles[ skin ],
					zoomControl,
				}
			}
			zoom={ zoom }
		>
			<Marker
				icon={ marker }
				position={
					{
						lat: coords.lat,
						lng: coords.lng,
					}
				}
			/>
		</GoogleMap> : null;
	};

	return isLoaded ? renderMap() : <Spinner />;
};

export default GoogleMapWithApiKey;
