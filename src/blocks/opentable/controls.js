/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { edit } from '@wordpress/icons';

const Controls = ( props ) => {
	const {
		isEditing,
		setIsEditing,
		showEditControls,
	} = props;

	const toolbarControls = [
		{
			icon: edit,
			title: __( 'Edit Restaurant', 'coblocks' ),
			isActive: isEditing,
			onClick: () => setIsEditing( ! isEditing ),
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

