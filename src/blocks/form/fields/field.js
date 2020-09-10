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
	textColor,
	customTextColor,
	name,
} ) {
	return (
		<Fragment>
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
		</Fragment>
	);
}

export default CoBlocksField;
