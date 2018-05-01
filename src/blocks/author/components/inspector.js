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

				<PanelColor title={ __( 'Border Color' ) } colorValue={ borderColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Border Color' ) }
						value={ borderColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Heading Color' ) } colorValue={ headingColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Heading Color' ) }
						value={ headingColor }
						onChange={ ( value ) => setAttributes( { headingColor: value } ) }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Name Color' ) } colorValue={ nameColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Name Color' ) }
						value={ nameColor }
						onChange={ ( value ) => setAttributes( { nameColor: value } ) }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
				</PanelColor>

			</InspectorControls>
		);
	}
}
