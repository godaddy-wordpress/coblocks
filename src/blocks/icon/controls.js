/**
 * Internal dependencies
 */

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
		hasContentAlign,
	} = attributes;

	return (
		<>
			{ hasContentAlign && (
				<BlockControls>
					<AlignmentToolbar
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
						value={ contentAlign }
					/>
				</BlockControls>
			) }
		</>
	);
};

export default Controls;
