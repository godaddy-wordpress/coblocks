/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
const { RichText } = wp.blockEditor;

const CoBlocksFieldLabel = ( { setAttributes, label, resetFocus, isSelected, required } ) => {
	return (
		<div className="coblocks-field-label">
			<div className="coblocks-field-label__input-wrapper">
				<RichText
					tagName="label"
					className="coblocks-label coblocks-field-label__input"
					value={ label }
					onChange={ value => {
						if ( resetFocus ) {
							resetFocus();
						}
						setAttributes( { label: value } );
					} }
					placeholder={ __( 'Add label…' ) }
				/>
				{ required && (
					<span className="required">*</span>
				) }
			</div>
			{ isSelected && (
				<ToggleControl
					label={ __( 'Required' ) }
					className="coblocks-field-label__required"
					checked={ required }
					onChange={ value => setAttributes( { required: value } ) }
				/>
			) }
		</div>
	);
};

export default CoBlocksFieldLabel;
