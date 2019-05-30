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
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { ResizableBox } = wp.components;

/**
 * Block edit function
 */
class Edit extends Component {
	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			toggleSelection,
			color,
		} = this.props;

		const {
			height,
		} = attributes;

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<ResizableBox
					className={ classnames(
						className, {
							'is-selected': isSelected,
							'has-text-color': color.color,
							[ color.class ]: color.class,
						}
					) }
					style={ {
						color: color.color,
					} }
					size={ {
						height,
					} }
					minHeight="20"
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
		);
	}
}

export default compose( [
	applyWithColors,
] )( Edit );
