/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

function CoBlocksFieldTextarea( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label } = attributes;

	return (
		<Fragment>
			<div className="coblocks-field">
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextareaControl />
			</div>
		</Fragment>
	);
}

export default CoBlocksFieldTextarea;
