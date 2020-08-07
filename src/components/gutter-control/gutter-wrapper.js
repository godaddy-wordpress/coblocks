/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { cloneElement, isValidElement } from '@wordpress/element';

/**
 * Return an element Wrapped with Gutter Properties.
 *
 * @return {JSX.Element}  Icon component
 */
function GutterWrapper( { children, gutter, gutterCustom } ) {
	if ( ! isValidElement( children ) ) {
		return children;
	}

	return cloneElement( children, {
		className: classnames(
			children.props.className,
			{ [ `has-${ gutter }-gutter` ]: gutter }
		),
		style: { '--coblocks-custom-gutter': `${ gutterCustom }em` },
	} );
}

export default GutterWrapper;
