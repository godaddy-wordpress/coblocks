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
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl } = wp.components;

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
