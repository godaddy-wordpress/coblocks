/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import OptionSelectorControl from '../option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

const gutterOptions = [
	{
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
		value: 'small',
	},
	{
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
		value: 'medium',
	},
	{
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
		value: 'large',
	},
];

const GutterControl = ( props ) => {
	const { attributes, setAttributes } = props;
	const { align, gutter, gutterCustom } = attributes;

	const maxValue = align === 'full' ? 10 : 5;

	useEffect( () => {
		if ( gutterCustom > maxValue ) {
			setAttributes( { gutterCustom: maxValue } );
		}
	}, [ gutterCustom, maxValue ] );

	return (
		<>
			<OptionSelectorControl
				currentOption={ gutter }
				label={ __( 'Gutter', 'coblocks' ) }
				onChange={ ( newGutter ) => setAttributes( { gutter: newGutter } ) }
				options={ gutterOptions }
				showCustomOption />
			{
				gutter === 'custom' &&
					<RangeControl
						initialValue={ 0 }
						max={ maxValue }
						min={ 0 }
						onChange={ ( newGutter ) => setAttributes( { gutterCustom: newGutter.toString() } ) }
						step={ 0.1 }
						value={ parseFloat( gutterCustom ) || 0 }
						withInputField
					/>
			}
		</>
	);
};

export default GutterControl;

GutterControl.propTypes = {
	attributes: PropTypes.object,
	setAttributes: PropTypes.func,
};
