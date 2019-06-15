/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './icons';
import { layoutOptions } from './layouts'
import { BackgroundControls } from '../../../components/background';
import VisualDropdown from '../../../components/visual-dropdown/';
import CSSGridToolbar from '../../../components/grid-control/toolbar';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar } = wp.components;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			clientId,
			attributes,
			setAttributes,
		} = this.props;

		const {
			contentAlign,
			layout,
		} = attributes;

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
};

export default Controls;
