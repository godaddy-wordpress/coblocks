/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	coblocks: [ undefined, {}, { id: undefined }, { id: 'testing' } ],
	className: [ undefined, '', 'random classes' ],
	align: [ '', 'wide', 'full', 'left', 'right', 'center' ],
	height: [ undefined, 0, 100 ],
	heightTablet: [ undefined, 0, 100 ],
	heightMobile: [ undefined, 0, 100 ],
	shapeHeight: [ 0, 100 ],
	shapeHeightTablet: [ undefined, 0, 100 ],
	backgroundHeight: [ 0, 100 ],
	backgroundHeightTablet: [ undefined, 0, 100 ],
	backgroundHeightMobile: [ undefined, 0, 100 ],
	syncHeight: [ undefined, true, false ],
	syncHeightAlt: [ undefined, true, false ],
	verticalFlip: [ undefined, true, false ],
	horizontalFlip: [ undefined, true, false ],
	color: [ undefined, 'primary' ],
	customColor: [ '', '#123456' ],
	backgroundColor: [ undefined, 'primary' ],
	customBackgroundColor: [ undefined, '#123456' ],
	justAdded: [ undefined, true, false ],
	noBottomMargin: [ undefined, true, false ],
	noTopMargin: [ undefined, true, false ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
