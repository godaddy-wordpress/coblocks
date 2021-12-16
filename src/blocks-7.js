import { registerBlock } from './utils/helper';

// Register Blocks
import * as mediaCard from './blocks/media-card';
import * as offset from './blocks/gallery-offset';
import * as openTable from './blocks/opentable';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	mediaCard,
	offset,
	openTable,
].forEach( registerBlock );
