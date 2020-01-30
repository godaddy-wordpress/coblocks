/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

function CoBlocksFieldWebsite( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, labelsAsPlaceholders } = attributes;

	return (
		<Fragment>
			<CoBlocksFieldLabel
				required={ required }
				label={ label }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				labelsAsPlaceholders={ labelsAsPlaceholders }
			/>
			<TextControl
				type="url"
				placeholder={ labelsAsPlaceholders ? label : '' }
			/>
		</Fragment>
	);
}

export default CoBlocksFieldWebsite;
