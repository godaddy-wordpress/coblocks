/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	className: [ undefined, '', 'random classes' ],
	align: [ '', 'wide', 'full', 'left', 'center', 'right' ],
	url: [ undefined, '', 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' ],
	file: [ undefined, '', 'file.js' ],
	meta: [ true, false ],
	caption: [ undefined, '', 'caption' ],
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
