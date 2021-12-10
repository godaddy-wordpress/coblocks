/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	className: [ undefined, '', 'random classes' ],
	icon: [ undefined, '', 'coblocks' ],
	iconRand: [ undefined, true, false ],
	iconSize: [ undefined, 0, 60 ],
	contentAlign: [ undefined, 'left', 'center', 'right' ],
	hasContentAlign: [ undefined, true, false ],
	backgroundColor: [ undefined, 'primary' ],
	customBackgroundColor: [ undefined, '#123456' ],
	iconColor: [ undefined, 'primary' ],
	customIconColor: [ undefined, '#123456' ],
	height: [ 0, 60 ],
	width: [ 0, 60 ],
	borderRadius: [ undefined, 0, 20 ],
	padding: [ undefined, 0, 10, 100 ],
	href: [ undefined, '', 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg' ],
	rel: [ '', 'alternate', 'author', 'preload' ],
	linkTarget: [ '', '_blank', '_self', '_parent' ]
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
