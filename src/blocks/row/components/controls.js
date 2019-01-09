/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { layoutOptions } from './layouts'
import rowIcons from './icons';
import BackgroundImagePanel, { BackgroundImageToolbarControls } from '../../../components/background';
import DropdownLayout from '../../../components/dropdown-layout/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.editor;
const { Toolbar, DropdownMenu } = wp.components;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	// Switches the icon based on the layout selected,
	// Fallback is the default layout icon.
	layoutIcon() {

		const {
			columns,
			layout,
		} = this.props.attributes;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split('-') );
		}

		if ( layout == undefined ) {
			return rowIcons.layout
		}

		return map( layoutOptions[ selectedRows ], ( { key, smallIcon } ) => (
			( key == layout ) ? smallIcon : ''
		) )
	}

	render() {

		const {
			clientId,
			attributes,
			setAttributes,
		} = this.props;

		const {
			columns,
			layout,
		} = attributes;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split('-') );
		}

		return (
			<Fragment>
				{ ( columns && selectedRows > 1 ) &&
					<BlockControls>
						<Toolbar>
							<DropdownLayout
								icon={ this.layoutIcon() }
								label={ __( 'Change layout' ) }
								controls={ [
									map( layoutOptions[ selectedRows ], ( { name, key, icon, cols } ) => ({
										icon: icon,
										title: name,
										key: key,
										layout: layout,
										onClick: () => {
											let selectedWidth = key.toString().split('-');
											let children = wp.data.select( 'core/editor' ).getBlocksByClientId( clientId );
											setAttributes( {
												layout: key,
											} );
											if ( typeof children[0].innerBlocks !== 'undefined' ) {
												map( children[0].innerBlocks, ( { clientId }, index ) => (
													wp.data.dispatch( 'core/editor' ).updateBlockAttributes( clientId, { width : selectedWidth[ index ] } )
												) );
											}
										}
									}) )
								] }
							/>
						</Toolbar>
						{ layout &&
							BackgroundImageToolbarControls( this.props )
						}
					</BlockControls>
				}
			</Fragment>
		);
	}
}

export default Controls;
