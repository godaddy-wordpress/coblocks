/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, Icon } from '@wordpress/components';

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
		isActive: !! verticalFlip,
		onClick: () => setAttributes( { verticalFlip: ! verticalFlip } ),
	}, {
		icon: <Icon icon={ FlipVerticalIcon } />,
		title: __( 'Flip vertically', 'coblocks' ),
		isActive: !! horizontalFlip,
		onClick: () => setAttributes( { horizontalFlip: ! horizontalFlip } ),
	} ];

	return (
		<>
			<BlockControls>
				<Toolbar controls={ toolbarControls } />
			</BlockControls>
		</>
	);
};

export default Controls;
