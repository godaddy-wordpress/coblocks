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

		function styles( value ) {

			setAttributes( { backgroundColor: value } )

			if ( value == '#e2e3e5' ) {
				setAttributes( { textColor: '#383d41', titleColor: '#383d41', borderColor: '#d6d8db' } )
			} else if  ( value == '#cce5ff' ) {
				setAttributes( { textColor: '#004085', titleColor: '#004085', borderColor: '#b8daff' } )
			} else if  ( value == '#d4edda' ) {
				setAttributes( { textColor: '#155724', titleColor: '#155724', borderColor: '#c3e6cb' } )
			} else if  ( value == '#f8d7da' ) {
				setAttributes( { textColor: '#721c24', titleColor: '#721c24', borderColor: '#f5c6cb' } )
			} else if  ( value == '#fff3cd' ) {
				setAttributes( { textColor: '#856404', titleColor: '#856404', borderColor: '#ffeeba' } )
			}
		}

		return (
			<InspectorControls key="inspector">
				<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ backgroundColor }
						onChange={ ( value ) => styles( value ) }
						colors={ ['#e2e3e5', '#cce5ff', '#d4edda', '#f8d7da', '#fff3cd'] }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Title Color' ) } colorValue={ titleColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Title Color' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
						colors={ ['#383d41', '#004085', '#155724', '#721c24', '#856404'] }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
						colors={ ['#383d41', '#004085', '#155724', '#721c24', '#856404'] }
					/>
				</PanelColor>

				<PanelColor title={ __( 'Border Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Border Color' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
						colors={ ['#d6d8db', '#b8daff', '#c3e6cb', '#f5c6cb', '#ffeeba'] }
					/>
				</PanelColor>

			</InspectorControls>
		);
	}
}
