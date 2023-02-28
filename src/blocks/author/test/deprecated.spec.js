/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	className: [ undefined, '', 'random classes' ],
	heading: [ undefined, '', 'testing' ],
	biography: [ undefined, '', 'testing' ],
	name: [ undefined, '', 'testing' ],
	imgId: [ undefined, 0, 10 ],
	imgUrl: [ undefined, '', 'https://website.com/wp-content/uploads/1234/56/image.jpg' ],
	backgroundColor: [ undefined, 'primary' ],
	customBackgroundColor: [ undefined, '#123456' ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, '0', '16' ],
	textAlign: [ undefined, 'left', 'center', 'right' ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
