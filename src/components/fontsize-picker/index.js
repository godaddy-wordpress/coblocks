
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
			onChange={ ( newFontSize ) => {
				setFontSize( parseInt( newFontSize ) ?? false );
			} }
			value={ `${ fontSize.size }px` }
		/>
	);
};

export default CoBlocksFontSizePicker;
