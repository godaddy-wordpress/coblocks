/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
const { attributes } = metadata;

const deprecatedIframeEmbed = ( deprecated ) => {
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
	} = deprecated.attributes;

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

	const attr = Object.keys( mapAttributes )
		.map( ( key ) => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
		.join( '||' );

	const dataMap = { 'data-map-attr': attr };

	return <div style={ backgroundStyles } { ...dataMap } />;
};

const deprecatedUserLocale = ( deprecated ) => {
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
	} = deprecated.attributes;

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

	const attr = Object.keys( mapAttributes )
		.map( ( key ) => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
		.join( '||' );

	const dataMap = { 'data-map-attr': attr };

	return (
		<div style={ backgroundStyles } { ...dataMap }>
			{ ! hasApiKey && (
				<iframe
					frameBorder="0"
					src={
						'https://www.google.com/maps?q=' +
						encodeURIComponent( address ) +
						'&language=ja&output=embed&hl=%s&z=' +
						zoom
					}
					style={ { minHeight: height + 'px', width: '100%' } }
					title={ __( 'Google Map', 'coblocks' ) }
				/>
			) }
		</div>
	);
};

const deprecated = [
	{
		attributes,
		save: deprecatedIframeEmbed,
	},
	{
		attributes,
		save: deprecatedUserLocale,
	},
];

export default deprecated;
