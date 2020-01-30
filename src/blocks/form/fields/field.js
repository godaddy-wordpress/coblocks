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
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

function CoBlocksField( {
	isSelected,
	type,
	required,
	label,
	setAttributes,
	labelsAsPlaceholders,
} ) {
	return (
		<Fragment>
			<div className={ classnames( 'coblocks-field', { 'is-selected': isSelected } ) }>
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					labelsAsPlaceholders={ labelsAsPlaceholders }
					placeholder={ labelsAsPlaceholders ? label : '' }
				/>
				<TextControl
					type={ type }
					placeholder={ labelsAsPlaceholders ? label : '' }
				/>
			</div>
		</Fragment>
	);
}

export default CoBlocksField;
