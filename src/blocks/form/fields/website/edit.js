/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';
import LabelColorControl from '../../../../components/form-label-colors/label-color-control';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

function CoBlocksFieldWebsite( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<Fragment>
			<LabelColorControl { ...props } />
			<CoBlocksFieldLabel
				required={ required }
				label={ label }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				name={ name }
				textColor={ textColor }
				customTextColor={ customTextColor }
			/>
			<TextControl
				type="url"
			/>
		</Fragment>
	);
}

export default CoBlocksFieldWebsite;
