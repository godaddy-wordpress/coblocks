/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import GutterControl from './../../components/gutter-control/gutter-control';

const Inspector = ( props ) => {
	const {
		attributes,
		onSetColumns,
		onToggleImages,
		onToggleRoles,
	} = props;

	const {
		columns,
		showImages,
		showRoles,
	} = attributes;

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
						value={ columns }
					/>
					{ columns >= 2 && <GutterControl { ...props } /> }
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
