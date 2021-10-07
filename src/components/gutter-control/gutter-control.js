/**
 * Internal dependencies
 */
import OptionSelectorControl from '../option-selector-control';

/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';

const gutterOptions = [
	// wpcom-custom-start
	{
		value: 'no',
		label: __( 'None', 'coblocks' ),
		tooltip: __( 'None', 'coblocks' ),
	},
	// wpcom-custom-end
	{
		value: 'small',
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
	},
	{
		value: 'medium',
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
	},
	{
		value: 'large',
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
	},
	// wpcom-custom-start
	{
		value: 'huge',
		/* translators: abbreviation for largest size */
		label: __( 'XL', 'coblocks' ),
		tooltip: __( 'Huge', 'coblocks' ),
	},
	// wpcom-custom-end
];

export default class GutterControl extends Component {
	get maxValue() {
		const { maxValue = null } = this.props;

		if ( ! maxValue ) {
			return this.props.attributes.align === 'full' ? 10 : 5;
		}

		return maxValue;
	}

	componentDidUpdate( prevProps ) {
		const {
			align,
			gutterCustom,
		} = this.props.attributes;

		if ( prevProps.attributes.align !== align && gutterCustom > this.maxValue ) {
			this.props.setAttributes( { gutterCustom: this.maxValue } );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			gutter,
			gutterCustom,
		} = attributes;

		return (
			<Fragment>
				<OptionSelectorControl
					label={ __( 'Gutter', 'coblocks' ) }
					currentOption={ gutter }
					options={ gutterOptions }
					// wpcom-disabled-start
					// showCustomOption
					// wpcom-disabled-end
					onChange={ ( newGutter ) => setAttributes( { gutter: newGutter } ) } />
				{
					gutter === 'custom' &&
					<RangeControl
						step={ 0.1 }
						initialValue={ 0 }
						value={ parseFloat( gutterCustom ) || 0 }
						onChange={ ( newGutter ) => setAttributes( { gutterCustom: newGutter.toString() } ) }
						min={ 0 }
						max={ this.maxValue }
						withInputField
					/>
				}
			</Fragment>
		);
	}
}
