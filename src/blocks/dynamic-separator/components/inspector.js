/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, RangeControl, SelectControl, PanelColor } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.updateHeight = this.updateHeight.bind( this );
		this.updateStyle = this.updateStyle.bind( this );
		this.updateColor = this.updateColor.bind( this );
	}

	updateHeight( newHeight ) {
		this.props.setAttributes( { height: newHeight } );
	}

	updateStyle( newStyle ) {
		this.props.setAttributes( { style: newStyle } );
	}

	updateColor( newColor ) {
		this.props.setAttributes( { color: newColor } );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			color,
			height,
			style,
		} = attributes;

		const styleOptions = [
			{ value: 'dots', label: __( 'Dots' ) },
			{ value: 'line', label: __( 'Line' ) },
			{ value: 'fullwidth', label: __( 'Fullwidth' ) },
		];

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Settings' ) }>
					<RangeControl
						label={ __( 'Height' ) }
						value={ height || '' }
						onChange={ this.updateHeight }
						min={ 32 }
						max={ 800 }
					/>
					<SelectControl
						label={ __( 'Style' ) }
						value={ style }
						onChange={ this.updateStyle }
						options={ styleOptions }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Color' ) } colorValue={ color }>
					<ColorPalette
						value={ color }
						onChange={ this.updateColor }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
