/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';
import svg from '../icons/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, withFontSizes } = wp.editor;
const { createBlock } = wp.blocks;
const { ResizableBox } = wp.components;
const { withSelect } = wp.data;

/**
 * Set and export block values.
 */
const MIN_ICON_SIZE = 32;
const MAX_ICON_SIZE = 400;

export { MIN_ICON_SIZE, MAX_ICON_SIZE };

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	componentDidMount() {
		// Randomized the default icon when first added.
		const defaultIcons = [ 'heart', 'gesture', 'scatter_plot', 'circle_add', 'circle_remove' ];
		const rand = defaultIcons[ Math.floor( Math.random() * defaultIcons.length ) ];

		// CHeck if the icon is the default.
		if ( this.props.attributes.iconRand === true ) {
			this.props.setAttributes( { icon: rand, iconRand: false } )
		}
	}

	render() {

		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			mergeBlocks,
			onReplace,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
			toggleSelection,
			isRTL,
		} = this.props;

		const {
			icon,
			style,
			contentAlign,
			height,
			width,
			borderRadius,
			padding,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-icon__inner', {
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			'has-text-color': textColor.color,
			[ textColor.class ]: textColor.class,
			'is-selected': isSelected,
		} );

		const styles = {
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			fill: textColor.color,
			borderRadius: borderRadius + 'px',
			padding: padding + 'px',
		};

		let iconStyle = 'filled';

		if( className.includes( 'is-style-outlined' ) ){
			iconStyle = 'outlined';
		}

		let selectedIcon = icon ? svg[ iconStyle ][ icon ] : svg[ iconStyle ].logo;

		// Show or hide handles based on the contentAlign attribute.
		let showRightHandle = false;
		let showLeftHandle = false;

		if ( contentAlign === 'center' ) {
			// When the image is centered, show both handles.
			showRightHandle = true;
			showLeftHandle = true;
		} else if ( isRTL ) {
			// In RTL mode the image is on the right by default.
			// Show the right handle and hide the left handle only when it is aligned left.
			// Otherwise always show the left handle.
			if ( contentAlign === 'left' ) {
				showRightHandle = true;
			} else {
				showLeftHandle = true;
			}
		} else {
			// Show the left handle and hide the right handle only when the image is aligned right.
			// Otherwise always show the right handle.
			if ( contentAlign === 'right' ) {
				showLeftHandle = true;
			} else {
				showRightHandle = true;
			}
		}
		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }

				<div className={ className } style={ { textAlign: contentAlign } } >
					<ResizableBox
						className={ classes }
						style={ styles }
						size={ { width } }
						minWidth={ MIN_ICON_SIZE }
						maxWidth={ MAX_ICON_SIZE }
						enable={ {
							top: false,
							right: showRightHandle,
							bottom: true,
							left: showLeftHandle,
						} }
						lockAspectRatio
						onResizeStop={ ( event, direction, elt, delta ) => {
							setAttributes( {
								height: parseInt( width + delta.width, 10 ),
								width: parseInt( width + delta.width, 10 ),
							} );
							toggleSelection( true );
						} }
						onResizeStart={ () => {
							toggleSelection( false );
							setAttributes( {  iconSize: 'advanced' } )
						} }
					>
						{ selectedIcon ? selectedIcon.icon : null }
					</ResizableBox>
				</div>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
	withSelect( ( select, props ) => {
		const { getEditorSettings } = select( 'core/editor' );
		const { isRTL } = getEditorSettings();

		return {
			isRTL,
		};
	} ),
] )( Edit );
