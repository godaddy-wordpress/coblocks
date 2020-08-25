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
	labelColor,
	setAttributes,
} ) {
	return (
		<Fragment>
			<div className={ classnames( 'coblocks-field', { 'is-selected': isSelected } ) }>
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					labelColor={ labelColor }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextControl type={ type } />
			</div>
		</Fragment>
	);
}

export default CoBlocksField;
