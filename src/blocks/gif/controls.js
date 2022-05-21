/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockAlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		setAttributes,
		attributes,
		handleClearGif,
	} = props;

	const {
		align,
		url,
	} = attributes;

	const updateAlignment = ( nextAlign ) => {
		const extraUpdatedAttributes = [ 'wide', 'full' ].indexOf( nextAlign ) !== -1
			? { height: undefined, width: undefined }
			: {};
		setAttributes( { ...extraUpdatedAttributes, align: nextAlign } );
	};

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					onChange={ updateAlignment }
					value={ align }
				/>
				<ToolbarGroup>
					{ url &&
						<ToolbarButton
							className="components-toolbar__control"
							icon="trash"
							label={ __( 'Remove gif', 'coblocks' ) }
							onClick={ handleClearGif }
						/>
					}
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};

export default Controls;
