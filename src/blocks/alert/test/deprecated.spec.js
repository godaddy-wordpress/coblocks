/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';
import googleFonts from '../../../components/font-family/fonts';

const variations = {
	title: [ undefined, '' ],
	value: [ undefined, '', [] ],
	backgroundColor: [ undefined, 'primary' ],
	customBackgroundColor: [ undefined, '#123456' ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	titleColor: [ undefined, 'primary' ],
	customTitleColor: [ undefined, '#123456' ],
	borderColor: [ undefined, 'primary' ],
	customBorderColor: [ undefined, '#123456' ],
	textAlign: [ undefined, 'left', 'center', 'right' ],
	type: [ undefined, 'default', 'info', 'success', 'warning', 'error' ],
	className: [ undefined, '', 'random classes' ],
	align: [ '', 'wide', 'full', 'left', 'right', 'center' ],
	noBottomSpacing: [ undefined, true, false ],
	noTopSpacing: [ undefined, true, false ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, 100 ],
	fontFamily: [ undefined, ...Object.keys( googleFonts ) ],
	fontWeight: [ undefined, '', 'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
	lineHeight: [ undefined, 0, 3, 2.5 ],
	letterSpacing: [ undefined, 0, 3, -1, 2.5 ],
	textTransform: [ undefined, '', 'uppercase', 'lowercase', 'capitalize', 'initial' ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
