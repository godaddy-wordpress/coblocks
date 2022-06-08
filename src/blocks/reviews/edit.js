/* global coblocksYelp */

/**
 * External dependencies
 */
import { MountainsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import {
	Button,
	Icon,
	Placeholder,
	Spinner,
	TextControl,
	withNotices,
} from '@wordpress/components';

const Edit = ( props ) => {
	// Destructure props
	const { className, noticeOperations } = props;

	// State
	const [ businessName, setBusinessName ] = useState( '' );
	const [ businessLocation, setBusinessLocation ] = useState( '' );
	const [ matchingBusinessesTEMP, setMatchingBusinessesTEMP ] = useState( [] );
	const [ dataFetchInProgress, setDataFetchInProgress ] = useState( false );

	// Functions

	/**
	 * Determines whether the 'search yelp' button (for discovering the business id) is disabled. Returns boolean.
	 */
	const shouldSearchBeDisabled = () => ( businessName.length === 0 ) || ( businessLocation.length === 0 );

	/**
	 * Performs API call to Yelp.com to fetch businesses matching the values of `businessName` and `businessLocation`
	 */
	const searchForYelpBiz = async () => {
		const getBusinessesFromSuggestions = ( suggestions ) => {
			const businesses = [];

			suggestions.forEach( ( suggestion ) => {
				if ( suggestion.type === 'business' ) {
					businesses.push( suggestion );
				}
			} );

			return businesses;
		};

		// Show the loader so the user isn't left hanging after submitting
		setDataFetchInProgress( true );
		// Perform the API Fetch to our Yelp Proxy API
		apiFetch( { path: coblocksYelp.bizSearchProxy + '?biz_name=' + encodeURIComponent( businessName ) + '&biz_loc=' + encodeURIComponent( businessLocation ) } )
			// When request finishes OK:
			.then( ( json ) => {
				// Get the results from Yelp's search suggestions that are businesses (not other suggestions like typeahead)
				const matchingBusinesses = getBusinessesFromSuggestions( json.response[ 0 ].suggestions );

				// If no businesses found, show an error notice to the user
				if ( matchingBusinesses.length === 0 ) {
					noticeOperations.createErrorNotice( __( 'No matching businesses found on Yelp! Try being more specific in your search.', 'coblocks' ) );
					return;
				}
				setMatchingBusinessesTEMP( matchingBusinesses );
			} )
			.finally( () => {
				// After all fetching/processing is done, regardless of error state, stop showing the spinner to the user.
				setDataFetchInProgress( false );
			} );
	};

	return (
		<>
			{ /* Block Body (edit state) */ }
			<div className={ className }>

				<Placeholder
					icon={ <Icon icon={ icon } /> }
					instructions={ __(
						'Before you can select reviews to show, we need to find your business on Yelp:',
						'coblocks'
					) }
					isColumnLayout={ true }
					label={ __( 'Yelp', 'coblocks' ) }
				>
					<div className="components-placeholder__flex-fields">
						<div className="components-placeholder__flex-fields-vertical-group">
							<TextControl
								label="Business Name"
								onChange={ ( newBizName ) => {
									setBusinessName( newBizName );
								} }
								value={ businessName }
							/>

							<TextControl
								label="Business Location"
								onChange={ ( newBizLoc ) => {
									setBusinessLocation( newBizLoc );
								} }
								value={ businessLocation }
							/>

							<Button
								disabled={ shouldSearchBeDisabled() }
								isPrimary
								onClick={ searchForYelpBiz }
							>
								{ __( 'Search Yelp', 'coblocks' ) }
							</Button>
							{ dataFetchInProgress && <Spinner /> }
							<ul>
								{ matchingBusinessesTEMP.length > 0 && <p>Businesses matching query:</p> }
								{ matchingBusinessesTEMP.map( ( biz, index ) => (
									<li key={ index }>
										<img src={ biz.thumbnail.key } height={ 32 } alt="temporary thumbnail" />
										<span style={ { fontWeight: 800, paddingLeft: 8 } }>{ biz.title } - </span>
										<span>{ biz.subtitle }</span>
									</li>
								) ) }
							</ul>
						</div>
					</div>
				</Placeholder>
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
