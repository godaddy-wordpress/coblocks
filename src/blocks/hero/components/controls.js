/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';
import { layoutOptions } from './layouts'
import BackgroundImagePanel, { BackgroundImageToolbarControls } from '../../../components/background';
import VisualDropdown from '../../../components/visual-dropdown/';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
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
					<VisualDropdown
						icon={ icons.hero }
						label={ __( 'Change layout' ) }
						controls={ [
							map( layoutOptions, ( { value, label, icon } ) => ({
								icon: icon,
								title: label,
								key: value,
								value: layout,
								onClick: () => {
									let selectedWidth = value.toString().split('-');
									let children = wp.data.select( 'core/editor' ).getBlocksByClientId( clientId );
									setAttributes( {
										layout: value,
									} );
								}
							}) )
						] }
					/>
				</Toolbar>
					{ BackgroundImageToolbarControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
};

export default Controls;
