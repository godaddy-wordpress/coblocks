/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

export default function Inspector( props ) {
	const {
		attributes,
		setAttributes,
		hasIconShowing,
		processIcon,
	} = props;

	const {
		align,
		counterDescription,
		counterText,
		numberFormatting,
		counterSpeed,
	} = attributes;

	/**
	 * @function applyInternationalFormatting Process transformText into formatting string.
	 * @param {string}  transformText Represents strings from `counterDescription` and `counterText` attributes.
	 * @param {boolean} shouldFormat  Whether or not the transformText should be locale formatted.
	 * @return {string} Formatted or unformatted locale.
	 */
	const applyInternationalFormatting = ( transformText, shouldFormat ) => {
		// Should not have international formatting.
		// Remove formatting characters (.,).
		if ( ! shouldFormat ) {
			return transformText.replace( /\d+(\.*\,*)\d+/g, ( match, group ) => {
				return match.replace( group, '' );
			} );
		}
		// Get navigator language string within array.
		const formatLocale = Array.isArray( navigator.language ) ? [ navigator.language[ 0 ] ] : [ navigator.language ];
		// Include array with this fallback value incase of unsupported language.
		formatLocale.push( 'en-US' );
		// Replacer callback formats number matches and returns all other matches.
		const formattedTransformText = transformText.replace( /\d*/g, ( match ) => {
			if ( ! parseInt( match ) ) {
				return match;
			}
			return new Intl.NumberFormat( formatLocale ).format( match );
		} );
		return formattedTransformText;
	};

	useEffect( () => {
		if ( ! counterText?.length ) {
			return;
		}
		// We either apply international formatting or remove formatting from numbers depending on numberFormatting attribute.
		const formattedCounterText = applyInternationalFormatting( counterText, numberFormatting );
		if ( formattedCounterText !== counterText ) {
			setAttributes( { counterText: formattedCounterText } );
		}
		// Trailing periods like for sentence punctuation are triggered as empty decimals by counterup2.
		// To resolve superfluous counter digits appearing around periods we remove the punctuation.
		const counterTextWithoutPeriod = counterText.replace( /\w+(\.+)/g, ( match, group ) => match.replace( group, '' ) );
		if ( counterTextWithoutPeriod !== counterText ) {
			setAttributes( { counterText: counterTextWithoutPeriod } );
		}
	}, [ numberFormatting, counterText ] );

	useEffect( () => {
		if ( ! counterDescription?.length ) {
			return;
		}
		// We either apply international formatting or remove formatting from numbers depending on numberFormatting attribute.
		const formattedCounterDescription = applyInternationalFormatting( counterDescription, numberFormatting );
		if ( formattedCounterDescription !== counterDescription ) {
			setAttributes( { counterDescription: formattedCounterDescription } );
		}
		// Trailing periods like for sentence punctuation are triggered as empty decimals by counterup2.
		// To resolve superfluous counter digits appearing around periods we remove the punctuation.
		const counterDescriptionWithoutPeriod = counterDescription.replace( /\w+(\.+)/g, ( match, group ) => match.replace( group, '' ) );
		if ( counterDescriptionWithoutPeriod !== counterDescription ) {
			setAttributes( { counterDescription: counterDescriptionWithoutPeriod } );
		}
	}, [ numberFormatting, counterDescription ] );

	const getFormattingHelp = ( checked ) => {
		return checked ? __( 'Number is locale formatted.', 'coblocks' ) : __( 'Number without locale formatting.', 'coblocks' );
	};

	const getIconHelp = ( checked ) => {
		return checked ? __( 'Icon block precedes the Counter block.', 'coblocks' ) : __( 'No Icon block preceding the Counter block.', 'coblocks' );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Counter settings', 'coblocks' ) }>

				<ToggleControl
					checked={ !! numberFormatting }
					help={ getFormattingHelp }
					label={ __( 'Locale number formatting', 'coblocks' ) }
					onChange={ () => setAttributes( { numberFormatting: ! numberFormatting } ) }
				/>

				<ToggleControl
					checked={ !! hasIconShowing }
					help={ getIconHelp }
					label={ __( 'Show Icon Block', 'coblocks' ) }
					onChange={ ( value ) => processIcon( value, align ) }
				/>

				<RangeControl
					initialValue={ counterSpeed }
					label={ __( 'Seconds until counter completes', 'coblocks' ) }
					max={ 10 }
					min={ 1 }
					onChange={ ( newCounterSpeed ) => setAttributes( { counterSpeed: newCounterSpeed } ) }
					step={ 1 }
					value={ counterSpeed }
					withInputField
				/>

			</PanelBody>
		</InspectorControls>
	);
}
