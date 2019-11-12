/**
 * Internal dependencies
 */
import CoBlocksField from '../field';

function CoBlocksFieldPhone( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label } = attributes;

	return (
		<CoBlocksField
			type="text"
			label={ label }
			required={ required }
			setAttributes={ setAttributes }
			isSelected={ isSelected }
		/>
	);
}

export default CoBlocksFieldPhone;
