/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { hasBlockSupport } from '@wordpress/blocks';
import { cloneElement, isValidElement } from '@wordpress/element';

/**
 * Return an element Wrapped with Label Color Properties.
 *
 * @param {Object} obj
 * @param {Object} obj.children        HTML Children elements
 * @param {string} obj.name            String representing the block name
 * @param {string} obj.textColor       String representing textColor name
 * @param {string} obj.customTextColor String representing customTextColor values
 */
function LabelColorWrapper( { children, name, textColor, customTextColor } ) {
	if ( ! hasBlockSupport( name, 'labelColor', false ) ) {
		return children;
	}

	if ( ! isValidElement( children ) ) {
		return children;
	}

	const { className = '' } = children.props;

	const attributes = {
		className: classnames(
			className, {
				'has-text-color': textColor || customTextColor,
				[ `has-${ textColor }-color` ]: textColor,
			}
		),
	};

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

	return cloneElement( children, attributes );
}

LabelColorWrapper.propTypes = {
	customTextColor: PropTypes.string,
	textColor: PropTypes.string,
};

export default LabelColorWrapper;
