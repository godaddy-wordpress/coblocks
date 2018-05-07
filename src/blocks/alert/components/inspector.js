/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, PanelColor, FormToggle, RangeControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			textAlign,
			backgroundColor,
			textColor,
			titleColor,
			borderColor,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ backgroundColor }
						onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Title Color' ) } colorValue={ titleColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Title Color' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Border Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Border Color' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
					/>
				</PanelColor>

			</InspectorControls>
		);
	}
}
