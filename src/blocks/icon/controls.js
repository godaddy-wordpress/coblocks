/**
 * Internal dependencies
 */

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
		contentAlign,
		hasContentAlign,
	} = attributes;

	return (
		<>
			{ hasContentAlign && (
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
				</BlockControls>
			) }
		</>
	);
};

export default Controls;
