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
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const getHasColorsHelp = ( checked ) => {
		return checked
			? __( 'Share button colors are enabled.', 'coblocks' )
			: __( 'Toggle to use official colors from each social media platform.', 'coblocks' );
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
		hasColors,
		borderRadius,
		size,
		iconSize,
		padding,
		facebook,
		twitter,
		instagram,
		tiktok,
		pinterest,
		linkedin,
		youtube,
		yelp,
		houzz,
		opensInNewTab,
	} = attributes;

	const isMaskStyle = includes( className, 'is-style-mask' );
	const isTextStyle = includes( className, 'is-style-text' );
	const isCircularStyle = includes( className, 'is-style-circular' );

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
			label: __( 'Button Color', 'coblocks' ),
		},
		{
			value: textColor.color,
			onChange: setTextColor,
			label: ! isTextStyle ? __( 'Icon color', 'coblocks' ) : __( 'Text color', 'coblocks' ),
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
					{ ! isMaskStyle && ! isCircularStyle && (
						<RangeControl
							label={ __( 'Rounded corners', 'coblocks' ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					) }
					{ ( isMaskStyle || isCircularStyle ) && (
						<RangeControl
							label={ __( 'Icon size', 'coblocks' ) }
							value={ iconSize }
							onChange={ ( value ) => setAttributes( { iconSize: value } ) }
							min={ 16 }
							max={ 60 }
						/>
					) }
					{ isCircularStyle && (
						<RangeControl
							label={ __( 'Circle size', 'coblocks' ) }
							value={ padding }
							onChange={ ( value ) => setAttributes( { padding: value } ) }
							min={ 10 }
							max={ 50 }
						/>
					) }
					{ ! isMaskStyle && ! isCircularStyle && (
						<SelectControl
							label={ __( 'Button size', 'coblocks' ) }
							value={ size }
							options={ options }
							onChange={ ( value ) => setAttributes( { size: value } ) }
							className="components-coblocks-inspector__social-button-size"
						/>
					) }
					<ToggleControl
						label={ __( 'Open links in new tab', 'coblocks' ) }
						checked={ !! opensInNewTab }
						onChange={ () => setAttributes( { opensInNewTab: ! opensInNewTab } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Profiles', 'coblocks' ) } initialOpen={ false }>
					<div className="components-social-links-list">
						<TextControl
							label="Facebook"
							value={ facebook }
							onChange={ ( value ) => setAttributes( { facebook: escape( value ) } ) }
						/>
						<TextControl
							label="Twitter"
							value={ twitter }
							onChange={ ( value ) => setAttributes( { twitter: escape( value ) } ) }
						/>
						<TextControl
							label="Instagram"
							value={ instagram }
							onChange={ ( value ) => setAttributes( { instagram: escape( value ) } ) }
						/>
						<TextControl
							label="TikTok"
							value={ tiktok }
							onChange={ ( value ) => setAttributes( { tiktok: escape( value ) } ) }
						/>
						<TextControl
							label="Pinterest"
							value={ pinterest }
							onChange={ ( value ) => setAttributes( { pinterest: escape( value ) } ) }
						/>
						<TextControl
							label="LinkedIn"
							value={ linkedin }
							onChange={ ( value ) => setAttributes( { linkedin: escape( value ) } ) }
						/>
						<TextControl
							label="YouTube"
							value={ youtube }
							onChange={ ( value ) => setAttributes( { youtube: escape( value ) } ) }
						/>
						<TextControl
							label="Yelp"
							value={ yelp }
							onChange={ ( value ) => setAttributes( { yelp: escape( value ) } ) }
						/>
						<TextControl
							label="Houzz"
							value={ houzz }
							onChange={ ( value ) => setAttributes( { houzz: escape( value ) } ) }
						/>
					</div>
				</PanelBody>

				{ ! hasColors && (
					<PanelColorSettings
						title={ __( 'Color settings', 'coblocks' ) }
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
		</>
	);
};

export default compose( [ applyWithColors ] )( Inspector );
