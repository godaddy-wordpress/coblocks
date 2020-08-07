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
];

export default class GutterControl extends Component {
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
					showCustomOption
					onChange={ ( newGutter ) => setAttributes( { gutter: newGutter } ) }>
				</OptionSelectorControl>
				{
					gutter === 'custom' &&
					<RangeControl
						step={ 0.1 }
						initialValue={ 0 }
						value={ gutterCustom }
						onChange={ ( newGutter ) => setAttributes( { gutterCustom: newGutter } ) }
						min={ 0 }
						max={ 5 }
						withInputField
					/>
				}
			</Fragment>
		);
	}
}
