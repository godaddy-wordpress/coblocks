/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../../components/background';

/**
 * WordPress dependencies
 */
import { AlignmentToolbar, BlockVerticalAlignmentToolbar, BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
		clientId,
		updateBlockAttributes,
		getBlockRootClientId,
	} = props;

	const {
		contentAlign,
		verticalAlignment,
	} = attributes;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
				/>
				<BlockVerticalAlignmentToolbar
					onChange={ ( nextAlignment ) => {
						// Reset Parent Row Block
						const rootClientId = getBlockRootClientId( clientId );
						updateBlockAttributes( rootClientId, { verticalAlignment: null } );
						setAttributes( { verticalAlignment: nextAlignment } );
					} }
					value={ verticalAlignment }
				/>
				{ BackgroundControls( props ) }
			</BlockControls>
		</>
	);
};

export default Controls;
