
/**
 * WordPress dependencies
 */
import { FontSizePicker } from '@wordpress/block-editor';

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
			value={ fontSize.size }
			onChange={ ( value ) => {
				const fontSizeValue = value ? parseInt( value, 10 ) : undefined;

				if ( ! Number.isNaN( fontSizeValue ) ) {
					setFontSize( fontSizeValue );
				}
			} }
		/>
	);
};

export default CoBlocksFontSizePicker;
