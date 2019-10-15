
/**
 * Internal dependencies
 */
import icons from './icons';
import { BackgroundControls } from '../../components/background';
import CSSGridToolbar from '../../components/grid-control/toolbar';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const { contentAlign } = attributes;

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<CSSGridToolbar
							icon={ icons.grid }
							label={ __( 'Change layout' ) }
							props={ this.props }
						/>
					</Toolbar>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
