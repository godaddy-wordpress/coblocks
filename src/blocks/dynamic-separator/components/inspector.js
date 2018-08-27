/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, SelectControl, PanelColor } = wp.components;

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
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Dynamic HR Settings' ) }>
						<BaseControl label={ __( 'Height in pixels' ) }>
							<input
								type="number"
								onChange={ ( event ) => {
									setAttributes( {
										height: parseInt( event.target.value, 10 ),
									} );
								} }
								aria-label={ __( 'Height for the dynamic separator element in pixels.' ) }
								value={ height }
								min="20"
								step="10"
							/>
						</BaseControl>
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
			</Fragment>
		);
	}
}
