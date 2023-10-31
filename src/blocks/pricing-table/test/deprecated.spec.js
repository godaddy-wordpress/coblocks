/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';
import googleFonts from '../../../components/font-family/fonts';

const variations = {
	count: [ 1, 2, 3, 4 ],
	contentAlign: [ '', 'left', 'center', 'right' ],
	align: [ '', 'wide', 'full', 'left', 'center', 'right' ],
	className: [ undefined, '', 'random classes' ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, 100 ],
	fontFamily: [ undefined, ...Object.keys( googleFonts ) ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	lineHeight: [ undefined, 0, 3, 2.5 ],
	letterSpacing: [ undefined, 0, 3, -1, 2.5 ],
	fontWeight: [ undefined, '', 'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
	textTransform: [ undefined, '', 'uppercase', 'lowercase', 'capitalize', 'initial' ],
	noBottomSpacing: [ undefined, true, false ],
	noTopSpacing: [ undefined, true, false ],
	gutter: [ undefined, 'no', 'small', 'medium', 'large', 'huge' ],
	features: [ undefined, 'cool feature' ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
