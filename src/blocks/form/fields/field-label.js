/**
 * Internal dependencies
 */
import LabelColorWrapper from '../../../components/form-label-colors/label-color-wrapper';

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

const CoBlocksFieldLabel = ( { setAttributes, label, resetFocus, isSelected, required, name, textColor, customTextColor, showRequiredToggle = true } ) => {
	const labelClassnames = classnames(
		'coblocks-label',
		'coblocks-field-label__input', {
			required,
		} );
	return (
		<div className="coblocks-field-label">
			<div className="coblocks-field-label__input-wrapper">
				{ label && (
					<LabelColorWrapper
						customTextColor={ customTextColor }
						label={ label }
						name={ name }
						textColor={ textColor }
					>
						<RichText
							className={ labelClassnames }
							onChange={ ( value ) => {
								if ( resetFocus ) {
									resetFocus();
								}
								setAttributes( { label: value } );
							} }
							placeholder={ __( 'Add label…', 'coblocks' ) }
							tagName="label"
							value={ label }
						/>
					</LabelColorWrapper>
				) }
			</div>
			{ isSelected && showRequiredToggle && (
				<ToggleControl
					checked={ required }
					className="coblocks-field-label__required"
					label={ __( 'Required', 'coblocks' ) }
					onChange={ ( value ) => setAttributes( { required: value } ) }
				/>
			) }
		</div>
	);
};

export default CoBlocksFieldLabel;
