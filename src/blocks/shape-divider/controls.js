/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { FlipHorizontalIcon, FlipVerticalIcon } from '@godaddy-wordpress/coblocks-icons';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

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
			<Fragment>
				<BlockControls>
					<Toolbar controls={ toolbarControls } />
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
