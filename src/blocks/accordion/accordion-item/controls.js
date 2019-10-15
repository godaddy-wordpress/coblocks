/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
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
