/**
 * Internal dependencies
 */
 import metadata from './block.json';

 /**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes: {
			...metadata.attributes,
		},
		save( { attributes } ) {
			const { className, externalCalendarUrl } = attributes;

			return ! externalCalendarUrl && (
				<div className={ className }>
					<InnerBlocks.Content />
				</div>
			);
		}
	}
];

export default deprecated;