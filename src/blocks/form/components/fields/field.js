/**
 * External dependencies
 */
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

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
	placeholder,
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
				<TextControl
					type={ type }
				/>
			</div>
		</Fragment>
	);
}

export default CoblocksField;
