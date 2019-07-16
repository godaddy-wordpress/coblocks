
/**
 * Internal dependencies
 */
import icons from './icons';
import { BackgroundControls } from '../../../components/background';
import CSSGridToolbar from '../../../components/grid-control/toolbar';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar } = wp.components;

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
