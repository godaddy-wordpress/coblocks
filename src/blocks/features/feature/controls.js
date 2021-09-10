/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../../components/background';

/**
 * WordPress dependencies
 */
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		contentAlign,
	} = attributes;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
				/>
				{ BackgroundControls( props ) }
			</BlockControls>
		</>
	);
};

export default Controls;
