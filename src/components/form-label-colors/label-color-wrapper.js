/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { cloneElement, isValidElement } from '@wordpress/element';
import { getColorClassName } from '@wordpress/block-editor';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Return an element Wrapped with Label Color Properties.
 *
 * @return {JSX.Element} LabelColorWrapper component
 * @param props
 */
function LabelColorWrapper( props ) {
	const { children, className } = props;
	if ( ! isValidElement( children ) ) {
		return children;
	}

	const { textColor, customTextColor } = props.attributes;

	const attributes = {
		className: classnames(
			className, {
				'has-text-color': textColor || customTextColor,
				[ `has-${ textColor }-color` ]: textColor,
			} ),
	};

	console.log( attributes, textColor );

	if ( children.props.style ) {
		attributes.style = {
			...children.props.style,
		};
	}

	if ( !! customTextColor ) {
		attributes.style = {
			...attributes.style,
			color: customTextColor,
		};
	}
	console.log( children, attributes );
	return cloneElement( children, attributes );
}

LabelColorWrapper.propTypes = {
	textColor: PropTypes.string,
	customTextColor: PropTypes.string,
};

export default LabelColorWrapper;

