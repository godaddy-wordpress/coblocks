/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import MapInnerBlocks from './components/map-innerblocks';

/**
 * WordPress dependencies
 */
const { registerFormatType } = wp.richText;
const { models, loadPromise } = wp.api;

function deprecateBlockManager () {
	let settings;

	loadPromise.then( () => {
		settings = new models.Settings();

		settings.fetch().then( response => {
			let optionSettings = response.coblocks_settings_api;
			if( optionSettings.length > 0 ){
				optionSettings = JSON.parse( optionSettings );
				if( typeof optionSettings.deprecated === 'undefined' ){
					//get current blocks
					let currentBlocks = wp.data.select( 'core/editor' ).getBlocks();
					let blockNames	  = MapInnerBlocks( currentBlocks );
					let hideBlockTypes = [];
					
					map( optionSettings, ( visible, block ) => {
						if( visible && !block.includes( 'mainCategory-' ) && !blockNames[ block ] ){
							hideBlockTypes.push( block );
						}
					} );

					optionSettings = Object.assign( optionSettings, {
						deprecated: true,
					} );

					//Save deprecated object to options table for checking
					const model = new models.Settings( { coblocks_settings_api: JSON.stringify( optionSettings ) } );
					model.save().then( response => {
						// do nothing
					} );

					// Add array of blocks to disabled blocks
					// Reference: https://github.com/WordPress/gutenberg/issues/14139#issuecomment-480261866
					if( hideBlockTypes.length > 0 ){
						wp.data.dispatch( 'core/edit-post' ).hideBlockTypes( hideBlockTypes );
					}
				}
			}
		});
	});
};
deprecateBlockManager();
