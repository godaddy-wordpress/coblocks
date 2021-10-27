/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';
import { ToolbarGroup } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		isEditing,
		setIsEditing,
		showEditControls,
	} = props;

	const toolbarControls = [
		{
			icon: edit,
			isActive: isEditing,
			onClick: () => setIsEditing( ! isEditing ),
			title: __( 'Edit Restaurant', 'coblocks' ),
		},
	];

	return (
		<BlockControls>
			{ showEditControls &&
				<ToolbarGroup controls={ toolbarControls } />
			}
		</BlockControls>
	);
};

export default Controls;

