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

function CoBlocksField( props ) {
	const { isSelected, type } = props;
	return (
		<Fragment>
			<div className={ classnames( 'coblocks-field', { 'is-selected': isSelected } ) }>
				<CoBlocksFieldLabel
					{ ...props }
					required={ props?.attributes?.required }
					label={ props?.attributes?.label }
				/>
				<TextControl type={ type } />
			</div>
		</Fragment>
	);
}

export default CoBlocksField;
