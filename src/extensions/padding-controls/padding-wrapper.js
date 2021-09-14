/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { cloneElement, isValidElement } from '@wordpress/element';

/**
 * Return an element Wrapped with padding Properties.
 *
 * @param {Object} obj
 * @param {Object} obj.children      HTML Children elements
 * @param {string} obj.padding       String representing padding value
 * @param {number} obj.paddingCustom Number representing paddingCustom value
 */
function PaddingWrapper( { children, padding, paddingCustom } ) {
	if ( ! isValidElement( children ) ) {
		return children;
	}

	const attributes = {
		className: classnames(
			children.props.className,
			{ [ `has-${ padding }-padding` ]: padding }
		),
	};

	if ( children.props.style ) {
		attributes.style = {
			...children.props.style,
		};
	}

	if ( 'custom' === padding ) {
		attributes.style = {
			...attributes.style,
			'--coblocks-custom-padding': `${ paddingCustom }em`,
		};
	}

	return cloneElement( children, attributes );
}

PaddingWrapper.propTypes = {
	padding: PropTypes.string,
	paddingCustom: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
};

export default PaddingWrapper;
