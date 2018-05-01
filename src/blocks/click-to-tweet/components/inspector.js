/**
 * External dependencies
 */
import classnames from 'classnames';
import findKey from 'lodash/findKey';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import fontSizes from './font-sizes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component} = wp.element;
const { InspectorControls, BlockAlignmentToolbar, ColorPalette, ContrastChecker } = wp.blocks;
const { PanelBody, PanelColor, ToggleControl, RangeControl, Button, ButtonGroup } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.getFontSize = this.getFontSize.bind( this );
		this.setFontSize = this.setFontSize.bind( this );
		this.setPaddingIfHasBackground = this.setPaddingIfHasBackground.bind( this );
	}

	getFontSize() {
		const { customFontSize, fontSize } = this.props.attributes;
		if ( fontSize ) {
			return fontSizes[ fontSize ];
		}

		if ( customFontSize ) {
			return customFontSize;
		}
	}

	setFontSize( fontSizeValue ) {

		const { setAttributes } = this.props;

		const thresholdFontSize = findKey( fontSizes, ( size ) => size === fontSizeValue );

		if ( thresholdFontSize ) {
			setAttributes( {
				fontSize: thresholdFontSize,
				customFontSize: undefined,
			} );
			return;
		}
		setAttributes( {
			fontSize: undefined,
			customFontSize: fontSizeValue,
		} );
	}

	setPaddingIfHasBackground( colorValue ) {

		const { attributes, setAttributes } = this.props;

		setAttributes( { backgroundColor: colorValue } )

		if ( ! attributes.padding ) {
			setAttributes( { padding: 20 } )
		}
	}

	render() {

		const {
			attributes,
			setAttributes,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackFontSize,
		} = this.props;

		const {
			padding,
			borderWidth,
			borderRadius,
			buttonColor,
			backgroundColor,
			textColor,
			borderColor,
		} = attributes;

		const fontSize = this.getFontSize();

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Text Settings' ) } className="blocks-font-size">
					<div className="blocks-font-size__main">
						<ButtonGroup aria-label={ __( 'Font Size' ) }>
							{ map( {
								S: 'small',
								M: 'regular',
								L: 'large',
								XL: 'larger',
							}, ( size, label ) => (
								<Button
									key={ label }
									isLarge
									isPrimary={ fontSize === fontSizes[ size ] }
									aria-pressed={ fontSize === fontSizes[ size ] }
									onClick={ () => this.setFontSize( fontSizes[ size ] ) }
								>
									{ label }
								</Button>
							) ) }
						</ButtonGroup>
						<Button
							isLarge
							onClick={ () => this.setFontSize( undefined ) }
						>
							{ __( 'Reset' ) }
						</Button>
					</div>
					<RangeControl
						className="blocks-paragraph__custom-size-slider"
						label={ __( 'Custom Size' ) }
						value={ fontSize || '' }
						initialPosition={ fallbackFontSize }
						onChange={ ( value ) => this.setFontSize( value ) }
						min={ 12 }
						max={ 100 }
						beforeIcon="editor-textcolor"
						afterIcon="editor-textcolor"
					/>
				</PanelBody>
				<PanelBody title={ __( 'Display Settings' ) }>
					<RangeControl
						label={ __( 'Padding' ) }
						value={ padding || '' }
						initialPosition={ 0 }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						min={ 0 }
						max={ 100 }
					/>
					{ ( ( backgroundColor ) || borderColor ) && (
						<RangeControl
							label={ __( 'Border Radius' ) }
							value={ borderRadius || '' }
							initialPosition={ 4 }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 30 }
						/>
					) }
					{ borderColor &&
						<RangeControl
							label={ __( 'Border Width' ) }
							value={ borderWidth || '' }
							initialPosition={ 0 }
							onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
							min={ 0 }
							max={ 10 }
						/>
					}
				</PanelBody>
				<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor } initialOpen={ false }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( colorValue ) => this.setPaddingIfHasBackground( colorValue ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Border Color' ) } colorValue={ borderColor } initialOpen={ false }>
					<ColorPalette
						value={ borderColor }
						onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						value={ textColor }
						onChange={ ( colorValue ) => setAttributes( { textColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Color' ) } colorValue={ buttonColor } initialOpen={ false }>
					<ColorPalette
						value={ buttonColor }
						onChange={ ( colorValue ) => setAttributes( { buttonColor: colorValue } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
