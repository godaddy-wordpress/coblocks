/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	address: [],
	lat: [],
	lng: [],
	hasApiKey: [ undefined, true, false ],
	pinned: [ undefined, true, false ],
	height: [ 0, 400 ],
	skin: [ 'standard' ],
	zoom: [ 0, 12, 20 ],
	iconSize: [ 0, 36 ],
	mapTypeControl: [ true, false ],
	zoomControl: [ true, false ],
	streetViewControl: [ true, false ],
	fullscreenControl: [ true, false ],
	controls: [ true, false ],
	hasError: [ undefined, '', 'some error' ],
	align: [ '', 'wide', 'full', 'left', 'right', 'center' ],
	className: [ undefined, '', 'random classes' ],
	noBottomMargin: [ undefined, true, false ],
	noTopMargin: [ undefined, true, false ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
