/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		onSetColumns,
		onSetGutter,
		onToggleImages,
		onToggleRoles,
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
