/**
 * WordPress dependencies
 */
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;
	const {	align } = attributes;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
					value={ align }
				/>
			</BlockControls>
		</>
	);
};

export default Controls;
