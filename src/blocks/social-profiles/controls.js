/**
 * WordPress dependencies
 */
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

const Controls = ( {
	attributes,
	setAttributes,
} ) => {
	const { textAlign } = attributes;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
				/>
			</BlockControls>
		</>
	);
};

export default Controls;
