/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoblocksFieldLabel from './field-label';

function CoblocksFieldTextarea( {
	required,
	label,
	setAttributes,
	isSelected,
	defaultValue,
	placeholder,
	id,
} ) {
	return (
		<Fragment>
			<div className="coblocks-field">
				<CoblocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextareaControl/>
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Field Settings' ) }>
					<TextControl
						label={ __( 'Default Value' ) }
						value={ defaultValue }
						onChange={ value => setAttributes( { defaultValue: value } ) }
					/>
					<TextControl
						label={ __( 'ID' ) }
						value={ id }
						onChange={ value => setAttributes( { id: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default CoblocksFieldTextarea;
