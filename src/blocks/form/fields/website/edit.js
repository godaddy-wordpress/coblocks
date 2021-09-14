/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';

function CoBlocksFieldWebsite( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<>
			<CoBlocksFieldLabel
				required={ required }
				label={ label }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				name={ name }
				textColor={ textColor }
				customTextColor={ customTextColor }
			/>
			<TextControl
				type="url"
			/>
		</>
	);
}

export default CoBlocksFieldWebsite;
