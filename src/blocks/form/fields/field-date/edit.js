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
				customTextColor={ customTextColor }
				isSelected={ isSelected }
				label={ label }
				name={ name }
				required={ required }
				setAttributes={ setAttributes }
				textColor={ textColor }
				type="date"
			/>
		</>
	);
}

export default CoBlocksFieldDate;
