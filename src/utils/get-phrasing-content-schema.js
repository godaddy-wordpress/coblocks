import { getPhrasingContentSchema as getPhrasingContentSchemaDOM } from '@wordpress/dom';
import { getPhrasingContentSchema as getPhrasingContentSchemaBlocks } from '@wordpress/blocks';

let getPhrasingContentSchema = getPhrasingContentSchemaBlocks;

// if getPhrasingContentSchemaDOM is available it is because
// we are using a post 5.6 version of WP
if ( typeof getPhrasingContentSchemaDOM === 'function' ) {
	getPhrasingContentSchema = getPhrasingContentSchemaDOM;
}

export default getPhrasingContentSchema;
