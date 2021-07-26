/**
 * WordPress dependencies
 */
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		align,
	} = attributes;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
				/>
			</BlockControls>
		</>
	);
};

export default Controls;
