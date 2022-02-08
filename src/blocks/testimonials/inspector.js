/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { InspectorControls, PanelColorSettings, withColors, withFontSizes } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		activeStyle,
		attributes,
		backgroundColor,
		bubbleBackgroundColor,
		bubbleTextColor,
		layoutOptions,
		onSetColumns,
		onSetGutter,
		onToggleImages,
		onToggleRoles,
		onUpdateStyleName,
		setBackgroundColor,
		setBubbleBackgroundColor,
		setBubbleTextColor,
		setTextColor,
		textColor,
	} = props;

	const {
		showImages,
		showRoles,
	} = attributes;

	const gutterOptions = [
		{
			/* translators: abbreviation for small size */
			label: __( 'S', 'coblocks' ),
			tooltip: __( 'Small', 'coblocks' ),
			value: 'small',
		},
		{
			/* translators: abbreviation for medium size */
			label: __( 'M', 'coblocks' ),
			tooltip: __( 'Medium', 'coblocks' ),
			value: 'medium',
		},
		{
			/* translators: abbreviation for large size */
			label: __( 'L', 'coblocks' ),
			tooltip: __( 'Large', 'coblocks' ),
			value: 'large',
		},
		{
			/* translators: abbreviation for largest size */
			label: __( 'XL', 'coblocks' ),
			tooltip: __( 'Huge', 'coblocks' ),
			value: 'huge',
		},
	];

	const colorSettings = () => {
		const colorSettingsArray = [
			{
				label: __( 'Background color', 'coblocks' ),
				onChange: setBackgroundColor,
				value: backgroundColor.color,
			},
			{
				label: __( 'Text color', 'coblocks' ),
				onChange: setTextColor,
				value: textColor.color,
			},
		];

		if ( activeStyle === 'conversation' ) {
			colorSettingsArray.push( ...[
				{
					label: __( 'Bubble background color', 'coblocks' ),
					onChange: setBubbleBackgroundColor,
					value: bubbleBackgroundColor.color,
				},
				{
					label: __( 'Bubble text color', 'coblocks' ),
					onChange: setBubbleTextColor,
					value: bubbleTextColor.color,
				},
			] );
		}

		return colorSettingsArray;
	};

	return (
		<InspectorControls>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Styles', 'coblocks' ) }>
				<div className="block-editor-block-styles block-editor-block-styles coblocks-editor-block-styles">
					{ layoutOptions.map( ( style ) => (
						<div
							aria-label={ style.label || style.name }
							className={ classnames(
								'block-editor-block-styles__item block-editor-block-styles__item',
								{
									'is-active': activeStyle === style.name,
								}
							) }
							key={ `style-${ style.name }` }
							onClick={ () => onUpdateStyleName( style ) }
							onKeyDown={ ( event ) => {
								if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
									event.preventDefault();
									onUpdateStyleName( style );
								}
							} }
							role="button"
							tabIndex="0"
						>
							{ <img alt="" src={ `/wp-content/plugins/coblocks/dist/images/testimonial-style-${ style.name }${ ! showImages ? '--noimage' : '' }.png` } /> }
							<div className="block-editor-block-styles__item-label block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>

			<PanelBody
				initialOpen={ true }
				title={ __( 'Testimonials Settings', 'coblocks' ) }>
				<>
					<RangeControl
						label={ __( 'Columns', 'coblocks' ) }
						max={ 3 }
						min={ 1 }
						onChange={ ( newColumns ) => onSetColumns( newColumns ) }
						value={ attributes.columns }
					/>
					<OptionSelectorControl
						currentOption={ attributes.gutter }
						label={ __( 'Gutter', 'coblocks' ) }
						onChange={ ( newGutter ) => onSetGutter( newGutter ) }
						options={ gutterOptions }
					/>
				</>
				<ToggleControl
					checked={ showImages }
					help={
						showImages
							? __( 'Showing images for each item', 'coblocks' )
							: __( 'Toggle to show images for each item.', 'coblocks' )
					}
					label={ __( 'Customer Images', 'coblocks' ) }
					onChange={ onToggleImages }
				/>
				<ToggleControl
					checked={ showRoles }
					help={
						showRoles
							? __( 'Showing the role of each reviewer', 'coblocks' )
							: __( 'Toggle to show the role of each item.', 'coblocks' )
					}
					label={ __( 'Customer Roles', 'coblocks' ) }
					onChange={ onToggleRoles }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
