/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';
import googleFonts from '../../../components/font-family/fonts';

const variations = {
	className: [ undefined, '', 'random classes' ],
	anchor: [ undefined, '' ], // TODO: figure out how to test this core attribute.
	align: [ '', 'wide', 'full', 'left', 'center', 'right' ],
	verticalAlignment: [ undefined, 'top', 'center', 'bottom' ],
	gutter: [ 'none', 'small', 'medium', 'large', 'xlarge' ],
	layout: [ undefined, '', '100', '50-50', '25-75', '75-25', '66-33', '33-66', '33-33-33', '50-25-25', '25-25-50', '25-50-25', '20-60-20', '25-25-25-25', '40-20-20-20', '20-20-20-40' ],
	columns: [ 1, 2, 3, 4 ],
	id: [ undefined, 0, 12345 ],
	coblocks: [ undefined, {}, { id: undefined }, { id: 'testing' } ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, 100 ],
	fontFamily: [ undefined, ...Object.keys( googleFonts ) ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	lineHeight: [ undefined, 0, 3, 2.5 ],
	letterSpacing: [ undefined, 0, 3, -1, 2.5 ],
	fontWeight: [ undefined, '', 'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
	textTransform: [ undefined, '', 'uppercase', 'lowercase', 'capitalize', 'initial' ],
	isStackedOnMobile: [ true, false ],
	noBottomSpacing: [ undefined, true, false ],
	noTopSpacing: [ undefined, true, false ],
	noBottomMargin: [ undefined, true, false ],
	noTopMargin: [ undefined, true, false ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
