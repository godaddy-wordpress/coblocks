/**
 * WordPress dependencies
 */
import {
	AlignmentControl as alignControls,
	AlignmentToolbar as alignToolbar,
	BlockControls,
} from '@wordpress/block-editor';
// Backward compatibility for 5.6
const AlignmentControl = !! alignControls ? alignControls : alignToolbar;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;
	const { align } = attributes;

	return (
		<BlockControls group="block">
			<AlignmentControl
				onChange={ ( newAlign ) => setAttributes( { align: newAlign } ) }
				value={ align }
			/>
		</BlockControls>
	);
};

export default Controls;

