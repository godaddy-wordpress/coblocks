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
	const { required, label, labelColor } = attributes;

	return (
		<Fragment>
			<CoBlocksFieldLabel
				required={ required }
				label={ label }
				labelColor={ labelColor }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
			/>
			<TextControl
				type="url"
			/>
		</Fragment>
	);
}

export default CoBlocksFieldWebsite;
