/* global coblocksYelp */

/**
 * External dependencies
 */
import { MountainsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import CustomAppender from './appender';

/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	Icon,
	Placeholder,
	Spinner,
	TextControl,
	withNotices,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

const Edit = ( props ) => {
	// Destructure props
	const { attributes, className, setAttributes, clientId } = props;

	/**
	 * Edit steps for configuring this Yelp block.
	 */
	const BLOCK_SETUP_STEP = {
		BUSINESS_SEARCH: 'business_search',
		SELECT_REVIEWS: 'select_reviews',
		SAVED_PREVIEW: 'saved_preview',
	};

	const { insertBlock } = useDispatch( 'core/block-editor' );
	const { innerBlocks } = useSelect( ( select ) => ( { innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ) } ) );

	/**
	 * Initializer for `setupStep`'s state. Determines where the edit flow should start based on what data has been saved.
	 */
	const initSetupStep = () => {
		// if the block doesn't have a configured businessId, then enter at the business search stage.
		if ( attributes.yelpBusinessId.length === 0 ) {
			return BLOCK_SETUP_STEP.BUSINESS_SEARCH;
		}

		return attributes.saved ? BLOCK_SETUP_STEP.SAVED_PREVIEW : BLOCK_SETUP_STEP.SELECT_REVIEWS;
	};

	// The current setup stage of the Yelp block, used to control the block's setup flow.
	const [ setupStep, setSetupStep ] = useState( initSetupStep() );

	// Reviews selected on the SELECT_REVIEWS step. These will be converted to inner blocks when the block move into the save state
	const [ selectedReviews, setSelectedReviews ] = useState( {} );

	const SavedPreview = () => {
		const ALLOWED_BLOCKS = [ 'coblocks/review-item' ];

		useEffect( () => {
			if ( ! attributes.saved ) {
				saveSelectedReviewsAsInnerBlocks();
			}
		}, [ selectedReviews, attributes.saved ] );

		/**
		 * Convert selectedReviews to blocks underneath the parent Yelp reviews block
		 */
		const saveSelectedReviewsAsInnerBlocks = () => {
			for ( const reviewId in selectedReviews ) {
				const review = selectedReviews[ reviewId ];

				const newReviewItem = createBlock( 'coblocks/review-item', {
					author: review.author,
					authorAvatarURL: review.authorAvatarSrc,
					comment: review.comment,
					localizedDate: review.localizedDate,
					rating: review.rating + ' / 5',
				} );
				// insert the created block
				insertBlock( newReviewItem, innerBlocks.length, clientId, true );
			}

			setAttributes( { saved: true } );
		};

		const insertCustomReview = () => {
			const customReview = createBlock( 'coblocks/review-item' );
			insertBlock( customReview, innerBlocks.length, clientId, true );
		};

		return (
			<div>

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ () => <CustomAppender onClick={ insertCustomReview } /> }
				/>

			</div>
		);
	};

	return (
		<div className={ className }>

			{ setupStep === BLOCK_SETUP_STEP.BUSINESS_SEARCH &&
			<BusinessSearch
				setYelpBusinessId={ ( bizId ) => setAttributes( { yelpBusinessId: bizId } ) }
				transitionStep={ () => setSetupStep( BLOCK_SETUP_STEP.SELECT_REVIEWS ) }
			/>
			}

			{ setupStep === BLOCK_SETUP_STEP.SELECT_REVIEWS &&
			<SelectReviews
				attributes={ attributes }
				selectedReviews={ selectedReviews }
				setSelectedReviews={ setSelectedReviews }
				transitionStep={ () => setSetupStep( BLOCK_SETUP_STEP.SAVED_PREVIEW ) }
			/>
			}

			{ setupStep === BLOCK_SETUP_STEP.SAVED_PREVIEW &&
			<SavedPreview
				insertBlock={ insertBlock }
				parentClientId={ () => clientId }
				parentInnerBlocks={ innerBlocks }
				savedAttribute={ attributes.saved }
				selectedReviews={ selectedReviews }
				setSavedAttribute={ () => setAttributes( { saved: true } ) }
			/>
			}

		</div>
	);
};

const BusinessSearch = ( props ) => {
	const { transitionStep, setYelpBusinessId } = props;
	// Text field states for business search.
	const [ businessName, setBusinessName ] = useState( '' );
	const [ businessLocation, setBusinessLocation ] = useState( '' );

	// Business-type results returned for business search.
	const [ businessSearchResults, setBusinessSearchResults ] = useState( [] );

	// Data fetch state, used to show a spinner when data loading is in progress.
	const [ dataFetchInProgress, setDataFetchInProgress ] = useState( false );

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
					//noticeOperations.createErrorNotice( __( 'No matching businesses found on Yelp! Try being more specific in your search.', 'coblocks' ) );
					return;
				}

				// set the search results to the API's response.

				setBusinessSearchResults( businessSuggestions );
			} )
			.catch( () => {
				//noticeOperations.createErrorNotice( __( 'Sorry, that search didn\'t work! Please try again.', 'coblocks' ) );
			} )
			.finally( () => {
				// after all fetching/processing is done, regardless of error state, stop showing the spinner to the user.
				setDataFetchInProgress( false );
			} );
	};

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
	 * Sets this Reviews Block's yelpBusinessId to  `bizId`. Advances the block to the select reviews step.
	 *
	 * @param {string} bizId The business ID to save to the block's attributes.
	 */
	const selectBusiness = ( bizId ) => {
		setYelpBusinessId( bizId );
		transitionStep();
	};

	return (
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
				onChange={ ( newBizName ) => setBusinessName( newBizName ) }
				value={ businessName }
			/>

			<TextControl
				label="Business Location"
				onChange={ ( newBizLoc ) => setBusinessLocation( newBizLoc ) }
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

								<Button onClick={ () => {
									selectBusiness( extractBizIdFromURL( biz.redirect_url ) );
								} } style={ { color: 'red', paddingLeft: 10 } }>SELECT BUSINESS</Button>
							</li>
						) ) }

					</ul>

				</div>
			}

		</Placeholder>
	);
};

