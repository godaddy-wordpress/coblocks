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

	let style = {};

	if ( children.props.style ) {
		style = {
			...children.props.style,
		};
	}

	if ( 'custom' === gutter ) {
		style = {
			...style,
			'--coblocks-custom-gutter': `${ gutterCustom }em`,
		};
	}

	return cloneElement( children, {
		className: classnames(
			className,
			children.props.className,
			{ [ `has-${ gutter }-gutter` ]: gutter && !! condition }
		),
		style,
	} );
}

GutterWrapper.propTypes = {
	gutter: PropTypes.string,
	gutterCustom: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
};

export default GutterWrapper;
