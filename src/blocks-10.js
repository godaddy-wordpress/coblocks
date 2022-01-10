import { registerBlock } from './utils/helper';

// Register Blocks
import * as shapeDivider from './blocks/shape-divider';
import * as share from './blocks/share';
import * as socialProfiles from './blocks/social-profiles';
import * as stacked from './blocks/gallery-stacked';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	shapeDivider,
	share,
	socialProfiles,
	stacked,
].forEach( registerBlock );
