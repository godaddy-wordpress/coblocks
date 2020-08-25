/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

function CoBlocksFieldTextControl( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, labelColor } = attributes;

	return (
		<Fragment>
			<div className="coblocks-field">
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					labelColor={ labelColor }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextControl />
			</div>
		</Fragment>
	);
}

export default CoBlocksFieldTextControl;
