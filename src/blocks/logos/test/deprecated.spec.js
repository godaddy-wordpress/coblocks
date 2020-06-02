/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	images: [
		[],
		[ { url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1, href: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', caption: 'image-1 caption' } ],
	],
	className: [ undefined, '', 'random classes', 'has-filter-grayscale' ],
	align: [ '', 'wide', 'full' ],
	grayscale: [ false, true ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
