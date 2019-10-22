/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';
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
			mediaPosition,
		} = attributes;

		const toolbarControls = [ {
			icon: icons.mediaCardRight,
			title: __( 'Media on right', 'coblocks' ),
			isActive: mediaPosition === 'right',
			onClick: () => setAttributes( { mediaPosition: 'right' } ),
		}, {
			icon: icons.mediaCardLeft,
			title: __( 'Media on left', 'coblocks' ),
			isActive: mediaPosition === 'left',
			onClick: () => setAttributes( { mediaPosition: 'left' } ),
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
