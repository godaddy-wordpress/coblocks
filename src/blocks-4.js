import { registerBlock } from './utils/helper';

// Register Blocks
import * as foodAndDrinks from './blocks/food-and-drinks';
import * as foodItem from './blocks/food-and-drinks/food-item';
import * as form from './blocks/form';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	foodAndDrinks,
	foodItem,
	form,
].forEach( registerBlock );
