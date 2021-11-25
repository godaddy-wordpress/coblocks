/**
 * Internal dependencies
 */
import CoBlocksField from '../field';

function CoBlocksFieldDate( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<>
			<CoBlocksField
				type="date"
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

export default CoBlocksFieldDate;
