/**
 * Internal dependencies
 */
import * as uppercase from './uppercase';

/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';

export default function registerCoBlocksFormats() {
	[
		uppercase,
	].forEach( ( { name, settings } ) => {
		registerFormatType( name, settings );
	} );
}

registerCoBlocksFormats();
