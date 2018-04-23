/**
 * External dependencies
 */
import classnames from 'classnames';
import ResizableBox from 're-resizable';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Block edit function
 */
export default class SpacerBlock extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			toggleSelection,
		} = this.props;

		const { height } = attributes;

		return [
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			<ResizableBox
				className={ classnames( className, 'coblocks-spacer-control' ) }
				size={ {
					width: '100%',
					height: height,
				} }
				minWidth= { '100%' }
				maxWidth= { '100%' }
				minHeight= { '100%' }
				handleClasses={ {
					bottomLeft: 'coblocks-block-spacer-control__resize-handle',
				} }
				enable={ { top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false } }
				onResizeStart={ () => {
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes( {
						height: parseInt( height + delta.height, 10 ),
					} );
					toggleSelection( true );
				} }
			>
			</ResizableBox>
		];
	}
}