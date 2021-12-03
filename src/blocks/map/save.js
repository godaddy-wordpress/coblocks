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
		fullscreenControl,
		iconSize,
		lat,
		lng,
		mapTypeControl,
		skin,
		streetViewControl,
		zoom,
		zoomControl,
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
					frameBorder="0"
					src={ `https://www.google.com/maps?q=${ encodeURIComponent( address ) }&output=embed&hl=${ locale }&z=${ zoom }` }
					style={ { minHeight: height + 'px', width: '100%' } }
					title={ __( 'Google Map', 'coblocks' ) }
				/>
			}
		</div>
	);
}

export default Save;
