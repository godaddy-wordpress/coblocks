/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	align: [ undefined, 'wide' ],
	className: [ undefined, '', 'random classes' ],
	columns: [ 2, 3, 4 ],
	gutter: [ 'small', 'medium', 'large', 'xlarge' ],
	showImages: [ undefined, true, false ],
	showPrices: [ undefined, true, false ],
	headingLevel: [ 2, 3, 4 ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
