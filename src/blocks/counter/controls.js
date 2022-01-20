/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls } from '@wordpress/block-editor';

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

