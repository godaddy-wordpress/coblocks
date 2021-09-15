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
import { TextControl } from '@wordpress/components';

function CoBlocksField( {
	isSelected,
	type,
	required,
	label,
	setAttributes,
	textColor,
	customTextColor,
	name,
} ) {
	return (
		<>
			<div className={ classnames( 'coblocks-field', { 'is-selected': isSelected } ) }>
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					textColor={ textColor }
					customTextColor={ customTextColor }
					name={ name }
				/>
				<TextControl type={ type } />
			</div>
		</>
	);
}

export default CoBlocksField;
