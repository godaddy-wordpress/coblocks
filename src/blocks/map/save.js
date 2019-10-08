import { __ } from '@wordpress/i18n';

function Save( { attributes } ) {
	const {
		address,
		height,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
		hasApiKey,
	} = attributes;

	const backgroundStyles = {
		minHeight: height ? height + 'px' : undefined,
	};

	const mapAttributes = {
		address,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
	};

	const userLocale = () => {
		let locale = $( '[class*="locale-"]' ).attr( 'class' ).split( 'locale-' )[ 1 ].split( ' ' )[ 0 ];
		switch ( locale.toLowerCase() ) {
			case 'en-au':
				locale = 'en-AU';
				break;
			case 'en-gb':
				locale = 'en-GB';
				break;
			case 'pt-br':
				locale = 'pt-BR';
				break;
			case 'pt-pt':
				locale = 'pt-PT';
				break;
			case 'zh-tw':
				locale = 'zh-TW';
				break;
			case 'zh-ch':
				locale = 'zh-CN';
				break;
			case 'fr-ca':
				locale = 'fr-CA';
				break;
			default:
				locale = locale.split( '-' )[ 0 ];
				break;
		}
		return locale;
	};

	const attr = Object
		.keys( mapAttributes )
		.map( key => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
		.join( '||' );

	const dataMap = { 'data-map-attr': attr };

	return (
		<div style={ backgroundStyles } { ...dataMap } >
			{
				! hasApiKey &&
				<iframe
					title={ __( 'Google Map' ) }
					frameBorder="0"
					style={ { width: '100%', minHeight: height + 'px' } }
					src={ 'https://www.google.com/maps?q=' + encodeURIComponent( address ) + `&output=embed&hl=${ userLocale() }&z=` + zoom }
				/>
			}
		</div>
	);
}

export default Save;
