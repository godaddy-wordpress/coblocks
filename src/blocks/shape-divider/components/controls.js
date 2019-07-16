/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.blockEditor;
const { Toolbar } = wp.components;

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
			title: __( 'Flip horiztonally' ),
			isActive: !! verticalFlip,
			onClick: () => setAttributes( { verticalFlip: ! verticalFlip } ),
		}, {
			icon: icons.flipX,
			title: __( 'Flip vertically' ),
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
