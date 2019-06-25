/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.blockEditor;
const { PanelBody, RangeControl, ToggleControl, SelectControl, withFallbackStyles } = wp.components;

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	const textColorValue = textColor && textColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColorValue && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColorValue || ! node ? undefined : getComputedStyle( node ).backgroundColor,
		fallbackTextColor: textColor || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	getHasColorsHelp( checked ) {
		return checked ? __( 'Share button colors are enabled.' ) : __( 'Toggle to use official colors from each social media platform.' );
	}

	render() {

		const {
			className,
			attributes,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			fallbackTextColor,
			backgroundColor,
			textColor,
			fallbackBackgroundColor,
		} = this.props;

		const {
			facebook,
			hasColors,
			linkedin,
			pinterest,
			borderRadius,
			tumblr,
			twitter,
			size,
			reddit,
			email,
			google,
			iconSize,
			padding,
		} = attributes;

		const options = [
			{ value: 'sml', label: __( 'Small' ) },
			{ value: 'med', label: __( 'Medium' ) },
			{ value: 'lrg', label: __( 'Large' ) },
		];

		const defaultColors = [
			{
				value: backgroundColor.color,
				onChange: setBackgroundColor,
				label: __( 'Background Color' ),
			},
			{
				value: textColor.color,
				onChange: setTextColor,
				label: __( 'Text Color' ),
			},
		];

		const maskColors = [
			{
				value: backgroundColor.color,
				onChange: setBackgroundColor,
				label: __( 'Background Color' ),
			},
		];

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Share Settings' ) }>
						<ToggleControl
							label={ __( 'Social Colors' ) }
							checked={ !! hasColors }
							onChange={ () => setAttributes( {  hasColors: ! hasColors } ) }
							help={ this.getHasColorsHelp }
						/>
						{ ! isMaskStyle && ! isCircularStyle &&
							<RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ borderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 50 }
							/>
						}
						{ ( isMaskStyle || isCircularStyle ) &&
							<RangeControl
								label={ __( 'Icon Size' ) }
								value={ iconSize }
								onChange={ ( value ) => setAttributes( { iconSize: value } ) }
								min={ 16 }
								max={ 60 }
							/>
						}
						{ isCircularStyle &&
							<RangeControl
								label={ __( 'Circle Size' ) }
								value={ padding }
								onChange={ ( value ) => setAttributes( { padding: value } ) }
								min={ 10 }
								max={ 50 }
							/>
						}
						{ ! isMaskStyle && ! isCircularStyle &&
							<SelectControl
								label={ __( 'Button Size' ) }
								value={ size }
								options={ options }
								onChange={ ( value ) => setAttributes( { size: value } ) }
								className="components-coblocks-inspector__social-button-size"
							/>
						}
					</PanelBody>
					<PanelBody
						title={ __( 'Icon Settings' ) }
						initialOpen={ false }
					>
						<p>{ __( ' Toggle the sharing links to display from the following social platforms.' ) }</p>
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
							label={ __( 'Pinterest' ) }
							checked={ !! pinterest }
							onChange={ () => setAttributes( {  pinterest: ! pinterest } ) }
						/>
						<ToggleControl
							label={ __( 'LinkedIn' ) }
							checked={ !! linkedin }
							onChange={ () => setAttributes( {  linkedin: ! linkedin } ) }
						/>
						<ToggleControl
							label={ __( 'Email' ) }
							checked={ !! email }
							onChange={ () => setAttributes( {  email: ! email } ) }
						/>
						<ToggleControl
							label={ __( 'Tumblr' ) }
							checked={ !! tumblr }
							onChange={ () => setAttributes( {  tumblr: ! tumblr } ) }
						/>
						<ToggleControl
							label={ __( 'Google' ) }
							checked={ !! google }
							onChange={ () => setAttributes( {  google: ! google } ) }
						/>
						<ToggleControl
							label={ __( 'Reddit' ) }
							checked={ !! reddit }
							onChange={ () => setAttributes( {  reddit: ! reddit } ) }
						/>
					</PanelBody>
					{ ! hasColors &&
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							initialOpen={ false }
							colorSettings={ ! isMaskStyle ? defaultColors : maskColors }
						>
							{ ! isMaskStyle &&
								<ContrastChecker
									{ ...{
										isLargeText: true,
										textColor: textColor.color,
										backgroundColor: backgroundColor.color,
										fallbackBackgroundColor,
										fallbackTextColor,
									} }
								/>
							}
						</PanelColorSettings>
					}
				</InspectorControls>
			</Fragment>
		);
	}
};

export default compose( [
	applyWithColors,
] )( Inspector );
