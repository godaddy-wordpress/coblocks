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
const { PanelBody, RangeControl, ToggleControl, SelectControl, CheckboxControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	getHasColorsHelp( checked ) {
		return checked ? __( 'Share button colors are enabled.' ) : __( 'Toggle to use official colors from each social media platform.' );
	}

	render() {
		const {
			className,
			attributes,
			setAttributes,
			setBackgroundColor,
			setBlockBackgroundColor,
			setTextColor,
			fallbackTextColor,
			backgroundColor,
			blockBackgroundColor,
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

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isTextStyle = includes( className, 'is-style-text' );
		const isIconTextStyle = includes( className, 'is-style-icon-and-text' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		const textColorLabel = () => {
			if ( isTextStyle || isIconTextStyle ) {
				return __( 'Text Color' );
			}
			return __( 'Icon Color' );
		};

		const options = [
			{ value: 'sml', label: __( 'Small' ) },
			{ value: 'med', label: __( 'Medium' ) },
			{ value: 'lrg', label: __( 'Large' ) },
		];

		const defaultColors = [
			{
				value: blockBackgroundColor.color,
				onChange: setBlockBackgroundColor,
				label: __( 'Background Color' ),
			},
			{
				value: backgroundColor.color,
				onChange: setBackgroundColor,
				label: __( 'Button Color' ),
			},
			{
				value: textColor.color,
				onChange: setTextColor,
				label: textColorLabel(),
			},
		];

		const maskColors = [
			{
				value: blockBackgroundColor.color,
				onChange: setBlockBackgroundColor,
				label: __( 'Background Color' ),
			},
			{
				value: backgroundColor.color,
				onChange: setBackgroundColor,
				label: __( 'Icon Color' ),
			},
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Settings' ) }>
						<ToggleControl
							label={ __( 'Social Colors' ) }
							checked={ !! hasColors }
							onChange={ () => setAttributes( { hasColors: ! hasColors } ) }
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
						<div className="components-social-icons-list">
							<p className="components-social-icons-list__label">{ __( 'Icons' ) }</p>
							<CheckboxControl
								label={ __( 'Twitter' ) }
								checked={ !! twitter }
								onChange={ () => setAttributes( { twitter: ! twitter } ) }
							/>
							<CheckboxControl
								label={ __( 'Facebook' ) }
								checked={ !! facebook }
								onChange={ () => setAttributes( { facebook: ! facebook } ) }
							/>
							<CheckboxControl
								label={ __( 'Pinterest' ) }
								checked={ !! pinterest }
								onChange={ () => setAttributes( { pinterest: ! pinterest } ) }
							/>
							<CheckboxControl
								label={ __( 'LinkedIn' ) }
								checked={ !! linkedin }
								onChange={ () => setAttributes( { linkedin: ! linkedin } ) }
							/>
							<CheckboxControl
								label={ __( 'Email' ) }
								checked={ !! email }
								onChange={ () => setAttributes( { email: ! email } ) }
							/>
							<CheckboxControl
								label={ __( 'Tumblr' ) }
								checked={ !! tumblr }
								onChange={ () => setAttributes( { tumblr: ! tumblr } ) }
							/>
							<CheckboxControl
								label={ __( 'Google' ) }
								checked={ !! google }
								onChange={ () => setAttributes( { google: ! google } ) }
							/>
							<CheckboxControl
								label={ __( 'Reddit' ) }
								checked={ !! reddit }
								onChange={ () => setAttributes( { reddit: ! reddit } ) }
							/>
						</div>
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
}

export default compose( [
	applyWithColors,
] )( Inspector );
