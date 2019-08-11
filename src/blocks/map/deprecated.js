/**
 * Internal dependencies
 */
import metadata from './block.json';
const { attributes } = metadata;

const deprecated = [
	{
		attributes,
		save( { attributes } ) {
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

			const attr = Object
				.keys( mapAttributes )
				.map( key => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
				.join( '||' );

			const dataMap = { 'data-map-attr': attr };

			return (
				<div style={ backgroundStyles } { ...dataMap } />
			);
		},
	},
];

export default deprecated;
