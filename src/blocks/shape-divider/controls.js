/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

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
			icon: icons.flipY,
			title: __( 'Flip horiztonally', 'coblocks' ),
			isActive: !! verticalFlip,
			onClick: () => setAttributes( { verticalFlip: ! verticalFlip } ),
		}, {
			icon: icons.flipX,
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
