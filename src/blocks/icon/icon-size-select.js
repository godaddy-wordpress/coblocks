/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { DEFAULT_ICON_SIZE } from '.';

const IconSizeSelect = ( props ) => {
	const {
		padding,
		setAttributes,
		iconSize,
	} = props;

	const [ utilitySizes ] = useState( [
		{
			name: __( 'Small', 'coblocks' ),
			size: 40,
			slug: 'small',
		},
		{
			name: __( 'Medium', 'coblocks' ),
			size: padding ? DEFAULT_ICON_SIZE + 28 : DEFAULT_ICON_SIZE,
			slug: 'medium',
		},
		{
			name: __( 'Large', 'coblocks' ),
			size: 120,
			slug: 'large',
		}, {
			name: __( 'Huge', 'coblocks' ),
			size: 200,
			slug: 'huge',
		},
	] );

	const getSelectValuesFromUtilitySizes = ( listOfSizes, value ) => {
		let selectedPreset;
		if ( typeof value === 'string' ) {
			selectedPreset = listOfSizes.find( ( choice ) => choice.slug === value );
			return selectedPreset ? selectedPreset.slug : 'custom';
		}
	};

	const setCurrentSelectValue = ( newIconSize ) => {
		setAttributes( { iconSize: newIconSize } );
	};

	const onChangeValue = ( event ) => {
		const selectedUtil = utilitySizes.find( ( util ) => util.slug === event );
		if ( selectedUtil ) {
			setAttributes( {
				height: selectedUtil.size,
				width: selectedUtil.size,
			} );
			setCurrentSelectValue(
				getSelectValuesFromUtilitySizes( utilitySizes, selectedUtil.slug )
			);
		}
	};

	const getSelectOptions = ( optionsArray ) => {
		return [
			...optionsArray.map( ( option ) => ( {
				label: option.name,
				value: option.slug,
			} ) ),
		];
	};

	return (
		<>
			<SelectControl
				hideLabelFromVision={ true }
				label={ __( 'Choose icon size preset', 'coblocks' ) }
				onChange={ onChangeValue }
				options={ getSelectOptions( utilitySizes ) }
				value={ iconSize }
			/>
		</>
	);
};

export default IconSizeSelect;
