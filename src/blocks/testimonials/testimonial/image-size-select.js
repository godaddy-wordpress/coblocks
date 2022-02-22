/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { DEFAULT_IMAGE_SIZE } from '.';

const ImageSizeSelect = ( props ) => {
	const {
		setAttributes,
		imageSize,
	} = props;

	const [ utilitySizes ] = useState( [
		{
			name: __( 'Small', 'coblocks' ),
			size: 50,
			slug: 'small',
		},
		{
			name: __( 'Medium', 'coblocks' ),
			size: DEFAULT_IMAGE_SIZE,
			slug: 'medium',
		},
		{
			name: __( 'Large', 'coblocks' ),
			size: 200,
			slug: 'large',
		},
	] );

	const getSelectValuesFromUtilitySizes = ( listOfSizes, value ) => {
		let selectedPreset;
		if ( typeof value === 'string' ) {
			selectedPreset = listOfSizes.find( ( choice ) => choice.slug === value );
			return selectedPreset ? selectedPreset.slug : 'custom';
		}
	};

	const setCurrentSelectValue = ( newImageSize ) => {
		setAttributes( { imageSize: newImageSize } );
	};

	const onChangeValue = ( event ) => {
		const selectedUtil = utilitySizes.find( ( util ) => util.slug === event );
		if ( selectedUtil ) {
			setAttributes( {
				imageHeight: selectedUtil.size,
				imageWidth: selectedUtil.size,
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
				label={ __( 'Choose image size preset', 'coblocks' ) }
				onChange={ onChangeValue }
				options={ getSelectOptions( utilitySizes ) }
				value={ imageSize }
			/>
		</>
	);
};

export default ImageSizeSelect;
