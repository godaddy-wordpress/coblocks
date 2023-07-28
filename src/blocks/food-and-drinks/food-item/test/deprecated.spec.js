/**
 * Internal dependencies.
 */
import * as helpers from '../../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	title: [ undefined, '', 'title' ],
	description: [ undefined, '', 'description' ],
	price: [ undefined, '', 'price' ],
	url: {
		values: [ undefined, '', 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg' ],
		baseAttributes: { title: 'title' },
	},
	alt: [ undefined, '', 'alt' ],
	focalPoint: [ undefined, { x: 0, y: 0 }, { x: 0.33663366336633666, y: 0.8335193452380952 } ],
	focalPoint: [ undefined, true, false ],
	glutenFree: [ undefined, true, false ],
	pescatarian: [ undefined, true, false ],
	popular: [ undefined, true, false ],
	spicy: [ undefined, true, false ],
	spicier: [ undefined, true, false ],
	vegetarian: [ undefined, true, false ],
	vegan: [ undefined, true, false ],
	showImage: [ undefined, true, false ],
	showPrice: [ undefined, true, false ],
	headingLevel: [ 2, 3, 4 ],
	className: [ undefined, '', 'className' ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
