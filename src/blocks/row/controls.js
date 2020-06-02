/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { layoutOptions } from './utilities';
import rowIcons from './icons';
import { BackgroundControls } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

class Controls extends Component {
	// Switches the icon based on the layout selected,
	// Fallback is the default layout icon.
	layoutIcon() {
		const {
			columns,
			layout,
		} = this.props.attributes;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split( '-' ) );
		}

		if ( layout === undefined ) {
			return rowIcons.layout;
		}

		return map( layoutOptions[ selectedRows ], ( { key, smallIcon } ) => (
			( key === layout ) ? smallIcon : ''
		) );
	}

	render() {
		const {
			clientId,
			attributes,
			setAttributes,
			getBlocksByClientId,
			updateBlockAttributes,
		} = this.props;

		const {
			columns,
			layout,
			verticalAlignment,
		} = attributes;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split( '-' ) );
		}

		if ( ! layout ) {
			return null;
		}

		return (
			<Fragment>
				<BlockControls>
					{ ( columns && selectedRows > 1 ) &&
						<Toolbar
							isCollapsed={ true }
							icon={ this.layoutIcon() }
							label={ __( 'Change row block layout', 'coblocks' ) }
							controls={ map( layoutOptions[ selectedRows ], ( { name, key, smallIcon } ) => {
								return {
									title: name,
									key,
									icon: smallIcon,
									isActive: key === layout,
									onClick: () => {
										const selectedWidth = key.toString().split( '-' );
										const children = getBlocksByClientId( clientId );
										setAttributes( {
											layout: key,
										} );
										if ( typeof children[ 0 ].innerBlocks !== 'undefined' ) {
											map( children[ 0 ].innerBlocks, ( blockProps, index ) => (
												updateBlockAttributes( blockProps.clientId, { width: selectedWidth[ index ] } )
											) );
										}
									},
								};
							} ) }
						>
						</Toolbar>
					}
					<BlockVerticalAlignmentToolbar
						onChange={ ( alignment ) => {
							const children = getBlocksByClientId( clientId );
							setAttributes( { verticalAlignment: alignment } );
							if ( typeof children[ 0 ].innerBlocks !== 'undefined' ) {
								map( children[ 0 ].innerBlocks, ( blockProps, index ) => (
									updateBlockAttributes( blockProps.clientId, { verticalAlignment: alignment } )
								) );
							}
							} }
						value={ verticalAlignment }
					/>
					{ layout &&
						BackgroundControls( this.props )
					}
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
