/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import InlineColorPicker from '../../../components/inline-color-picker';

const CoBlocksFieldLabel = ( { setAttributes, label, labelColor, resetFocus, isSelected, required, showRequiredToggle = true } ) => {
	return (
		<div className="coblocks-field-label">
			<div className="coblocks-field-label__input-wrapper" style={{ color: labelColor }}>
				<RichText
					tagName="label"
					className={ classnames(
						'coblocks-label coblocks-field-label__input',
						{
							'custom-color': labelColor !== '#000000',
						}
					) }
					value={ label }
					onChange={ ( value ) => {
						if ( resetFocus ) {
							resetFocus();
						}
						setAttributes( { label: value } );
					} }
					placeholder={ __( 'Add label…', 'coblocks' ) }
				/>
				{ required && (
					<span className="required">*</span>
				) }
			</div>
			<Fragment>
				{ isSelected && (
					<InlineColorPicker
						value={ labelColor }
						onChange={ ( color ) => setAttributes( { labelColor: color } ) }
					/>
				) }
				{ isSelected && showRequiredToggle && (
					<ToggleControl
						label={ __( 'Required', 'coblocks' ) }
						className="coblocks-field-label__required"
						checked={ required }
						onChange={ ( value ) => setAttributes( { required: value } ) }
					/>
				) }
			</Fragment>
		</div>
	);
};

export default CoBlocksFieldLabel;
