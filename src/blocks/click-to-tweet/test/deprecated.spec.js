/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';
import googleFonts from '../../../components/font-family/fonts';

const variations = {
	className: [ undefined, '', 'random classes' ],
	content: [ undefined, '', 'Text to tweet' ],
	url: [ undefined ],
	textAlign: [ undefined, 'left', 'center', 'right' ],
	via: [ undefined ],
	buttonText: [ undefined, '', 'Button text' ],
	buttonColor: [ undefined, 'primary' ],
	customButtonColor: [ undefined, '#123456' ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, '0', '16' ],
	fontFamily: [ undefined, ...Object.keys( googleFonts ) ],
	fontWeight: [ undefined, '', 'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
	lineHeight: [ undefined, 0, 3, 2.5 ],
	letterSpacing: [ undefined, 0, 3, -1, 2.5 ],
	textTransform: [ undefined, '', 'uppercase', 'lowercase', 'capitalize', 'initial' ],
	noBottomSpacing: [ undefined, true, false ],
	noTopSpacing: [ undefined, true, false ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
