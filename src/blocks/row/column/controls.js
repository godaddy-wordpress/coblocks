/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../../components/background';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { AlignmentToolbar, BlockVerticalAlignmentToolbar, BlockControls } from '@wordpress/block-editor';


class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			clientId,
			updateBlockAttributes,
			getBlockRootClientId,
		} = this.props;

		const {
			contentAlign,
			verticalAlignment,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					<BlockVerticalAlignmentToolbar
						onChange={ ( nextAlignment ) => {
							// Reset Parent Row Block
							const rootClientId = getBlockRootClientId( clientId );
							updateBlockAttributes( rootClientId, { verticalAlignment: null } );
							setAttributes( { verticalAlignment: nextAlignment } );
						} }
						value={ verticalAlignment }
					/>
					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
