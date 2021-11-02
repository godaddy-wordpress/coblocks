/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';
import { ToolbarGroup } from '@wordpress/components';

function Controls( { attributes, setAttributes } ) {
	const {
		address,
		pinned, 
	} = attributes;

	const toolbarControls = [
		{
			icon: edit,
			isActive: ! pinned,
			onClick: () => setAttributes( { pinned: ! pinned } ),
			title: __( 'Edit Location', 'coblocks' ),
		},
	];

	return (
		<BlockControls>
			{ address &&
				<ToolbarGroup controls={ toolbarControls } />
			}
		</BlockControls>
	);
}

export default Controls;
