/**
 * Internal dependencies
 */
import CoBlocksField from '../field';
import LabelColorControl from '../../../../components/form-label-colors/label-color-control';
import LabelColorWrapper from '../../../../components/form-label-colors/label-color-wrapper';

function CoBlocksFieldTextarea( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label } = attributes;
	return (
		<>
			<LabelColorControl { ...props } />
			<CoBlocksField
				{ ...props }
				type="email"
			/>
		</>
	);
}

export default CoBlocksFieldTextarea;
