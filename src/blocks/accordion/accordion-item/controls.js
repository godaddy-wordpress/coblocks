/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
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
			open,
		} = attributes;

		const customControls = [
			{
				icon: icons.open,
				title: _x( 'Display open', 'Toggle label to display the accordion open' ),
				onClick: () => setAttributes( { open: ! open } ),
				isActive: open === true,
			},
		];

		return (
			<Fragment>
				<BlockControls>
					<Toolbar className="components-toolbar__block-coblocks-accordion" controls={ customControls } />
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
