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
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings, ContrastChecker } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl, CheckboxControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props Object contains props passed from edit.js
 */
const Inspector = ( props ) => {
	const getHasColorsHelp = ( checked ) => {
		return checked ? __( 'Share button colors are enabled.', 'coblocks' ) : __( 'Toggle to use official colors from each social media platform.', 'coblocks' );
	};

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
	} = props;

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
			return __( 'Text color', 'coblocks' );
		}
		return __( 'Icon color', 'coblocks' );
	};

	const options = [
		{ value: 'sml', label: __( 'Small', 'coblocks' ) },
		{ value: 'med', label: __( 'Medium', 'coblocks' ) },
		{ value: 'lrg', label: __( 'Large', 'coblocks' ) },
	];

	const defaultColors = [
		{
			value: blockBackgroundColor.color,
			onChange: setBlockBackgroundColor,
			label: __( 'Background color', 'coblocks' ),
		},
		{
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __( 'Button color', 'coblocks' ),
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
			label: __( 'Background color', 'coblocks' ),
		},
		{
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __( 'Icon color', 'coblocks' ),
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon settings', 'coblocks' ) }>
					<ToggleControl
						label={ __( 'Social colors', 'coblocks' ) }
						checked={ !! hasColors }
						onChange={ () => setAttributes( { hasColors: ! hasColors } ) }
						help={ getHasColorsHelp }
					/>
					{ ! isMaskStyle && ! isCircularStyle &&
						<RangeControl
							label={ __( 'Rounded corners', 'coblocks' ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					}
					{ ( isMaskStyle || isCircularStyle ) &&
						<RangeControl
							label={ __( 'Icon size', 'coblocks' ) }
							value={ iconSize }
							onChange={ ( value ) => setAttributes( { iconSize: value } ) }
							min={ 16 }
							max={ 60 }
						/>
					}
					{ isCircularStyle &&
						<RangeControl
							label={ __( 'Circle size', 'coblocks' ) }
							value={ padding }
							onChange={ ( value ) => setAttributes( { padding: value } ) }
							min={ 10 }
							max={ 50 }
						/>
					}
					{ ! isMaskStyle && ! isCircularStyle &&
						<SelectControl
							label={ __( 'Button size', 'coblocks' ) }
							value={ size }
							options={ options }
							onChange={ ( value ) => setAttributes( { size: value } ) }
							className="components-coblocks-inspector__social-button-size"
						/>
					}
					<div className="components-social-icons-list">
						<p className="components-social-icons-list__label">{ __( 'Icons', 'coblocks' ) }</p>
						<CheckboxControl
							label={ __( 'Twitter', 'coblocks' ) }
							checked={ !! twitter }
							onChange={ () => setAttributes( { twitter: ! twitter } ) }
						/>
						<CheckboxControl
							label={ __( 'Facebook', 'coblocks' ) }
							checked={ !! facebook }
							onChange={ () => setAttributes( { facebook: ! facebook } ) }
						/>
						<CheckboxControl
							label={ __( 'Pinterest', 'coblocks' ) }
							checked={ !! pinterest }
							onChange={ () => setAttributes( { pinterest: ! pinterest } ) }
						/>
						<CheckboxControl
							label={ __( 'LinkedIn', 'coblocks' ) }
							checked={ !! linkedin }
							onChange={ () => setAttributes( { linkedin: ! linkedin } ) }
						/>
						<CheckboxControl
							label={ __( 'Email', 'coblocks' ) }
							checked={ !! email }
							onChange={ () => setAttributes( { email: ! email } ) }
						/>
						<CheckboxControl
							label={ __( 'Tumblr', 'coblocks' ) }
							checked={ !! tumblr }
							onChange={ () => setAttributes( { tumblr: ! tumblr } ) }
						/>
						<CheckboxControl
							label={ __( 'Google', 'coblocks' ) }
							checked={ !! google }
							onChange={ () => setAttributes( { google: ! google } ) }
						/>
						<CheckboxControl
							label={ __( 'Reddit', 'coblocks' ) }
							checked={ !! reddit }
							onChange={ () => setAttributes( { reddit: ! reddit } ) }
						/>
					</div>
				</PanelBody>
				{ ! hasColors &&
					<PanelColorSettings
						title={ __( 'Color settings', 'coblocks' ) }
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
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );
