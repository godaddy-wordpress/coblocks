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
 * Return an element Wrapped with Gutter Properties.
 */
function GutterWrapper( { children, gutter, gutterCustom, className, condition = true } ) {
	if ( ! isValidElement( children ) ) {
		return children;
	}

	const attributes = {
		className: classnames(
			className,
			children.props.className,
			{ [ `has-${ gutter }-gutter` ]: gutter && !! condition }
		),
	};

	if ( children.props.style ) {
		attributes.style = {
			...children.props.style,
		};
	}

	if ( 'custom' === gutter ) {
		attributes.style = {
			...attributes.style,
			'--coblocks-custom-gutter': `${ gutterCustom }px`,
		};
	}

	return cloneElement( children, attributes );
}

GutterWrapper.propTypes = {
	gutter: PropTypes.string,
	gutterCustom: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
};

export default GutterWrapper;
