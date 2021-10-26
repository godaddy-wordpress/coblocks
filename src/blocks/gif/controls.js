/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockAlignmentToolbar, BlockControls } from '@wordpress/block-editor';
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
				<Toolbar label={ __( 'Gif block controls', 'coblocks' ) }>
					{ url &&
						<ToolbarButton
							className="components-toolbar__control"
							icon="trash"
							label={ __( 'Remove gif', 'coblocks' ) }
							onClick={ () => setAttributes( { height: '', url: '', width: '' } ) }
						/>
					}
				</Toolbar>
			</BlockControls>
		</>
	);
};

export default Controls;
