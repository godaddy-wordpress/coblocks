/**
 * Internal dependencies
 */
import CoBlocksFieldMultiple from '../multi-field';

function CoBlocksFieldRadio( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, options } = attributes;

	return (
		<CoBlocksFieldMultiple
			label={ label }
			required={ required }
			options={ options }
			setAttributes={ setAttributes }
			type="radio"
			isSelected={ isSelected }
		/>
	);
}

export default CoBlocksFieldRadio;
