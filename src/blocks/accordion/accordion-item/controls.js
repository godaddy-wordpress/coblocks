/**
 * External dependencies
 */
import { OpenIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Icon, ToolbarGroup } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		open,
	} = attributes;

	const customControls = [
		{
			icon: <Icon icon={ icon } />,
			/* translators: toggle label to display the accordion open */
			title: __( 'Display as open', 'coblocks' ),
			onClick: () => setAttributes( { open: ! open } ),
			isActive: open === true,
		},
	];

	return (
		<>
			<BlockControls>
				<ToolbarGroup controls={ customControls } />
			</BlockControls>
		</>
	);
};

export default Controls;
