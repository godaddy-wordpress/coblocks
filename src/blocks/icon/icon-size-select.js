/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {	SelectControl } from '@wordpress/components';

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
			setAttributes( { width: selectedUtil.size, height: selectedUtil.size } );
			setCurrentSelectValue(
				getSelectValuesFromUtilitySizes( utilitySizes, selectedUtil.slug )
			);
		}
	};

	const getSelectOptions = ( optionsArray ) => {
		return [
			...optionsArray.map( ( option ) => ( {
				value: option.slug,
				label: option.name,
			} ) ),
		];
	};

	return (
		<>
			<SelectControl
				label={ __( 'Choose icon size preset', 'coblocks' ) }
				hideLabelFromVision={ true }
				value={ iconSize }
				onChange={ onChangeValue }
				options={ getSelectOptions( utilitySizes ) }
			/>
		</>
	);
};

export default IconSizeSelect;
