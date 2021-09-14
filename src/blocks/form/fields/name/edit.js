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
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					textColor={ textColor }
					customTextColor={ customTextColor }
					name={ name }
				/>
				{ hasLastName
					? <div className="coblocks-form__inline-fields">
						<div className="coblocks-form__inline-field">
							<TextControl className="coblocks-field" />
							<LabelColorWrapper
								label={ label }
								textColor={ textColor }
								customTextColor={ customTextColor }
								name={ name }
							>
								<RichText
									tagName="small"
									className="coblocks-form__subtext"
									value={ labelFirstName }
									onChange={ ( value ) => {
										setAttributes( { labelFirstName: value } );
									} }
									placeholder={ __( 'Add label…', 'coblocks' ) }
								/>
							</LabelColorWrapper>
						</div>
						<div className="coblocks-form__inline-field">
							<TextControl className="coblocks-field" />
							<LabelColorWrapper
								label={ label }
								textColor={ textColor }
								customTextColor={ customTextColor }
								name={ name }
							>
								<RichText
									tagName="small"
									className="coblocks-form__subtext"
									value={ labelLastName }
									onChange={ ( value ) => {
										setAttributes( { labelLastName: value } );
									} }
									placeholder={ __( 'Add label…', 'coblocks' ) }
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
						label={ __( 'Last name', 'coblocks' ) }
						className="coblocks-field-label__required"
						checked={ hasLastName }
						onChange={ ( value ) => setAttributes( { hasLastName: value } ) }
						help={ !! hasLastName ? __( 'Showing both first and last name fields.', 'coblocks' ) : __( 'Toggle to add a last name field.', 'coblocks' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default CoBlocksFieldName;
