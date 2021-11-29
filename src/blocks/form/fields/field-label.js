/**
 * Internal dependencies
 */
import LabelColorWrapper from '../../../components/form-label-colors/label-color-wrapper';

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

const CoBlocksFieldLabel = ( { setAttributes, label, resetFocus, isSelected, required, name, textColor, customTextColor, showRequiredToggle = true } ) => {
	return (
		<div className="coblocks-field-label">
			<div className="coblocks-field-label__input-wrapper">
				{ label && (
					<LabelColorWrapper
						label={ label }
						textColor={ textColor }
						customTextColor={ customTextColor }
						name={ name }
					>
						<RichText
							tagName="label"
							className="coblocks-label coblocks-field-label__input"
							value={ label }
							onChange={ ( value ) => {
								if ( resetFocus ) {
									resetFocus();
								}
								setAttributes( { label: value } );
							} }
							placeholder={ __( 'Add label…', 'coblocks' ) }
						/>
					</LabelColorWrapper>
				) }

				{ required && (
					<span className="required">*</span>
				) }
			</div>
			{ isSelected && showRequiredToggle && (
				<ToggleControl
					label={ __( 'Required', 'coblocks' ) }
					className="coblocks-field-label__required"
					checked={ required }
					onChange={ ( value ) => setAttributes( { required: value } ) }
				/>
			) }
		</div>
	);
};

export default CoBlocksFieldLabel;
