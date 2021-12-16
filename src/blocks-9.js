import { registerBlock } from './utils/helper';

import * as gif from './blocks/gif';
import * as gist from './blocks/gist';
import * as hero from './blocks/hero';
import * as highlight from './blocks/highlight';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	gif,
	gist,
	hero,
	highlight,
].forEach( registerBlock );
