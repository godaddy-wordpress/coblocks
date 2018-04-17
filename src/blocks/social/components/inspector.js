/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, RangeControl, PanelColor, ToggleControl } = wp.components;

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
			backgroundColor,
			facebook,
			linkedin,
			pinterest,
			size,
			space,
			tumblr,
			twitter,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Social Settings' ) }>
					<ToggleControl
						label={ __( 'Twitter' ) }
						checked={ !! twitter }
						onChange={ () => setAttributes( {  twitter: ! twitter } ) }
					/>
					<ToggleControl
						label={ __( 'Facebook' ) }
						checked={ !! facebook }
						onChange={ () => setAttributes( {  facebook: ! facebook } ) }
					/>
					<ToggleControl
						label={ __( 'LinkedIn' ) }
						checked={ !! linkedin }
						onChange={ () => setAttributes( {  linkedin: ! linkedin } ) }
					/>
					<ToggleControl
						label={ __( 'Pinterest' ) }
						checked={ !! pinterest }
						onChange={ () => setAttributes( {  pinterest: ! pinterest } ) }
					/>
					<ToggleControl
						label={ __( 'Tumblr' ) }
						checked={ !! tumblr }
						onChange={ () => setAttributes( {  tumblr: ! tumblr } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Icon Settings' ) }>
					<RangeControl
						label={ __( 'Size' ) }
						value={ size || '' }
						onChange={ ( value ) => setAttributes( { size: value } ) }
						min={ 16 }
						max={ 80 }
					/>
					<RangeControl
						label={ __( 'Spacing' ) }
						value={ space || '' }
						onChange={ ( value ) => setAttributes( { space: value } ) }
						min={ 5 }
						max={ 20 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Color' ) } colorValue={ backgroundColor }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
					/>
				</PanelColor>

			</InspectorControls>
		);
	}
}
