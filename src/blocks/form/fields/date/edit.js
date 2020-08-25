/**
 * Internal dependencies
 */
import CoBlocksField from '../field';

function CoBlocksFieldDate( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, labelColor } = attributes;

	return (
		<CoBlocksField
			type="text"
			label={ label }
			labelColor={ labelColor }
			required={ required }
			setAttributes={ setAttributes }
			isSelected={ isSelected }
		/>
	);
}

export default CoBlocksFieldDate;
