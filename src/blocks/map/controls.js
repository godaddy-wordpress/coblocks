/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { edit } from '@wordpress/icons';

function Controls( { attributes, setAttributes } ) {
	const {
		address,
		pinned,
	} = attributes;

	const toolbarControls = [
		{
			icon: edit,
			title: __( 'Edit Location', 'coblocks' ),
			isActive: ! pinned,
			onClick: () => setAttributes( { pinned: ! pinned } ),
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
