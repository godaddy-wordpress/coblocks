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

		this.state = {
			isMoving: false,
		};
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
							'is-active' : this.state.isMoving,
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
					handleClasses={ {
						top: 'block-library-spacer__resize-handler-top',
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
						this.setState( { isMoving: false } );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
						this.setState( { isMoving: true } );
					} }
				>
				</ResizableBox>
			</Fragment>
		];
	}
} );
