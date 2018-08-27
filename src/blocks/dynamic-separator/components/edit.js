/**
 * External dependencies
 */
import classnames from 'classnames';
import ResizableBox from 're-resizable';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Colors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;

/**
 * Block edit function
 */
export default compose( Colors ) ( class Edit extends Component {

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
			setColor,
			color,
		} = this.props;

		const {
			height,
		} = attributes;

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<ResizableBox
					className={ classnames(
						className, {
							'has-text-color': color.value,
							[ color.class ]: color.class,
						}
					) }
					style={ { color: color.value, } }
					size={ {
						height,
					} }
					minHeight="20"
					handleClasses={ {
						bottom: 'block-library-spacer__resize-handler-bottom',
					} }
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
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
				</ResizableBox>
			</Fragment>
		];
	}
} );
