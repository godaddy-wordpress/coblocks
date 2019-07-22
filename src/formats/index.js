/**
 * Internal dependencies
 */
import { uppercase } from './uppercase';

/**
 * WordPress dependencies
 */
const { registerFormatType } = wp.richText;

function registerFormats() {
	[
		uppercase,
	].forEach( ( { name, ...settings } ) => registerFormatType( name, settings ) );
}
registerFormats();
