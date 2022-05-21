/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const save = () => {
	return (
		<span className="wp-block-coblocks-gif">
			<InnerBlocks.Content />
		</span>
	);
};

export default save;
