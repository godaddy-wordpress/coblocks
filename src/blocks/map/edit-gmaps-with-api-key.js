/**
 * External dependencies
 */
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

const GoogleMapWithApiKey = ( { apiKey } ) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: apiKey,
	} );

	const onLoad = useCallback(
		function onLoad ( mapInstance ) {
			console.log( mapInstance )
		}
	);
	//

	const renderMap = () => {
		return <GoogleMap
			id="circle-example"
			mapContainerStyle={{
				height: "200px",
				width: "100%"
			}}
			zoom={7}
			center={{
				lat: -3.745,
				lng: -38.523
			}}
			onLoad={onLoad}
		/>
	}

	if (loadError) {
		return <div>Oups</div>
	}

	return isLoaded ? renderMap() : <Spinner />
};

export default GoogleMapWithApiKey;
