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
 *
 * @return {JSX.Element}  GutterWrapper component
 */
function GutterWrapper( { children, gutter, gutterCustom, className, condition = true } ) {
	if ( ! isValidElement( children ) ) {
		return children;
	}

	return cloneElement( children, {
		className: classnames(
			className,
			children.props.className,
			{ [ `has-${ gutter }-gutter` ]: gutter && !! condition }
		),
		style: { '--coblocks-custom-gutter': `${ gutterCustom }em` },
	} );
}

GutterWrapper.propTypes = {
	gutter: PropTypes.string,
	gutterCustom: PropTypes.string,
};

export default GutterWrapper;
