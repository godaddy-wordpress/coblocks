/**
 * Internal dependencies
 */
import { code } from './code';
import { uppercase } from './uppercase';

/**
 * WordPress dependencies
 */
const { registerFormatType } = wp.richText;

function registerFormats () {
	[
		uppercase,
		code,
	].forEach( ( { name, ...settings } ) => registerFormatType( name, settings ) );
};
registerFormats();
