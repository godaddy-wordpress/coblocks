/**
 * Internal dependencies
 */
import { uppercase } from './uppercase';

/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';

function registerFormats() {
	[
		uppercase,
	].forEach( ( { name, ...settings } ) => registerFormatType( name, settings ) );
}
registerFormats();