const SelectReviews = ( props ) => {
	const { setSelectedReviews, selectedReviews, attributes, transitionStep } = props;
	// Paginated reviews, where each key `paginatedBusinessReviews[i]` is an array of reviews for page `i`
	const [ paginatedBusinessReviews, setPaginatedBusinessReviews ] = useState( {} );
	// Current pagination page for buisniess reviews
	const [ paginatePageNumber, setPaginatePageNumber ] = useState( 0 );

	// auto-load reviews on select reviews block-setup-step state update
	useEffect( () => {
		loadReviewsForSavedBusiness( 0 );
	}, [] );

	useEffect( () => {
		if ( ! ( ( paginatePageNumber + 1 ) in paginatedBusinessReviews ) ) {
			loadReviewsForSavedBusiness( paginatePageNumber + 1 );
		}
	}, [ paginatePageNumber, paginatedBusinessReviews ] );

	/**
	 * Loads reviews into `paginatedBusinessReviews` based on the current `paginatePageNumber`. Uses the business ID in the block's attributes.
	 *
	 * @param {number} pageNumber page to load
	 */
	const loadReviewsForSavedBusiness = async ( pageNumber ) => {
		const page = await apiFetch( { path: coblocksYelp.bizReviewsProxy + '?biz_id=' + encodeURIComponent( attributes.yelpBusinessId ) + '&paginateStart=' + pageNumber } );
		const copy = { ...paginatedBusinessReviews };
		copy[ pageNumber ] = page.reviews;
		setPaginatedBusinessReviews( copy );
	};

	const onReviewSelectChange = ( review ) => {
		const copy = { ...selectedReviews };

		if ( review.id in selectedReviews ) {
			// delete the selected review
			delete copy[ review.id ];
		} else {
			// insert the new review
			copy[ review.id ] = {
				id: review.id,
				author: review.user.markupDisplayName,
				authorAvatarSrc: review.user.src,
				localizedDate: review.localizedDate,
				rating: review.rating,
				comment: review.comment.text,
			};
		}

		// update state
		setSelectedReviews( copy );
	};

	const paginateBackward = () => {
		if ( paginatePageNumber > 0 ) {
			setPaginatePageNumber( paginatePageNumber - 1 );
		}
	};

	const paginateForward = () => {
		if ( paginatedBusinessReviews[ paginatePageNumber ].length > 0 ) {
			setPaginatePageNumber( paginatePageNumber + 1 );
		}
	};

	return (
		<div>
			<Placeholder
				icon={ <Icon icon={ icon } /> }
				instructions={ __(
					'Choose which reviews you want to show. You can modify and custom reviews in the next step.',
					'coblocks'
				) }
				isColumnLayout={ true }
				label={ __( 'Select Reviews', 'coblocks' ) }
			>

				{ paginatedBusinessReviews[ paginatePageNumber ] === undefined ? 'undef' : 'good' }

				{
					paginatedBusinessReviews[ paginatePageNumber ] !== undefined && paginatedBusinessReviews[ paginatePageNumber ].map( ( review, index ) => {
						return (
							<div key={ index } style={ { border: '1px solid black', padding: 5 } }>
								<img alt="user avatar" src={ review.user.src } />
								<p><span style={ { fontWeight: 700 } }>Author: </span>{ review.user.markupDisplayName }</p>
								<p><span style={ { fontWeight: 700 } }>On: </span>{ review.localizedDate }</p>
								<p><span style={ { fontWeight: 700 } }>Rating: </span>{ review.rating }/5</p>
								<p><span style={ { fontWeight: 700 } }>Comment: </span><span dangerouslySetInnerHTML={ { __html: review.comment.text } }></span></p>
								<p><a href={ 'https://www.yelp.com/biz/' + review.business.alias + '?hrid=' + review.id }>See on Yelp.com</a></p>
								<p><input checked={ review.id in selectedReviews } onChange={ () => onReviewSelectChange( review ) } type="checkbox" />Show</p>
							</div>
						);
					} )
				}

				<ButtonGroup>
					<Button disabled={ paginatePageNumber === 0 } isPrimary onClick={ paginateBackward }>Pag Back</Button>
					<Button disabled={ paginatedBusinessReviews.length === 0 } isPrimary onClick={ paginateForward }>Pag Next</Button>
				</ButtonGroup>

				<Button isPrimary onClick={ transitionStep }>Save Reviews</Button>
			</Placeholder>

		</div>
	);
};

export default compose( [ withNotices ] )( Edit );

