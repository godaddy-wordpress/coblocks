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

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
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
			textAlign: contentAlign,
			borderRadius: borderRadius + 'px',
			padding: padding + 'px',
		};

		let iconStyle = 'filled';

		if( className.includes( 'is-style-outlined' ) ){
			iconStyle = 'outlined';
		}else if( className.includes( 'is-style-rounded' ) ){
			iconStyle = 'rounded';
		}

		let selectedIcon = icon ? svg[ iconStyle ][ icon ] : svg[ iconStyle ].logo
		
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
				<ResizableBox
					className={ classes }
					style={ styles }
					size={ {
						width,
					} }
					enable={ {
						top: false,
						right: true,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
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
					} }
				>
					{ selectedIcon.icon }
				</ResizableBox>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );
