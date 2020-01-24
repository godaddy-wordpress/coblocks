/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'raw',
			isMatch: ( node ) => node.nodeName === 'P' && /^\s*(https?:\/\/\S+)\s*$/i.test( node.textContent ) && /\.(ical|ics|ifb|icalendar)/i.test( node.textContent ),
			transform: ( node ) => {
				return createBlock( metadata.name, {
					externalCalendarUrl: node.textContent.trim(),
				} );
			},
		},
	],
};

export default transforms;
