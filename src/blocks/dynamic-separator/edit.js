/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { ResizableBox } from '@wordpress/components';
import { withSelect, select } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/separator' ];

/**
 * Block edit function
 */
class DynamicSeparatorEdit extends Component {
	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			clientId,
			selectedParentClientId,
		} = this.props;

		const { height } = attributes;

		const styles = {
			height: height ? height + 'px' : undefined,
		};
		return (

			<Fragment>
				{ ( isSelected || clientId === selectedParentClientId ) && <Inspector { ...this.props } /> }
				<ResizableBox
					className={ classnames( {
						'is-selected': isSelected,
					} ) }
					size={ { height } }
					minHeight="0"
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						const spacerHeight = parseInt( height + delta.height, 10 );
						setAttributes( {
							height: spacerHeight,
						} );
					} }
				>
					<div style={ styles } className={ className }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ [ ALLOWED_BLOCKS ] }
							templateLock="all"
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</ResizableBox>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const selectedClientId = select( 'core/block-editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/block-editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
	};
} );

export default compose( [ applyWithSelect ] )( DynamicSeparatorEdit );
