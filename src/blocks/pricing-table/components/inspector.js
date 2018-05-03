/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, PanelColor, RangeControl } = wp.components;

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
			setAttributes
		} = this.props;

		const {
			buttonBackground,
			tableBackground,
			tableColor,
			buttonColor,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelColor title={ __( 'Background Color' ) } colorValue={ tableBackground } initialOpen={ false }>
					<ColorPalette
						value={ tableBackground }
						onChange={ ( colorValue ) => setAttributes( { tableBackground: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ tableColor } initialOpen={ false }>
					<ColorPalette
						value={ tableColor }
						onChange={ ( colorValue ) => setAttributes( { tableColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Color' ) } colorValue={ buttonBackground } initialOpen={ false }>
					<ColorPalette
						value={ buttonBackground }
						onChange={ ( colorValue ) => setAttributes( { buttonBackground: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Background' ) } colorValue={ buttonColor } initialOpen={ false }>
					<ColorPalette
						value={ buttonColor }
						onChange={ ( colorValue ) => setAttributes( { buttonColor: colorValue } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
