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
const { Fragment } = wp.element;
const { TextControl } = wp.components;

function CoBlocksField( {
	isSelected,
	type,
	required,
	label,
	setAttributes,
} ) {
	return (
		<Fragment>
			<div className={ classnames( 'coblocks-field', { 'is-selected': isSelected } ) }>
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextControl type={ type } />
			</div>
		</Fragment>
	);
}

export default CoBlocksField;
