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
import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { BaseControl, Button, PanelRow } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

class SizeControl extends Component {
	constructor() {
		super( ...arguments );
		this.getSizes = this.getSizes.bind( this );
	}

	componentDidUpdate() {
		const { align, columns } = this.props.attributes;

		// Prevent small and medium column grid sizes without wide or full alignments.
		if ( align === undefined ) {
			if ( columns === 'med' || columns === 'sml' ) {
				this.props.setAttributes( {
					gridSize: 'xlrg',
				} );
			}
		}
	}

	getSizes() {
		const { type, wideControlsEnabled } = this.props;
		const { align } = this.props.attributes;

		const defaultSizes = [
			{
				value: 'none',
				label: __( 'None', 'coblocks' ),
				tooltip: __( 'None', 'coblocks' ),
			},
			{
				value: 'sml',
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),

			},
			{
				value: 'med',
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
			},
			{
				value: 'lrg',
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
			},
		];

		let standardSizes = [
			{
				value: 'lrg',
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
			},
			{
				value: 'xlrg',
				/* translators: abbreviation for extra large size */
				label: __( 'XL', 'coblocks' ),
				tooltip: __( 'Extra Large', 'coblocks' ),
			},
		];

		let wideSizes = [
			{
				value: 'med',
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
			},
		];

		let fullSizes = [
			{
				value: 'sml',
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),
			},
		];

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'smlx' === type ) {
			standardSizes = [
				{
					value: 'sml',
					/* translators: abbreviation for small size */
					label: __( 'S', 'coblocks' ),
					tooltip: __( 'Small', 'coblocks' ),
				},
				{
					value: 'med',
					/* translators: abbreviation for medium size */
					label: __( 'M', 'coblocks' ),
					tooltip: __( 'Medium', 'coblocks' ),
				},
				{
					value: 'lrg',
					/* translators: abbreviation for large size */
					label: __( 'L', 'coblocks' ),
					tooltip: __( 'Large', 'coblocks' ),
				},
				{
					value: 'xlrg',
					/* translators: abbreviation for extra large size */
					label: __( 'XL', 'coblocks' ),
					tooltip: __( 'Extra Large', 'coblocks' ),
				},
			];

			return standardSizes;
		}

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'reverse-grid' === type ) {
			standardSizes = [
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
			];

			wideSizes = [
				{
					value: 'large',
					/* translators: abbreviation for large size */
					label: __( 'L', 'coblocks' ),
					tooltip: __( 'Large', 'coblocks' ),
				},
			];

			fullSizes = [
				{
					value: 'huge',
					/* translators: abbreviation for extra large size */
					label: __( 'XL', 'coblocks' ),
					tooltip: __( 'Extra Large', 'coblocks' ),
				},
			];

			if ( 'wide' === align ) {
				return standardSizes.concat( wideSizes );
			} else if ( 'full' === align ) {
				return standardSizes.concat( wideSizes ).concat( fullSizes );
			}
			return standardSizes;
		}

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'grid' !== type ) {
			return defaultSizes;
		}

		if ( wideControlsEnabled === true && 'wide' === align ) {
			return wideSizes.concat( standardSizes );
		} else if ( wideControlsEnabled === true && 'full' === align ) {
			return fullSizes.concat( wideSizes ).concat( standardSizes );
		}
		return standardSizes;
	}

	render() {
		const {
			onChange,
			value,
			resetValue = undefined,
			label,
			reset = true,
		} = this.props;

		return (
			<BaseControl id="coblocks-select-size" label={ label }>
				<PanelRow>
					<OptionSelectorControl
						currentOption={ value }
						onChange={ ( size ) => onChange( size ) }
						options={ this.getSizes() } />
					{ reset &&
						<Button
							isSecondary
							isSmall
							onClick={ () => onChange( resetValue ) }
						>
							{ __( 'Reset', 'coblocks' ) }
						</Button>
					}
				</PanelRow>
			</BaseControl>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
] )( SizeControl );

SizeControl.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.any,
	resetValue: PropTypes.func,
	label: PropTypes.string,
	reset: PropTypes.bool,
};
