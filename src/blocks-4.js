import { registerBlock } from './utils/helper';

// Register Blocks
import * as foodAndDrinks from './blocks/food-and-drinks';
import * as foodItem from './blocks/food-and-drinks/food-item';
import * as form from './blocks/form';
import * as gif from './blocks/gif';
import * as gist from './blocks/gist';
import * as hero from './blocks/hero';
import * as highlight from './blocks/highlight';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	foodAndDrinks,
	foodItem,
	form,
	gif,
	gist,
	hero,
	highlight,
].forEach( registerBlock );
