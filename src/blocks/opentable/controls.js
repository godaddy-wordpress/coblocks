/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { edit } from '@wordpress/icons';

function Controls( { attributes, setAttributes } ) {
	const {
		restaurantIDs,
		pinned,
	} = attributes;

	const toolbarControls = [
		{
			icon: edit,
			title: __( 'Edit Restaurant', 'coblocks' ),
			isActive: ! pinned,
			onClick: () => setAttributes( { pinned: ! pinned } ),
		},
	];

	return (
		<BlockControls>
			{ restaurantIDs &&
				<Toolbar controls={ toolbarControls } />
			}
		</BlockControls>
	);
}

export default Controls;

