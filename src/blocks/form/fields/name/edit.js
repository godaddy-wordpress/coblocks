/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';
import LabelColorWrapper from '../../../../components/form-label-colors/label-color-wrapper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

function CoBlocksFieldName( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, hasLastName, labelFirstName, labelLastName, textColor, customTextColor } = attributes;

	return (
		<>
			<div className={
				classnames(
					'coblocks-field',
					'coblocks-field--name',
					{ 'is-selected': isSelected }
				) }
			>
				<CoBlocksFieldLabel
					customTextColor={ customTextColor }
					isSelected={ isSelected }
					label={ label }
					name={ name }
					required={ required }
					setAttributes={ setAttributes }
					textColor={ textColor }
				/>
				{ hasLastName
					? <div className="coblocks-form__inline-fields">
						<div className="coblocks-form__inline-field">
							<TextControl className="coblocks-field" />
							<LabelColorWrapper
								customTextColor={ customTextColor }
								label={ label }
								name={ name }
								textColor={ textColor }
							>
								<RichText
									className="coblocks-form__subtext"
									onChange={ ( value ) => {
										setAttributes( { labelFirstName: value } );
									} }
									placeholder={ __( 'Add label…', 'coblocks' ) }
									tagName="small"
									value={ labelFirstName }
								/>
							</LabelColorWrapper>
						</div>
						<div className="coblocks-form__inline-field">
							<TextControl className="coblocks-field" />
							<LabelColorWrapper
								customTextColor={ customTextColor }
								label={ label }
								name={ name }
								textColor={ textColor }
							>
								<RichText
									className="coblocks-form__subtext"
									onChange={ ( value ) => {
										setAttributes( { labelLastName: value } );
									} }
									placeholder={ __( 'Add label…', 'coblocks' ) }
									tagName="small"
									value={ labelLastName }
								/>
							</LabelColorWrapper>
						</div>
					</div>
					:				<TextControl />
				}
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Name Field settings', 'coblocks' ) }>
					<ToggleControl
						checked={ hasLastName }
						className="coblocks-field-label__required"
						help={ !! hasLastName ? __( 'Showing both first and last name fields.', 'coblocks' ) : __( 'Toggle to add a last name field.', 'coblocks' ) }
						label={ __( 'Last name', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { hasLastName: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default CoBlocksFieldName;
