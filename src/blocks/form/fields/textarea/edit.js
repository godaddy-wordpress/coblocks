/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { TextareaControl } from '@wordpress/components';

function CoBlocksFieldTextarea( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<>
			<div className="coblocks-field">
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					name={ name }
					textColor={ textColor }
					customTextColor={ customTextColor }
				/>
				<TextareaControl />
			</div>
		</>
	);
}

export default CoBlocksFieldTextarea;
