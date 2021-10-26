/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Icon, ToolbarGroup } from '@wordpress/components';

/**
 * External dependencies
 */
import { FlipHorizontalIcon, FlipVerticalIcon } from '@godaddy-wordpress/coblocks-icons';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		horizontalFlip,
		verticalFlip,
	} = attributes;

	const toolbarControls = [ {
		icon: <Icon icon={ FlipHorizontalIcon } />,
		isActive: !! horizontalFlip,
		onClick: () => setAttributes( { horizontalFlip: ! horizontalFlip } ),
		title: __( 'Flip horiztonally', 'coblocks' ),
	}, {
		icon: <Icon icon={ FlipVerticalIcon } />,
		isActive: !! verticalFlip,
		onClick: () => setAttributes( { verticalFlip: ! verticalFlip } ),
		title: __( 'Flip vertically', 'coblocks' ),
	} ];

	return (
		<>
			<BlockControls>
				<ToolbarGroup controls={ toolbarControls } />
			</BlockControls>
		</>
	);
};

export default Controls;
