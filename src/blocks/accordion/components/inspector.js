/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, ToggleControl } = wp.components;

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

		const { open, titleBackgroundColor, titleColor, backgroundColor, textColor } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Settings' ) }>
						<ToggleControl
							label={ __( 'Display Open' ) }
							checked={ !! open }
							onChange={ () => setAttributes( {  open: ! open } ) }
						/>
					</PanelBody>
					<PanelColor title={ __( 'Title Background Color' ) } colorValue={ titleBackgroundColor } initialOpen={ false }>
						<ColorPalette
							label={ __( 'Title Background Color' ) }
							value={ titleBackgroundColor }
							onChange={ ( colorValue ) => setAttributes( { titleBackgroundColor: colorValue } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( 'Title Color' ) } colorValue={ titleColor } initialOpen={ false }>
						<ColorPalette
							label={ __( 'Title Color' ) }
							value={ titleColor }
							onChange={ ( colorValue ) => setAttributes( { titleColor: colorValue } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor } initialOpen={ false }>
						<ColorPalette
							label={ __( 'Background Color' ) }
							value={ backgroundColor }
							onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
						<ColorPalette
							label={ __( 'Text Color' ) }
							value={ textColor }
							onChange={ ( colorValue ) => setAttributes( { textColor: colorValue } ) }
						/>
					</PanelColor>
				</InspectorControls>
			</Fragment>
		);
	}
}
