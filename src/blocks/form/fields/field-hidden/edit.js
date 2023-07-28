/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { TextControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function CoBlocksFieldHidden( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { label, value } = attributes;

	return (
		<>
			<CoBlocksFieldLabel
				label={ label }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				showRequiredToggle={ false }
			/>
			<TextControl
				value={ value }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Hidden Field settings', 'coblocks' ) }>
					<TextControl
						value={ value }
						label={ __( 'Field value', 'coblocks' ) }
						onChange={ ( newValue ) => setAttributes( { value: newValue } ) }
						className="components-block-coblocks-map-api-key__custom-input"
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default CoBlocksFieldHidden;
