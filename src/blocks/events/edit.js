/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';
import applyWithColors from './colors';
import icons from './icons';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect, dispatch, select } = wp.data;
const { InnerBlocks } = wp.blockEditor;

const ALLOWED_BLOCKS = [ 'coblocks/event-item' ];

const TEMPLATE = [
	[ 'coblocks/event-item' ],
];

class EventItem extends Component {
	updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerItems = select( 'core/editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	updateTextColor = ( value ) => {
		const { attributes, setAttributes, setTextColor, textColor } = this.props;

		setTextColor( value );
		setAttributes( { textColor: value } );

		this.updateInnerAttributes( 'coblocks/event-item', { textColor: value } );
	};

	insertNewItem = () => {
		const { clientId, attributes, textColor } = this.props;

		const blockOrder = select( 'core/editor' ).getBlockOrder();
		const insertAtIndex = blockOrder.indexOf( clientId ) + 1;

		const innerBlocks = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
			wp.blocks.createBlock(
				blockName,
				Object.assign( {}, blockAttributes, {
					textColor: textColor,
				} )
			)
		);

		const newItem = wp.blocks.createBlock(
			'coblocks/events',
			attributes,
			innerBlocks
		);

		dispatch( 'core/editor' ).insertBlock( newItem, insertAtIndex );
	};

	render() {
		const {
			className,
			attributes,
			isSelected,
			clientId,
			selectedParentClientId,
			textColor,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls
					{ ...this.props }
					onUpdateTextColor={ this.updateTextColor }
				/>
				<div
					className={ classnames( className, {
						'child-selected': isSelected || clientId === selectedParentClientId,
					} ) }
				>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
					{ ( isSelected || clientId === selectedParentClientId ) && (
						<CustomAppender onClick={ this.insertNewItem } />
					) }
				</div>
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

export default compose( [ applyWithSelect, applyWithColors ] )( EventItem );
