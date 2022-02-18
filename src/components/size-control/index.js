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
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { BaseControl, Button, PanelRow } from '@wordpress/components';

const SizeControl = ( props ) => {
	const {
		attributes,
		onChange,
		value,
		resetValue = undefined,
		label,
		reset = true,
		setAttributes,
	} = props;
	const { align, columns } = attributes;

	useEffect( () => {
		// Prevent small and medium column grid sizes without wide or full alignments.
		if ( align === undefined ) {
			if ( columns === 'med' || columns === 'sml' ) {
				setAttributes( { gridSize: 'xlrg' } );
			}
		}
	}, [ align, columns ] );

	const { wideControlsEnabled } = useSelect( ( select ) => {
		return { wideControlsEnabled: select( 'core/editor' ).getEditorSettings()?.alignWide ?? false };
	} );

	const getSizes = () => {
		const { type } = props;

		const defaultSizes = [
			{
				label: __( 'None', 'coblocks' ),
				tooltip: __( 'None', 'coblocks' ),
				value: 'none',
			},
			{
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),
				value: 'sml',

			},
			{
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
				value: 'med',
			},
			{
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
				value: 'lrg',
			},
		];

		let standardSizes = [
			{
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
				value: 'lrg',
			},
			{
				/* translators: abbreviation for extra large size */
				label: __( 'XL', 'coblocks' ),
				tooltip: __( 'Extra Large', 'coblocks' ),
				value: 'xlrg',
			},
		];

		let wideSizes = [
			{
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
				value: 'med',
			},
		];

		let fullSizes = [
			{
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),
				value: 'sml',
			},
		];

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'smlx' === type ) {
			standardSizes = [
				{
					/* translators: abbreviation for small size */
					label: __( 'S', 'coblocks' ),
					tooltip: __( 'Small', 'coblocks' ),
					value: 'sml',
				},
				{
					/* translators: abbreviation for medium size */
					label: __( 'M', 'coblocks' ),
					tooltip: __( 'Medium', 'coblocks' ),
					value: 'med',
				},
				{
					/* translators: abbreviation for large size */
					label: __( 'L', 'coblocks' ),
					tooltip: __( 'Large', 'coblocks' ),
					value: 'lrg',
				},
				{
					/* translators: abbreviation for extra large size */
					label: __( 'XL', 'coblocks' ),
					tooltip: __( 'Extra Large', 'coblocks' ),
					value: 'xlrg',
				},
			];

			return standardSizes;
		}

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'reverse-grid' === type ) {
			standardSizes = [
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
			];

			wideSizes = [
				{
					/* translators: abbreviation for large size */
					label: __( 'L', 'coblocks' ),
					tooltip: __( 'Large', 'coblocks' ),
					value: 'large',
				},
			];

			fullSizes = [
				{
					/* translators: abbreviation for extra large size */
					label: __( 'XL', 'coblocks' ),
					tooltip: __( 'Extra Large', 'coblocks' ),
					value: 'huge',
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
	};

	return (
		<BaseControl id="coblocks-select-size" label={ label }>
			<PanelRow>
				<OptionSelectorControl
					currentOption={ value }
					onChange={ ( size ) => onChange( size ) }
					options={ getSizes() } />
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
};

export default SizeControl;

SizeControl.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
	reset: PropTypes.bool,
	resetValue: PropTypes.func,
	type: PropTypes.string,
	value: PropTypes.any,
};
