/**
 * Internal dependencies
 */
import { computeFontSize } from '../../utils/helper';

/**
 * External dependencies
 */
import { pickBy } from 'lodash';

const styleAttributes = [ 'fontFamily', 'lineHeight', 'letterSpacing', 'fontWeight', 'textTransform' ];

function applyStyle( attributes, name ) {
	const style = pickBy( attributes, ( value, key ) => !! value && styleAttributes.includes( key ) );

	if ( typeof attributes.customFontSize !== 'undefined' ) {
		style.fontSize = computeFontSize( attributes.customFontSize );
	}

	if ( typeof attributes.customTextColor !== 'undefined' ) {
		style.color = attributes.customTextColor;
	}

	if ( name === 'coblocks/column' && typeof attributes.width !== 'undefined' ) {
		style.width = attributes.width + '%';
	}

	return style;
}

export default applyStyle;
