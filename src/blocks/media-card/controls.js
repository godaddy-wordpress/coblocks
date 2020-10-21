/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, Icon } from '@wordpress/components';
import { pullLeft, pullRight } from '@wordpress/icons';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			mediaPosition,
		} = attributes;

		const toolbarControls = [ {
			icon: <Icon icon={ pullLeft } />,
			title: __( 'Show media on left', 'coblocks' ),
			isActive: mediaPosition === 'left',
			onClick: () => setAttributes( { mediaPosition: 'left' } ),
		}, {
			icon: <Icon icon={ pullRight } />,
			title: __( 'Show media on right', 'coblocks' ),
			isActive: mediaPosition === 'right',
			onClick: () => setAttributes( { mediaPosition: 'right' } ),
		} ];

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={ toolbarControls }
					/>
					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
