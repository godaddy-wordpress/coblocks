/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { CustomSelectControl, RangeControl, VisuallyHidden } from '@wordpress/components';
import { useCallback, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import STORE_KEY from './data/constants';

/**
 * Internal dependencies
 */
import useFontSize from './hooks/useFontSize';
import useTypeRatio from './hooks/useTypeRatio';

const DEFAULT_FONT_SIZE = 'normal';
const CUSTOM_FONT_SIZE = 'custom';

function getSelectValueFromFontSize( fontSizes, value ) {
	if ( value ) {
		const fontSizeValue = fontSizes.find(
			( font ) => font.style?.fontSize === `${ value.toFixed( 2 ) }rem`
		);
		return fontSizeValue ? fontSizeValue.key : CUSTOM_FONT_SIZE;
	}
	return DEFAULT_FONT_SIZE;
}

function getSelectOptions( baseFontSize ) {
	if ( ! baseFontSize ) {
		return [];
	}

	return [
		{
			key: 'small',
			name: __( 'Small', 'coblocks' ),
			style: { fontSize: `${ ( baseFontSize * 0.8 ).toFixed( 2 ) }rem` },
		},
		{
			key: 'normal',
			name: __( 'Normal', 'coblocks' ),
			style: { fontSize: `${ baseFontSize.toFixed( 2 ) }rem` },
		},
		{
			key: 'large',
			name: __( 'Large', 'coblocks' ),
			style: { fontSize: `${ ( baseFontSize * 1.3 ).toFixed( 2 ) }rem` },
		},
		{
			key: CUSTOM_FONT_SIZE,
			name: __( 'Custom' ),
		},
	];
}

function FontSizePicker() {
	const [ baseFontSize, designFontSize ] = useFontSize();
	const [ typeRatio, designTypeRatio ] = useTypeRatio();
	const { updateFontSize, updateTypeRatio } = useDispatch( STORE_KEY );

	const instanceId = useInstanceId( FontSizePicker );

	const options = useMemo(
		() => getSelectOptions( designFontSize ),
		[ designFontSize ]
	);

	const selectedFontSizeSlug = useMemo(
		() => getSelectValueFromFontSize( options, baseFontSize ),
		[ options, baseFontSize ]
	);

	const onChangeCallBack = useCallback( ( { selectedItem } ) => {
		const selectedValue = selectedItem?.style?.fontSize;

		if ( ! selectedValue ) {
			return;
		}

		updateFontSize( selectedValue );
	} );

	if ( ! options ) {
		return null;
	}

	const fontSizePickerNumberId = `components-font-size-picker__number#${ instanceId }`;

	return (
		<fieldset className="components-font-size-picker">
			<VisuallyHidden as="legend">{ __( 'Base size', 'coblocks' ) }</VisuallyHidden>
			<div className="components-font-size-picker__controls">
				{ baseFontSize && (
					<CustomSelectControl
						className="components-font-size-picker__select"
						label={ __( 'Font size', 'coblocks' ) }
						onChange={ onChangeCallBack }
						options={ options }
						value={ options.find(
							( option ) => option.key === selectedFontSizeSlug
						) }
					/>
				) }
				<div className="components-font-size-picker__number-container">
					<input
						aria-label={ __( 'Custom' ) }
						className="components-font-size-picker__number"
						id={ fontSizePickerNumberId }
						max={ 5 }
						min={ 0 }
						onChange={ ( event ) => {
							updateFontSize( `${ event.target.value }rem` );
						} }
						step={ 0.01 }
						type="number"
						value={ baseFontSize || '' }
					/>
				</div>
			</div>
			<div className="components-font-size-picker__heading-container">
				<RangeControl
					className="components-font-size-picker__heading-scale"
					initialPosition={ typeRatio }
					label={ __( 'Heading Scale', 'coblocks' ) }
					max={ designTypeRatio * 1.15 }
					min={ designTypeRatio * 0.9 }
					onChange={ updateTypeRatio }
					showTooltip={ false }
					step={ 0.01 }
					value={ typeRatio || '' }
					withInputField={ false }
				/>
			</div>
		</fieldset>
	);
}

export default FontSizePicker;
