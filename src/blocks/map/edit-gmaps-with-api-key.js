/**
 * External dependencies
 */
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';

const GoogleMapWithApiKey = ( { apiKey, props } ) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: apiKey,
	} );

	const {
		attributes,
	} = props;

	const {
		address,
		zoom,
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

	// const onLoad = useCallback(
	// 	function onLoad ( mapInstance ) {
	// 		if ( coords ) {
	// 			mapInstance.setCenter( {
	// 				lat: coords.lat,
	// 				lng: coords.lng,
	// 			});
	// 		}
	// 	}
	// );
	//

	const renderMap = () => {
		return coords ? <GoogleMap
			id="circle-example"
			mapContainerStyle={{
				height: "100%",
				width: "100%"
			}}
			zoom={ zoom }
			center={{
				lat: coords.lat,
				lng: coords.lng,
			}}
			//onLoad={onLoad}
		/> : <></>;
	};

	if (loadError) {
		return <div>Oups</div>
	}

	return isLoaded ? renderMap() : <Spinner />
};

export default GoogleMapWithApiKey;
