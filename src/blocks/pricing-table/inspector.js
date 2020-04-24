/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			count,
			gutter,
		} = attributes;

		const gutterOptions = [
			{
				value: 'no',
				label: __( 'None', 'coblocks' ),
				shortName: __( 'None', 'coblocks' ),
			},
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
			{
				value: 'huge',
				/* translators: abbreviation for largest size */
				label: __( 'XL', 'coblocks' ),
				tooltip: __( 'Huge', 'coblocks' ),
			},
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Pricing Table settings', 'coblocks' ) }>
						{ count > 1 && <OptionSelectorControl
							label={ __( 'Gutter', 'coblocks' ) }
							currentOption={ gutter }
							options={ gutterOptions }
							onChange={ ( newGutter ) => setAttributes( { gutter: newGutter } ) }
						/> }
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
