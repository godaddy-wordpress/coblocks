/**
 * External dependencies
 */
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoblocksFieldLabel from './field-label';

function CoblocksField( {
	isSelected,
	type,
	required,
	label,
	setAttributes,
	defaultValue,
	placeholder,
	id,
} ) {
	return (
		<Fragment>
			<div className={ classNames( 'coblocks-field', { 'is-selected': isSelected } ) }>
				<CoblocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextControl type={ type }/>
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

export default CoblocksField;
