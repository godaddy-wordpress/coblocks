/**
 * Internal dependencies
 */
import CoBlocksField from '../field';
import LabelColorControl from '../../../../components/form-label-colors/label-color-control';

function CoBlocksFieldDate( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<>
			<LabelColorControl { ...props } />
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

export default CoBlocksFieldDate;
