/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { shareableMediums } from './shareable-mediums';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	getHasColorsHelp( checked ) {
		return checked ? __( 'Social button colors are enabled.' ) : __( 'Toggle to use official colors from each social media platform.' );
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
					<PanelBody title={ __( 'Social Settings' ) }>
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
					</PanelBody>

					<PanelBody
						title={ __( 'Icon Settings' ) }
						initialOpen={ false }>

						<p>{ __( 'Toggle the sharing links to display from the following social platforms.' ) }</p>

						{ Object.entries( shareableMediums ).map( ( [ slug, label ] ) => (
							<ToggleControl
								key={ `shareable-medium-${ slug }` }
								label={ label }
								checked={ !! attributes[ slug ] }
								onChange={ () => setAttributes( { [ slug ]: ! attributes[ slug ] } ) }
							/>
						) ) }
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
