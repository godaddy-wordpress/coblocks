/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	className: [ undefined, '', 'random classes' ],
	items: [ undefined, 0, 1, 3 ],
	contentAlign: [ 'left', 'center', 'right' ],
	isStackedOnMobile: [ undefined, true, false ],
	gutter: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	stacked: [ undefined, true, false ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
