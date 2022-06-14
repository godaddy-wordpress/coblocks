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
	/**
	 * Edit steps for configuring this Yelp block.
	 */
	const BLOCK_SETUP_STEP = {
		BUSINESS_SEARCH: 'business_search',
		SELECT_REVIEWS: 'select_reviews',
		SAVED_PREVIEW: 'saved_preview',
	};

	// Destructure props.
	const { attributes, className, noticeOperations, setAttributes } = props;

	// --- State ---

	/**
	 * Initializer for `setupStep`'s state. Determines where the edit flow should start based on what data has been saved.
	 */
	const initSetupStep = () => {
		// if the block doesn't have a configured businessId, then enter at the business search stage.
		if ( attributes.yelpBusinessDetails.businessId.length === 0 ) {
			return BLOCK_SETUP_STEP.BUSINESS_SEARCH;
		}
		// if block has bizId set and no reviews, then enter at review selection state.
		// if block has bizId set and does have reviews, then enter at the saved previews state.
		return attributes.reviews.length === 0 ? BLOCK_SETUP_STEP.SELECT_REVIEWS : BLOCK_SETUP_STEP.SAVED_PREVIEW;
	};

	// The current setup stage of the Yelp block, used to control the block's setup flow.
	const [ setupStep, setSetupStep ] = useState( initSetupStep() );

	// Text field states for business search.
	const [ businessName, setBusinessName ] = useState( '' );
	const [ businessLocation, setBusinessLocation ] = useState( '' );

	// Business-type results returned for business search.
	const [ businessSearchResults, setBusinessSearchResults ] = useState( [] );

	// All reviews for the selected business. Can change based on pagination of review results.
	const [ selectableBizReviews, setSelectableBizReviews ] = useState( [] );

	// User's selected reviews from the list of all available reviews for the business
	const [ selectedBizReviews, setSelectedBizReviews ] = useState( attributes.reviews );

	// Data fetch state, used to show a spinner when data loading is in progress.
	const [ dataFetchInProgress, setDataFetchInProgress ] = useState( false );

	// --- Functions ---

	/**
	 * Determines whether the "search yelp" button (for discovering the business id) is disabled. Returns boolean.
	 *
	 * @return {boolean} "Search Yelp" button disable state
	 */
	const shouldSearchBeDisabled = () => ( businessName.length === 0 ) || ( businessLocation.length === 0 );

	/**
	 * Extracts the business ID from a string of the form `/biz/[business_id]`.
	 *
	 * @param {string} url
	 * @return {string} a yelp business id
	 */
	const extractBizIdFromURL = ( url ) => url.substring( 5 );

	/**
	 * Selects a business to select reviews for. Transitions the `setupStep` to `SELECT_REVIEWS`.
	 *
	 * @param {string} bizId the yelp businessID to select reviews for.
	 */
	const selectBusiness = ( bizId ) => {
		// make proxied API call to get reviews for bizId
		fetchAndSetBizReviews( bizId )
			.then( () => {
				// reviews finished loading, so transition the block state.
				setSetupStep( BLOCK_SETUP_STEP.SELECT_REVIEWS );
			} );
	};

	/**
	 * Performs API call to Yelp.com to fetch businesses matching the values of `businessName` and `businessLocation`.
	 * Sets the resulting reviews to `selectableBizReviews`.
	 *
	 * @param {string} bizId
	 * @param {string} bizName
	 */
	const fetchAndSetBizReviews = async ( bizId, bizName ) => {
		// Save the selected business we're pulling reviews for in the block attributes.
		setAttributes( {
			yelpBusinessDetails: {
				businessId: bizId,
				businessName: bizName,
			},
		} );
		// Perform the API Fetch to our Yelp Proxy API
		await apiFetch( { path: coblocksYelp.bizReviewsProxy + '?biz_id=' + encodeURIComponent( bizId ) } )
			// When request finishes OK:
			.then( ( json ) => {
				// console.log(json.reviews);
				setSelectableBizReviews( json.reviews );
			} );
	};

	/**
	 * Performs API call to Yelp.com to fetch businesses matching the values of `businessName` and `businessLocation`.
	 */
	const searchForYelpBiz = async () => {
		/**
		 * Iterates through yelp's search results and only returns items that are businesses.
		 *
		 * @param {*} suggestions from yelp.com API.
		 * @return {Array} all **businesses** matching the search query.
		 */
		const getBusinessesFromSuggestions = ( suggestions ) => {
			// create an array we'll use to store all the query's actual businesses.
			const businesses = [];

			// iterate through all the query suggestions, matching the ones that are businesses and adding them to our array.
			suggestions.forEach( ( suggestion ) => {
				if ( suggestion.type === 'business' ) {
					businesses.push( suggestion );
				}
			} );

			// return all the actual businesses
			return businesses;
		};

		// show the loader so the user isn't left hanging after submitting
		setDataFetchInProgress( true );

		// perform the API Fetch to our Yelp Proxy API.
		apiFetch( { path: coblocksYelp.bizSearchProxy + '?biz_name=' + encodeURIComponent( businessName ) + '&biz_loc=' + encodeURIComponent( businessLocation ) } )
			// When request finishes OK:
			.then( ( json ) => {
				// get the results from Yelp's search suggestions that are businesses (not other suggestions like typeahead).
				const businessSuggestions = getBusinessesFromSuggestions( json.response[ 0 ].suggestions );

				// if no businesses found, show an error notice to the user.
				if ( businessSuggestions.length === 0 ) {
					noticeOperations.createErrorNotice( __( 'No matching businesses found on Yelp! Try being more specific in your search.', 'coblocks' ) );
					return;
				}

				// set the search results to the API's response.
				setBusinessSearchResults( businessSuggestions );
			} )
			.finally( () => {
				// after all fetching/processing is done, regardless of error state, stop showing the spinner to the user.
				setDataFetchInProgress( false );
			} );
	};

	const addReviewToBlock = ( review ) => {
		// Add the review to the selectedBizReviews object
		selectedBizReviews[ review.id ] = {
			id: review.id,
			author: review.user.markupDisplayName,
			localizedDate: review.localizedDate,
			rating: review.rating,
			comment: review.comment.text,
		};
		// Set the state with the added review
		setSelectedBizReviews( selectedBizReviews );
		// Save the updated reviews to the block
		setAttributes( {
			reviews: { ...selectedBizReviews },
		} );
	};

	const onReviewSelectChange = ( review, event ) => {
		if ( event.target.checked ) {
			addReviewToBlock( review );
		} else {
			// Delete the review from the reviews dict
			delete selectedBizReviews[ review.id ];
			// Save the altered state
			setSelectedBizReviews( selectedBizReviews );
			// Save the altered reviews to the block
			setAttributes( {
				reviews: { ...selectedBizReviews },
			} );
		}
	};

	// --- UseEffects ---

	// --- Subcomponents ---

	const BizReviewSelector = () => (
		<div>
			<Placeholder
				icon={ <Icon icon={ icon } /> }
				instructions={ __(
					'You can select up to <unlimited>.',
					'coblocks'
				) }
				isColumnLayout={ true }
				label={ __( 'Select reviews you\'d like to show:', 'coblocks' ) }
			>
				{ selectableBizReviews.map( ( review, index ) => (
					<div key={ index } style={ { border: '1px solid black', padding: 5 } }>
						<p><span style={ { fontWeight: 700 } }>Author: </span>{ review.user.markupDisplayName }</p>
						<p><span style={ { fontWeight: 700 } }>On: </span>{ review.localizedDate }</p>
						<p><span style={ { fontWeight: 700 } }>Rating: </span>{ review.rating }/5</p>
						<p><span style={ { fontWeight: 700 } }>Comment: </span><span dangerouslySetInnerHTML={ { __html: review.comment.text } }></span></p>
						<p><a href={ 'https://www.yelp.com/biz/' + review.business.alias + '?hrid=' + review.id }>See on Yelp.com</a></p>
						<p><input checked={ review.id in selectedBizReviews } onChange={ ( event ) => onReviewSelectChange( review, event ) } type="checkbox" /> Show review?</p>
					</div>
				) ) }

			</Placeholder>
		</div>
	);

	const BizReviewSaveRenderer = () => (
		<div>
			<p>Saved Reviews:</p>
			<Button onClick={ () => selectBusiness( attributes.yelpBusinessDetails.businessId ) }>Back to Reviews</Button>
			{ Object.keys( selectedBizReviews ).map( ( key ) => {
				const review = selectedBizReviews[ key ];
				return (
					<div key={ 'review_' + key } style={ { border: '1px solid black', padding: 5 } }>
						<p><span style={ { fontWeight: 700 } }>Author: </span>{ review.author }</p>
						<p><span style={ { fontWeight: 700 } }>On: </span>{ review.localizedDate }</p>
						<p><span style={ { fontWeight: 700 } }>Rating: </span>{ review.rating }/5</p>
						<p><span style={ { fontWeight: 700 } }>Comment: </span><span dangerouslySetInnerHTML={ { __html: review.comment } }></span></p>
						<p><a href={ 'https://www.yelp.com/biz/' + attributes.yelpBusinessDetails.businessId + '?hrid=' + review.id }>See on Yelp.com</a></p>
					</div>
				);
			} ) }

		</div>
	);

	return (
		<>
			{ /* Block Body (edit state) */ }
			<div className={ className }>

				{ /* Block Setup Stage Conditional Renderers */ }
				{ setupStep === BLOCK_SETUP_STEP.BUSINESS_SEARCH &&
					<div>
						<Placeholder
							icon={ <Icon icon={ icon } /> }
							instructions={ __(
								'Please enter your business name and where it\'s located:',
								'coblocks'
							) }
							isColumnLayout={ true }
							label={ __( 'Let\'s find your business!', 'coblocks' ) }
						>

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
								{ dataFetchInProgress && <Spinner /> }

							</Button>

							{ businessSearchResults.length > 0 &&
							<div>
								<p>We found these businesses:</p>
								<ul>

									{ businessSearchResults.map( ( biz, index ) => (
										<li key={ index }>
											<img alt="temporary thumbnail" height={ 32 } src={ biz.thumbnail.key } />
											<span style={ { fontWeight: 800, paddingLeft: 8 } }>{ biz.title } - </span>
											<span>{ biz.subtitle }</span>

											<Button onClick={ () => ( selectBusiness( extractBizIdFromURL( biz.redirect_url ) ) ) } style={ { color: 'red', paddingLeft: 10 } }>select</Button>
										</li>
									) ) }

								</ul>

							</div>
							}

						</Placeholder>

					</div>
				}
				{ setupStep === BLOCK_SETUP_STEP.SELECT_REVIEWS &&
					<BizReviewSelector />
				}
				{ setupStep === BLOCK_SETUP_STEP.SAVED_PREVIEW &&
					<BizReviewSaveRenderer />
				}

			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
