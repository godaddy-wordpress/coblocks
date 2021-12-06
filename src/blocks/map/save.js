import { __ } from '@wordpress/i18n';

function Save( { attributes } ) {
	const {
		address,
		height,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
		hasApiKey,
	} = attributes;

	const backgroundStyles = {
		minHeight: height ? height + 'px' : undefined,
	};

	const mapAttributes = {
		address,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
	};

	const locale = document.documentElement.lang;

	const attr = Object
		.keys( mapAttributes )
		.map( ( key ) => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
		.join( '||' );

	const dataMap = { 'data-map-attr': attr };

	return (
		<div style={ backgroundStyles } { ...dataMap } >
			{
				! hasApiKey &&
				<iframe
					title={ __( 'Google Map', 'coblocks' ) }
					frameBorder="0"
					style={ { width: '100%', minHeight: height + 'px' } }
					src={ `https://www.google.com/maps?q=${ encodeURIComponent( address ) }&output=embed&hl=${ locale }&z=${ zoom }` }
				/>
			}
		</div>
	);
}

export default Save;
