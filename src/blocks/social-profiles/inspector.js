/**
 * External dependencies
 */
import { includes, escape } from 'lodash';

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
const {
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
} = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	getHasColorsHelp( checked ) {
		return checked ?
			__( 'Share button colors are enabled.' ) :
			__( 'Toggle to use official colors from each social media platform.' );
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
			hasColors,
			borderRadius,
			size,
			iconSize,
			padding,
			facebook,
			twitter,
			instagram,
			pinterest,
			linkedin,
			youtube,
			yelp,
			houzz,
		} = attributes;

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isTextStyle = includes( className, 'is-style-text' );
		const isCircularStyle = includes( className, 'is-style-circular' );

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
				label: ! isTextStyle ? __( 'Icon Color' ) : __( 'Text Color' ),
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
						{ ! isMaskStyle && ! isCircularStyle && (
							<RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ borderRadius }
								onChange={ value => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 50 }
							/>
						) }
						{ ( isMaskStyle || isCircularStyle ) && (
							<RangeControl
								label={ __( 'Icon Size' ) }
								value={ iconSize }
								onChange={ value => setAttributes( { iconSize: value } ) }
								min={ 16 }
								max={ 60 }
							/>
						) }
						{ isCircularStyle && (
							<RangeControl
								label={ __( 'Circle Size' ) }
								value={ padding }
								onChange={ value => setAttributes( { padding: value } ) }
								min={ 10 }
								max={ 50 }
							/>
						) }
						{ ! isMaskStyle && ! isCircularStyle && (
							<SelectControl
								label={ __( 'Button Size' ) }
								value={ size }
								options={ options }
								onChange={ value => setAttributes( { size: value } ) }
								className="components-coblocks-inspector__social-button-size"
							/>
						) }
					</PanelBody>
					<PanelBody title={ __( 'Profile Links' ) } initialOpen={ false }>
						<div className="components-social-links-list">
							<TextControl
								label="Facebook"
								value={ facebook }
								onChange={ value => setAttributes( { facebook: escape( value ) } ) }
							/>
							<TextControl
								label="Twitter"
								value={ twitter }
								onChange={ value => setAttributes( { twitter: escape( value ) } ) }
							/>
							<TextControl
								label="Instagram"
								value={ instagram }
								onChange={ value => setAttributes( { instagram: escape( value ) } ) }
							/>
							<TextControl
								label="Pinterest"
								value={ pinterest }
								onChange={ value => setAttributes( { pinterest: escape( value ) } ) }
							/>
							<TextControl
								label="LinkedIn"
								value={ linkedin }
								onChange={ value => setAttributes( { linkedin: escape( value ) } ) }
							/>
							<TextControl
								label="YouTube"
								value={ youtube }
								onChange={ value => setAttributes( { youtube: escape( value ) } ) }
							/>
							<TextControl
								label="Yelp"
								value={ yelp }
								onChange={ value => setAttributes( { yelp: escape( value ) } ) }
							/>
							<TextControl
								label="Houzz"
								value={ houzz }
								onChange={ value => setAttributes( { houzz: escape( value ) } ) }
							/>
						</div>
					</PanelBody>

					{ ! hasColors && (
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							initialOpen={ false }
							colorSettings={ ! isMaskStyle ? defaultColors : maskColors }
						>
							{ ! isMaskStyle && (
								<ContrastChecker
									{ ...{
										isLargeText: true,
										textColor: textColor.color,
										backgroundColor: backgroundColor.color,
										fallbackBackgroundColor,
										fallbackTextColor,
									} }
								/>
							) }
						</PanelColorSettings>
					) }
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [ applyWithColors ] )( Inspector );
