/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { getBlockType } from '@wordpress/blocks';
import { ResizableBox } from '@wordpress/components';
import { withDispatch, withSelect, select } from '@wordpress/data';
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

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
			color,
			// block,
			supportedStyles,
			// type,
		} = this.props;

		console.log( setBlockStyles );
		console.log( supportedStyles );

		const getSeparatorId = () => {
			const innerBlockId = select( 'core/block-editor' ).getBlock( clientId ).innerBlocks[ 0 ].clientId;
			const separator = select( 'core/block-editor' ).getBlock( innerBlockId );
			// console.log( innerBlockId );
			return separator;
		};
		// block styles set here: https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/block-styles/index.js
		// const setBlockStyles = () => withDispatch( ( dispatch ) => {
		// 	return {
		// 		onChangeClassName( newClassName ) {
		// 			dispatch( 'core/block-editor' ).updateBlockAttributes( getSeparatorId, {
		// 				className: newClassName,
		// 			} );
		// 		},
		// 	};
		// } );

		// console.log( clientId === selectedParentClientId && getSeparatorAttributes() );

		const { height, customColor } = attributes;

		const colorClass = getColorClassName( 'color', color );

		const styles = {
			color: colorClass ? undefined : customColor,
			height: height ? height + 'px' : undefined,
		};

		return (

			<Fragment>
				{ isSelected && <Inspector { ...this.props } /> }
				<ResizableBox
					className={ classnames( {
						'is-selected': isSelected,
						'has-text-color': color.color,
						[ color.class ]: color.class,
					} ) }
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
	const { getBlockStyles } = select( 'core/blocks' );
	const selectedClientId = select( 'core/block-editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/block-editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
		supportedStyles: getBlockStyles( 'core/separator' ),
	};
} );

export default compose( [ applyWithColors, applyWithSelect ] )( DynamicSeparatorEdit );
