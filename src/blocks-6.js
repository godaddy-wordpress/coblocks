import { registerBlock } from './utils/helper';

// Register Blocks
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as row from './blocks/row';
import * as service from './blocks/services/service';
import * as services from './blocks/services';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	pricingTable,
	pricingTableItem,
	row,
	service,
	services,
].forEach( registerBlock );
