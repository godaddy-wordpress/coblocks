/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, Icon } from '@wordpress/components';

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
		title: __( 'Flip horiztonally', 'coblocks' ),
		isActive: !! horizontalFlip,
		onClick: () => setAttributes( { horizontalFlip: ! horizontalFlip } ),
	}, {
		icon: <Icon icon={ FlipVerticalIcon } />,
		title: __( 'Flip vertically', 'coblocks' ),
		isActive: !! verticalFlip,
		onClick: () => setAttributes( { verticalFlip: ! verticalFlip } ),
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
