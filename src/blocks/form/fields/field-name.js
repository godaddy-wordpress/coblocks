/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from './field-label';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

function CoBlocksFieldName( {
	isSelected,
	type,
	required,
	label,
	setAttributes,
	hasLastName,
	labelFirstName,
	labelLastName,
} ) {
	return (
		<Fragment>
			<div className={
				classnames(
					'coblocks-field',
					`coblocks-field--${ type }`,
					{ 'is-selected': isSelected }
				) }
			>
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				{ hasLastName ?
					<div className="coblocks-form__inline-fields">
						<div className="coblocks-form__inline-field">
							<TextControl className="coblocks-field" />
							<RichText
								tagName="small"
								className="coblocks-form__subtext"
								value={ labelFirstName }
								onChange={ value => {
									setAttributes( { labelFirstName: value } );
								} }
								placeholder={ __( 'Add label…' ) }
							/>
						</div>
						<div className="coblocks-form__inline-field">
							<TextControl className="coblocks-field" />
							<RichText
								tagName="small"
								className="coblocks-form__subtext"
								value={ labelLastName }
								onChange={ value => {
									setAttributes( { labelLastName: value } );
								} }
								placeholder={ __( 'Add label…' ) }
							/>
						</div>
					</div>				:
					<TextControl />
				}
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Name Field Settings' ) }>
					<ToggleControl
						label={ __( 'Last Name' ) }
						className="coblocks-field-label__required"
						checked={ hasLastName }
						onChange={ value => setAttributes( { hasLastName: value } ) }
						help={ !! hasLastName ? __( 'Showing both first and last name fields.' ) : __( 'Toggle to add a last name field.' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default CoBlocksFieldName;
