/**
 * Internal dependencies
 */
import CoBlocksFieldMultiple from '../multi-field';

function CoBlocksFieldRadio( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, options, id } = attributes;

	return (
		<CoBlocksFieldMultiple
			label={ label }
			required={ required }
			options={ options }
			setAttributes={ setAttributes }
			type="radio"
			isSelected={ isSelected }
			id={ id }
		/>
	);
}

export default CoBlocksFieldRadio;
