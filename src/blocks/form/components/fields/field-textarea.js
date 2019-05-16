/**
 * Internal dependencies
 */
import CoblocksFieldLabel from './field-label';

/**
 * WordPress dependencies
 */
const { Fragment } = wp.element;
const { TextareaControl } = wp.components;

function CoblocksFieldTextarea( {
	required,
	label,
	setAttributes,
	isSelected,
} ) {
	return (
		<Fragment>
			<div className="coblocks-field">
				<CoblocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				<TextareaControl/>
			</div>
		</Fragment>
	);
}

export default CoblocksFieldTextarea;
