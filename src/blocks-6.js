import { registerBlock } from './utils/helper';

// Register Blocks
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as row from './blocks/row';
import * as service from './blocks/services/service';
import * as services from './blocks/services';
import * as shapeDivider from './blocks/shape-divider';
import * as share from './blocks/share';
import * as socialProfiles from './blocks/social-profiles';
import * as stacked from './blocks/gallery-stacked';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	pricingTable,
	pricingTableItem,
	row,
	service,
	services,
	shapeDivider,
	share,
	socialProfiles,
	stacked,
].forEach( registerBlock );
