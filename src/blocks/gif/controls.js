/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		align,
		url,
	} = attributes;

	const updateAlignment = ( nextAlign ) => {
		const extraUpdatedAttributes = [ 'wide', 'full' ].indexOf( nextAlign ) !== -1
			? { width: undefined, height: undefined }
			: {};
		setAttributes( { ...extraUpdatedAttributes, align: nextAlign } );
	};

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ updateAlignment }
				/>
				<Toolbar label={ __( 'Gif block controls', 'coblocks' ) }>
					{ url &&
						<ToolbarButton
							className="components-toolbar__control"
							label={ __( 'Remove gif', 'coblocks' ) }
							icon="trash"
							onClick={ () => setAttributes( { url: '', width: '', height: '' } ) }
						/>
					}
				</Toolbar>
			</BlockControls>
		</>
	);
};

export default Controls;
