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
const { Component, Fragment } = wp.element;

/**
 * Block edit function
 */
export default class Edit extends Component {

	constructor() {
		super( ...arguments );
		this.defaultSeparatorColor = this.defaultSeparatorColor.bind( this );
	}

	// Set the default separator color based on the style selected.
	defaultSeparatorColor( attributes ) {
		if ( attributes.color ) {
			return attributes.color;
		} else if ( 'line' === attributes.style || 'fullwidth' === attributes.style ) {
			return 'rgba(0, 0, 0, .15)';
		} else {
			return 'rgba(0, 0, 0, .8)';
		}
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			toggleSelection,
		} = this.props;

		const {
			color,
			height,
			style,
		} = attributes;

		const classes = classnames(
			className,
			style ? `hr-style--${ style }` : `hr-style----dots`,
		);

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<ResizableBox
					className={ classes }
					style={ { color: this.defaultSeparatorColor( this.props.attributes ) } }
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
}