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
	linkTo: [ undefined, 'none', 'media', 'attachment', 'custom' ],
	target: [],
	rel: [],
	align: [ '', 'wide', 'full', 'left', 'center', 'right' ],
	gutter: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	gutterMobile: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	radius: [ undefined, 0, 20 ],
	shadow: [ undefined, 'none', 'sml', 'med', 'lrg', 'xlrg' ],
	filter: [],
	captions: [],
	captionStyle: [ undefined, 'none', 'dark', 'light' ],
	captionColor: [ undefined, 'primary' ],
	customCaptionColor: [ undefined, '#123456' ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, '0', '16' ],
	primaryCaption: [],
	backgroundRadius: [ undefined, 0, 20 ],
	backgroundPadding: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	backgroundPaddingMobile: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	lightbox: [ undefined, true, false ],
	fullWidth: [ undefined, true, false ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
