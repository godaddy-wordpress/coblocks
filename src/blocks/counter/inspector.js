/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Inspector( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		counterText,
		numberFormatting,
	} = attributes;

	/**
	 * @function applyInternationalFormatting Process counterText into formatting string.
	 * @param {boolean} shouldFormat Whether or not the counterText should be locale formatted.
	 * @return {string} Formatted or unformatted locale.
	 */
	const applyInternationalFormatting = ( shouldFormat ) => {
		// Should not have international formatting.
		// Remove formatting characters (.,).
		if ( ! shouldFormat ) {
			return counterText.replace( /\d+(\.*\,*)\d+/g, ( match, group ) => {
				return match.replace( group, '' );
			} );
		}
		// Get navigator language string within array.
		const formatLocale = Array.isArray( navigator.language ) ? [ navigator.language[ 0 ] ] : [ navigator.language ];
		// Include array with this fallback value incase of unsupported language.
		formatLocale.push( 'en-US' );
		// Replacer callback formats number matches and returns all other matches.
		const formattedCounterText = counterText.replace( /\d*/g, ( match ) => {
			if ( ! parseInt( match ) ) {
				return match;
			}
			return new Intl.NumberFormat( formatLocale ).format( match );
		} );
		return formattedCounterText;
	};

	useEffect( () => {
		if ( ! counterText?.length ) {
			return;
		}
		// We either apply international formatting or remove formatting from numbers depending on numberFormatting attribute.
		const formattedCounterText = applyInternationalFormatting( numberFormatting );
		if ( formattedCounterText !== counterText ) {
			setAttributes( { counterText: formattedCounterText } );
		}
	}, [ numberFormatting ] );

	useEffect( () => {
		if ( ! counterText?.length ) {
			return;
		}
		// Trailing periods like for sentence punctuation are triggered as empty decimals by counterup2.
		// To resolve superfluous counter digits appearing around periods we remove the punctuation.
		const counterTextWithoutPeriod = counterText.replace( /\w+(\.+)/g, ( match, group ) => {
			return match.replace( group, '' );
		} );
		if ( counterTextWithoutPeriod !== counterText ) {
			setAttributes( { counterText: counterTextWithoutPeriod } );
		}
	}, [ counterText ] );

	const getFormattingHelp = ( checked ) => {
		return checked ? __( 'Number is locale formatted.', 'coblocks' ) : __( 'Number without locale formatting.', 'coblocks' );
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

			</PanelBody>
		</InspectorControls>
	);
}
