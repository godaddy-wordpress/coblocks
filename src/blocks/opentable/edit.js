/* global coblocksBlockData, coblocksOpentable */

/**
 * External dependencies
 */
import { debounce } from 'lodash';
import { OpentableIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Controls from './controls';
import InspectorControls from './inspector';
import OpenTable from './opentable';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import {
	Button,
	FormTokenField,
	Icon,
	Notice,
	Placeholder,
	Spinner,
	withNotices,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const Edit = ( props ) => {
	const { className, attributes, noticeUI, noticeOperations, setAttributes } = props;

	const [ ridField, setRidField ] = useState( attributes.restaurantIDs?.map( ( restaurantObject ) => restaurantObject.name ) ?? [] );
	const [ queryResults, setQueryResults ] = useState( [] );
	const [ noResultsFound, setNoResultsFound ] = useState( false );
	const [ isEditing, setIsEditing ] = useState( ! attributes.restaurantIDs.length );
	const [ isLoading, setIsLoading ] = useState( false );

	const getLocaleCode = () => {
		if ( typeof coblocksBlockData.localeCode !== 'undefined' ) {
			return coblocksBlockData.localeCode;
		}
		return '';
	};

	//searches the opentable reservation network for restaurants with the given name or ID
	const searchRestaurants = debounce( ( token ) => {
		if ( ! token ) {
			return;
		}

		setIsLoading( true );
		noticeOperations.removeAllNotices();
		apiFetch( { path: coblocksOpentable.searchProxy + encodeURIComponent( token ) } )
			.then( ( json ) => {
				const results = [];
				for ( const item in json.items ) {
					const itemProps = json.items[ item ];
					const name = `${ decodeURIComponent( itemProps.name ) },  ${ decodeURIComponent( itemProps.addressResponse.city ) }, ${ decodeURIComponent( itemProps.addressResponse.country ) } (${ itemProps.rid })`;
					results.push( name );
				}
				setQueryResults( results );
				setNoResultsFound( results?.length === 0 );
				setIsLoading( false );
			} )
			.catch( ( error ) => {
				setIsLoading( false );
				noticeOperations.createErrorNotice( __( 'Error connecting to the OpenTable API. Please try again later.', 'coblocks' ) );
				throw new Error( 'Error connecting to the OpenTable API: ' + error );
			} );
	}, 500 );

	useEffect( () => {
		if ( attributes.language === '' ) {
			switch ( getLocaleCode().substring( 0, coblocksBlockData.localeCode.indexOf( '_' ) ) ) {
				case 'fr':
					setAttributes( { language: 'fr-CA' } );
					break;
				case 'de':
					setAttributes( { language: 'de-DE' } );
					break;
				case 'es':
					setAttributes( { language: 'es-MX' } );
					break;
				case 'ja':
					setAttributes( { language: 'ja-JP' } );
					break;
				case 'nl':
					setAttributes( { language: 'nl-NL' } );
					break;
				case 'it':
					setAttributes( { language: 'it-IT' } );
					break;
				default:
					setAttributes( { language: 'en-US' } );
					break;
			}
		}
	}, [] );

	return (
		<>
			<Controls
				isEditing={ isEditing }
				setIsEditing={ setIsEditing }
				showEditControls={ !! attributes.restaurantIDs.length }
			/>
			<InspectorControls
				attributes={ attributes }
				className={ className }
				setAttributes={ setAttributes }
			/>
			<div className={ className }>

				{ ( isEditing ) ? (
					<Placeholder
						icon={ <Icon icon={ icon } /> }
						instructions={ __(
							'Select your OpenTable restaurant(s) to show the reservations widget.',
							'coblocks'
						) }
						isColumnLayout={ true }
						label={ __( 'OpenTable', 'coblocks' ) }
						notices={
							noticeUI
						}
					>

						<div className="components-placeholder__flex-fields">
							<div className="components-placeholder__flex-fields-vertical-group">
								<FormTokenField
									__experimentalHowTo={ false }
									className="components-placeholder__input"
									maxSuggestions={ 15 }
									onChange={ setRidField }
									onInputChange={ searchRestaurants }
									placeholder={ __( 'Select restaurant(s)', 'coblocks' ) }
									suggestions={ queryResults }
									tokenizeOnSpace={ false }
									value={ ridField || '' }
								/>
								<Button
									disabled={ ridField.length < 1 }
									isPrimary
									onClick={ () => {
										const parsedRestaurants = [];
										for ( const index in ridField ) {
											const restaurantString = ridField[ index ];
											parsedRestaurants.push( {
												name: restaurantString,
												rid: restaurantString.substring( restaurantString.lastIndexOf( '(' ) + 1, restaurantString.length - 1 ),
											} );
										}
										setAttributes( { restaurantIDs: parsedRestaurants } );
										setIsEditing( false );
									} }
									type="submit"
								>
									{ __( 'Save', 'coblocks' ) }
								</Button>
							</div>
							{ isLoading && <Spinner /> }
						</div>
						{ noResultsFound && <Notice isDismissible={ false }>No results found.</Notice> }
						<div></div>
						<div className="components-placeholder__opentable-help-links">
							<a
								href="https://restaurant.opentable.com/get-started/"
								rel="noopener noreferrer"
								target="_blank">
								{ __( 'Sign up for OpenTable', 'coblocks' ) }
							</a>
						</div>

					</Placeholder>
				)
					: <>
						<div
							style={ { height: '100%', position: 'absolute', width: '100%' } }
						/>
						<OpenTable { ...props } />
					</>
				}
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
