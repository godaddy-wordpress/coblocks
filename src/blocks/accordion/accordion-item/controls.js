/**
 * External dependencies
 */
import { OpenIcon } from 'coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Icon } from '@wordpress/icons';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			open,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon={ <Icon icon={ OpenIcon } /> }
							label={ __( 'Display as open', 'coblocks' ) }
							onClick={ () => setAttributes( { open: ! open } ) }
							isActive={ open === true }
						/>
					</ToolbarGroup>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
