/**
 * External dependencies
 */
import map from 'lodash/map';

const MapInnerBlocks = ( innerBlocks ) => {
	let blockNames = {};

	map( innerBlocks, ( innerBlock ) => {
		if ( ! blockNames[ innerBlock.name ] ) {
			blockNames[ innerBlock.name ] = innerBlock.name;
		}

		//check inner blocks too
		if ( innerBlock.innerBlocks ) {
			const getInnerBlocks = MapInnerBlocks( innerBlock.innerBlocks );
			blockNames = { ...blockNames, ...getInnerBlocks };
		}
	} );

	return blockNames;
};

export default MapInnerBlocks;
