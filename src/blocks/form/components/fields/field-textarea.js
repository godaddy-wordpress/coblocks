/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoblocksFieldLabel from './field-label';

function CoblocksFieldTextarea( {
	required,
	label,
	setAttributes,
	isSelected,
	placeholder,
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
		</Fragment>
	);
}

export default CoblocksFieldTextarea;
