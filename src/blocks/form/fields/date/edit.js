/**
 * Internal dependencies
 */
import CoBlocksField from '../field';

function CoBlocksFieldDate( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, labelsAsPlaceholders } = attributes;

	return (
		<CoBlocksField
			type="text"
			label={ label }
			required={ required }
			setAttributes={ setAttributes }
			isSelected={ isSelected }
			labelsAsPlaceholders={ labelsAsPlaceholders }
		/>
	);
}

export default CoBlocksFieldDate;
