/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { edit } from '@wordpress/icons';

const Controls = ( props ) => {
	const {
		attributes,
		isEditing,
		setIsEditing,
	} = props;

	const {
		restaurantIDs,
	} = attributes;

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
			{ restaurantIDs.length > 0 &&
				<Toolbar controls={ toolbarControls } />
			}
		</BlockControls>
	);
};

export default Controls;

