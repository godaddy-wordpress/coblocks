/**
 * Internal dependencies
 */
import CoBlocksField from '../field';

function CoBlocksFieldPhone( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<>
			<CoBlocksField
				type="text"
				label={ label }
				required={ required }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				textColor={ textColor }
				customTextColor={ customTextColor }
				name={ name }
			/>
		</>
	);
}

export default CoBlocksFieldPhone;
