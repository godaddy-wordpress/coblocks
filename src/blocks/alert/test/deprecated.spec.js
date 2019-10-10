/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

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
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
