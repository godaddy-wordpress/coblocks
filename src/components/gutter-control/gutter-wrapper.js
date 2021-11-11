/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { cloneElement, isValidElement, useMemo } from '@wordpress/element';

/**
 * Return an element Wrapped with Gutter Properties.
 *
 * @param {Object}  obj
 * @param {Object}  obj.children     HTML Children elements
 * @param {string}  obj.gutter       String representing gutter value.true
 * @param {number}  obj.gutterCustom Number representing gutterCustom value
 * @param {string}  obj.className    String representing block className string
 * @param {boolean} obj.condition    Whether to conditionally disable className application
 */
const GutterWrapper = ( { children, gutter, gutterCustom, className, condition = true } ) => {
	if ( ! isValidElement( children ) ) {
		return children;
	}

	// V2 API Blocks work differently because there is no HTML wrapper for the React component.
	// This is specifically true for Masonry but may be true for future v2 blocks.
	if ( typeof children.props.blockProps !== 'undefined' ) {
		const attributes = {
			blockProps: {
				...children.props.blockProps,
				className: classnames(
					children.props.blockProps.className,
					{ [ `has-${ gutter }-gutter` ]: gutter && !! condition }
				),
			},
		};

		if ( 'custom' === gutter && undefined !== gutterCustom ) {
			attributes.blockProps.style = { '--coblocks-custom-gutter': `${ gutterCustom }em` };
		}

		return cloneElement( children, attributes );
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

	if ( 'custom' === gutter && undefined !== gutterCustom ) {
		attributes.style = {
			...attributes.style,
			'--coblocks-custom-gutter': `${ gutterCustom }em`,
		};
	}

	return cloneElement( children, attributes );
};

GutterWrapper.propTypes = {
	gutter: PropTypes.string,
	gutterCustom: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
};

export default GutterWrapper;
