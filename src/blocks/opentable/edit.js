/* global coblocksBlockData */

/**
 * External dependencies
 */
import { OpentableIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import Controls from './controls';
import OpenTable from './opentable';
import InspectorControls from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import {
	Placeholder,
	Notice,
	Button,
	withNotices,
	Icon,
	FormTokenField,
} from '@wordpress/components';

const Edit = ( props ) => {
	const [ ridField, setRidField ] = useState( [] );
	const [ queryResults, setQueryResults ] = useState( [] );
	const { className, attributes } = props;
	const [ noResultsFound, setNoResultsFound ] = useState( false );
	const [ isEditing, setIsEditing ] = useState( ! attributes.restaurantIDs.length );

	const prevIDs = usePrevious( attributes.restaurantIDs );

	const getLocaleCode = () => {
		if ( typeof coblocksBlockData.localeCode !== 'undefined' ) {
			return coblocksBlockData.localeCode;
		}
		return '';
	};

	//searches the opentable reservation network for restaurants with the given name or ID
	//TODO: 400/500 error handling and show loading spinner
	const searchRestaurants = useCallback( debounce( ( token ) => {
		fetch(
			'https://www.opentable.com/widget/reservation/restaurant-search?pageSize=15' +
				'&query=' +
				encodeURIComponent( token )
		)
			.then( ( response ) => response.json() )
			.catch( () => {
				setNoResultsFound( true );
			} )
			.then( ( json ) => {
				const results = [];
				for ( const item in json.items ) {
					const itemProps = json.items[ item ];
					const name = `${ decodeURIComponent( itemProps.name ) },  ${ decodeURIComponent( itemProps.addressResponse.city ) }, ${ decodeURIComponent( itemProps.addressResponse.country ) } (${ itemProps.rid })`;
					results.push( name );
				}
				setQueryResults( results );
				setNoResultsFound( results?.length === 0 );
			} );
	}, 400 ), [] );

	useEffect( () => {
		if ( prevIDs !== attributes.restaurantIDs ) {
			const restaurantNames = attributes.restaurantIDs.map( ( restaurantObject ) => restaurantObject.name );
			setRidField( restaurantNames );
		}
	}, [] );

	useEffect( () => {
		if ( attributes.language === '' ) {
			switch ( getLocaleCode().substring( 0, coblocksBlockData.localeCode.indexOf( '_' ) ) ) {
				case 'fr':
					props.setAttributes( { language: 'fr-CA' } );
					break;
				case 'de':
					props.setAttributes( { language: 'de-DE' } );
					break;
				case 'es':
					props.setAttributes( { language: 'es-MX' } );
					break;
				case 'ja':
					props.setAttributes( { language: 'ja-JP' } );
					break;
				case 'nl':
					props.setAttributes( { language: 'nl-NL' } );
					break;
				case 'it':
					props.setAttributes( { language: 'it-IT' } );
					break;
				default:
					props.setAttributes( { language: 'en-US' } );
					break;
			}
		}
	}, [] );

	return (
		<>
			<Controls
				isEditing={ isEditing }
				setIsEditing={ setIsEditing }
				{ ...props } />
			<InspectorControls
				className={ className }
				attributes={ attributes }
				setAttributes={ props.setAttributes }
			/>
			<div className={ className }>

				{ ( isEditing ) ? (
					<Placeholder
						icon={ <Icon icon={ icon } /> }
						label={ __( 'OpenTable', 'coblocks' ) }
						instructions={ __(
							'Select your OpenTable restaurant(s) to show the reservations widget.',
							'coblocks'
						) }
						isColumnLayout={ true }
					>

						{ /* <form onSubmit={ renderOpenTable }> */ }
						<div className="components-placeholder__flex-fields">
							<FormTokenField
								value={ ridField || '' }
								suggestions={ queryResults }
								className="components-placeholder__input"
								placeholder={ __(
									'Select restaurant(s)',
									'coblocks'
								) }
								maxSuggestions={ 15 }
								onChange={ ( newRestaurantIDs ) => {
									setRidField( newRestaurantIDs );
								} }
								onInputChange={ ( token ) => {
									searchRestaurants( token );
								} }
								__experimentalHowTo={ false }
								tokenizeOnSpace={ false }
							/>
							<Button
								isPrimary={ !! ridField }
								isSecondary={ ! ridField }
								type="submit"
								disabled={ ridField.length < 1 }
								onClick={ () => {
									const parsedRestaurants = [];
									for ( const index in ridField ) {
										const restaurantString = ridField[ index ];
										parsedRestaurants.push( {
											name: restaurantString,
											rid: restaurantString.substring( restaurantString.lastIndexOf( '(' ) + 1, restaurantString.length - 1 ),
										} );
									}
									props.setAttributes( { restaurantIDs: parsedRestaurants, pinned: true } );
									setIsEditing( false );
								} }
							>
								{ __( 'Save', 'coblocks' ) }
							</Button>
						</div>
						{ /* </form> */ }
						{ noResultsFound && <Notice isDismissible={ false }>No results found.</Notice> }
						<div></div>
						<div className="components-placeholder__opentable-help-links">
							<a target="_blank" rel="noopener noreferrer" href="https://restaurant.opentable.com/get-started/">{ __( 'Sign up for OpenTable', 'coblocks' ) }</a>
						</div>

					</Placeholder>
				)
					: <>
						<div
							style={ { width: '100%', height: '100%', position: 'absolute' } }
						/>
						<OpenTable { ...props } />
					</>
				}
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
