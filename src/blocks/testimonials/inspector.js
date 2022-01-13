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
import { compose } from '@wordpress/compose';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { InspectorControls, PanelColorSettings, withColors } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, withFallbackStyles } from '@wordpress/components';

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

const Inspector = ( props ) => {
	const {
		activeStyle,
		attributes,
		layoutOptions,
		onSetColumns,
		onSetGutter,
		onToggleImages,
		onToggleRoles,
		onUpdateStyleName,

		backgroundColor,
		setBackgroundColor,
		setTextColor,
		textColor,
		fallbackTextColor,
		fallbackBackgroundColor,
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

			<PanelColorSettings
				colorSettings={ [
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
				] }
				initialOpen={ false }
				title={ __( 'Color settings', 'coblocks' ) }
			/>
		</InspectorControls>
	);
};

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
	applyFallbackStyles,
] )( Inspector );
