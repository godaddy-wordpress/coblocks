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
import { BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
		getBlocksByClientId,
		updateBlockAttributes,
	} = props;

	const {
		columns,
		layout,
		verticalAlignment,
	} = attributes;

	// Switches the icon based on the layout selected,
	// Fallback is the default layout icon.
	const layoutIcon = () => {
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
	};

	let selectedRows = 1;

	if ( columns ) {
		selectedRows = parseInt( columns.toString().split( '-' ) );
	}

	if ( ! layout ) {
		return null;
	}

	return (
		<>
			<BlockControls>
				{ ( columns && selectedRows > 1 ) &&
					<ToolbarGroup
						isCollapsed={ true }
						icon={ layoutIcon() }
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
					</ToolbarGroup>
				}
				<BlockVerticalAlignmentToolbar
					onChange={ ( alignment ) => {
						const children = getBlocksByClientId( clientId );
						setAttributes( { verticalAlignment: alignment } );
						if ( typeof children[ 0 ].innerBlocks !== 'undefined' ) {
							map( children[ 0 ].innerBlocks, ( blockProps ) => (
								updateBlockAttributes( blockProps.clientId, { verticalAlignment: alignment } )
							) );
						}
					} }
					value={ verticalAlignment }
				/>
				{ layout &&
					BackgroundControls( props )
				}
			</BlockControls>
		</>
	);
};

export default Controls;
