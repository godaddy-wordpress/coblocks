/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
	const {	height	} = attributes;

	const styles = {
		height: height ? height + 'px' : undefined,
	};

	return (
		<div style={ styles } className={ className }>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
