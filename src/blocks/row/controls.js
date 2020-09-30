/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';

class Controls extends Component {

	render() {
		const {
			clientId,
			attributes,
			setAttributes,
			getBlocksByClientId,
			updateBlockAttributes,
		} = this.props;

		const {
			layout,
			verticalAlignment,
		} = attributes;

		if ( ! layout ) {
			return null;
		}

		return (
			<Fragment>
				<BlockControls>
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
