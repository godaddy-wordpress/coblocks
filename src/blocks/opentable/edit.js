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
import { useState, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
	Placeholder,
	Spinner,
	Notice,
	Button,
	withNotices,
	Icon,
	FormTokenField,
} from '@wordpress/components';

const Edit = ( props ) => {
	const { className, attributes, noticeUI, noticeOperations } = props;
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
		setIsLoading( true );
		noticeOperations.removeAllNotices();
		fetch(
			'https://www.opentable.com/widget/reservation/restaurant-search?pageSize=15' +
				'&query=' +
				encodeURIComponent( token )
		)
			.then( ( response ) => {
				return response.json();
			} )
			.catch( ( error ) => {
				setIsLoading( false );
				noticeOperations.createErrorNotice( __( 'Error connecting to the OpenTable API. Please try again later.', 'coblocks' ) );
				throw new Error( 'Error connecting to the OpenTable API: ' + error );
			} )
			.then( ( json ) => {
				if ( ! json ) {
					setIsLoading( false );
					throw new Error( `Error connecting to the OpenTable API: ${ json }` );
					// return;
				}
				const results = [];
				for ( const item in json.items ) {
					const itemProps = json.items[ item ];
					const name = `${ decodeURIComponent( itemProps.name ) },  ${ decodeURIComponent( itemProps.addressResponse.city ) }, ${ decodeURIComponent( itemProps.addressResponse.country ) } (${ itemProps.rid })`;
					results.push( name );
				}
				setQueryResults( results );
				setNoResultsFound( results?.length === 0 );
				setIsLoading( false );
			} );
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
						notices={
							noticeUI
						}
					>

						<div className="components-placeholder__flex-fields">
							<div className="components-placeholder__flex-fields-vertical-group">
								<FormTokenField
									value={ ridField || '' }
									suggestions={ queryResults }
									className="components-placeholder__input"
									placeholder={ __(
										'Select restaurant(s)',
										'coblocks'
									) }
									maxSuggestions={ 15 }
									onChange={ setRidField }
									onInputChange={ searchRestaurants }
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
							{ isLoading && <Spinner /> }
						</div>
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
