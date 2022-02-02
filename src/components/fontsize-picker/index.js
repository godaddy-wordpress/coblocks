
/**
 * WordPress dependencies
 */
import { FontSizePicker } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * CoBlocksFontSizePicker is a functional component to interface `withFontSizes` hoc to FontSizePicker controls.
 *
 * @param {Object} props Accepts block props provided by `withFontSizes`.
 */
const CoBlocksFontSizePicker = ( props ) => {
	const { fallbackFontSize, fontSize, setFontSize } = props;

	return (
		<FontSizePicker
			fallbackFontSize={ fallbackFontSize }
			onChange={ ( value ) => {
				const newFontSize = value ? parseInt( value, 10 ) : undefined;

				setFontSize( newFontSize );
			} }
			value={ fontSize.size ? `${ fontSize.size }px` : undefined }
		/>
	);
};

export default CoBlocksFontSizePicker;

CoBlocksFontSizePicker.propTypes = {
	fallbackFontSize: PropTypes.number,
	fontSize: PropTypes.shape( {
		size: PropTypes.string,
	} ),
	setFontSize: PropTypes.func,
};
