/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { CustomSelectControl, RangeControl, VisuallyHidden } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import useFontSize from './hooks/useFontSize';
import useTypeRatio from './hooks/useTypeRatio';
import STORE_KEY from './data/constants';
import useFonts from './hooks/useFonts';

const options = ( fonts ) =>
	fonts.flat()
		.sort()
		.filter( ( font, index, self ) => self.findIndex( ( e ) => e[ 0 ] === font[ 0 ] ) === index )
		.map(
			( font ) => ( {
				key: font[ 0 ],
				name: font[ 0 ],
				style: { fontFamily: font[ 0 ] },
				weights: font[ 1 ],
				weightsOptions: font[ 1 ].map( ( weight ) => ( {
					key: weight,
					name: weight,
					style: { fontWeight: weight, fontFamily: font[ 0 ] },
				} ) ),
			} ) );

function FontAdvanced( props ) {
	const [ baseFontSize, designFontSize ] = useFontSize();
	const [ typeRatio, designTypeRatio ] = useTypeRatio();
	const [ fonts, currentFonts ] = useFonts();
	const { updateFontSize, updateTypeRatio, updateSelectedFonts } = useDispatch( STORE_KEY );
	const fontsOptions = useMemo( () => options( fonts ), [ fonts ] );

	const [ headingFontName, headingWeights ] = currentFonts[ 0 ];
	const [ bodyFontName, bodyWeights ] = currentFonts[ 1 ];
	const currentHeadingFont = fontsOptions.find( ( option ) => option.key === headingFontName );
	const currentHeadingWeight = currentHeadingFont.weightsOptions.find( ( option ) => option.key === headingWeights[ 0 ] );
	const currentBodyFont = fontsOptions.find( ( option ) => option.key === bodyFontName );
	const currentBodyWeight = currentBodyFont.weightsOptions.find( ( option ) => option.key === bodyWeights[ 0 ] );

	const {
		onClose,
	} = props;

	return (
		<div className="components-site-design__custom">
			<strong>{ __( 'Custom Font Options', 'coblocks' ) }</strong>
			<button
				className="components-site-design__custom__dismiss"
				onClick={ onClose }>
				<span>Dismiss custom color</span>
			</button>
			<fieldset className="components-site-design__custom__body">
				<strong>{ __( 'HEADING', 'coblocks' ) }</strong>
				<CustomSelectControl
					label={ __( 'Font', 'coblocks' ) }
					onChange={ ( { selectedItem } ) =>
						updateSelectedFonts( [
							[
								selectedItem.key,
								selectedItem.weights,
							],
							currentFonts[ 1 ],
						] ) }
					options={ fontsOptions }
					value={ currentHeadingFont }
				/>
				<CustomSelectControl
					label={ __( 'Weight', 'coblocks' ) }
					onChange={ ( { selectedItem } ) =>
						updateSelectedFonts( [
							[
								headingFontName,
								[ selectedItem.key ],
							],
							currentFonts[ 1 ],
						] ) }
					options={ currentHeadingFont.weightsOptions }
					value={ currentHeadingWeight }
				/>
				<RangeControl
					initialPosition={ typeRatio }
					label={ __( 'Size', 'coblocks' ) }
					max={ designTypeRatio * 1.15 }
					min={ designTypeRatio * 0.9 }
					onChange={ updateTypeRatio }
					showTooltip={ false }
					step={ 0.01 }
					value={ typeRatio || '' }
					withInputField={ false }
				/>
			</fieldset>
			<hr className="components-site-design-fonts__advanced__separator" />
			<fieldset className="components-site-design-fonts__advanced__heading">
				<VisuallyHidden as="legend">{ __( 'Heading font size', 'coblocks' ) }</VisuallyHidden>
				<strong>{ __( 'BODY', 'coblocks' ) }</strong>
				<CustomSelectControl
					label={ __( 'Font', 'coblocks' ) }
					onChange={ ( { selectedItem } ) =>
						updateSelectedFonts( [
							currentFonts[ 0 ],
							[
								selectedItem.key,
								selectedItem.weights,
							],
						] ) }
					options={ fontsOptions }
					style={ { fontFamily: currentBodyFont.key } }
					value={ currentBodyFont }
				/>
				<CustomSelectControl
					label={ __( 'Weight', 'coblocks' ) }
					onChange={ ( { selectedItem } ) =>
						updateSelectedFonts( [
							currentFonts[ 0 ],
							[
								bodyFontName,
								[ selectedItem.key ],
							],
						] ) }
					options={ currentBodyFont.weightsOptions }
					value={ currentBodyWeight }
				/>
				<RangeControl
					initialPosition={ 0 }
					label={ __( 'Size', 'coblocks' ) }
					max={ ( designFontSize * 2 ).toFixed( 2 ) }
					min={ ( designFontSize * 0.8 ).toFixed( 2 ) }
					onChange={ ( size ) => updateFontSize( `${ size }rem` ) }
					showTooltip={ false }
					step={ 0.01 }
					value={ baseFontSize }
					withInputField={ false }
				/>
			</fieldset>
		</div>
	);
}

export default FontAdvanced;
