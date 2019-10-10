/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
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
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
