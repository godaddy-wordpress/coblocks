/**
 * Internal dependencies
 */
import CoBlocksFieldMultiple from './multi-field';

export const editMultiField = type => props => {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, options } = attributes;

	return (
		<CoBlocksFieldMultiple
			label={ label }
			required={ required }
			options={ options }
			setAttributes={ setAttributes }
			type={ type }
			isSelected={ isSelected }
		/>
	);
};
