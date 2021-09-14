/**
 * WordPress dependencies
 */
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const { contentAlign } = attributes;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
				/>
			</BlockControls>
		</>
	);
};

export default Controls;
