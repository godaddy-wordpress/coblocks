/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PlainText } from '@wordpress/editor';
import { ToggleControl } from '@wordpress/components';

const CoblocksFieldLabel = ( { setAttributes, label, resetFocus, isSelected, required } ) => {
	return (
		<div className="coblocks-field-label">
			<PlainText
				value={ label }
				className="coblocks-field-label__input"
				onChange={ value => {
					resetFocus && resetFocus();
					setAttributes( { label: value } );
				} }
				placeholder={ __( 'Add label…' ) }
			/>
			{ isSelected && (
				<ToggleControl
					label={ __( 'Required' ) }
					className="coblocks-field-label__required"
					checked={ required }
					onChange={ value => setAttributes( { required: value } ) }
				/>
			) }
			{ ! isSelected && required && (
				<span className="required">{ __( '(required)' ) }</span>
			) }
		</div>
	);
};

export default CoblocksFieldLabel;
