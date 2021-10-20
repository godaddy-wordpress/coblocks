/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	className: [ undefined, '', 'random classes' ],
	align: [ '', 'wide', 'full', 'left', 'center', 'right' ],
	url: [ undefined, '', 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c' ],
	file: [ undefined, '', 'file.js' ],
	meta: [ true, false ],
	caption: [ undefined, '', 'caption' ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
