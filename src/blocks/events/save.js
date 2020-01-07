/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { className, externalCalendarUrl } = attributes;

	return ! externalCalendarUrl && (
		<div className={ className }>
			<InnerBlocks.Content />
		</div>
	);
}
