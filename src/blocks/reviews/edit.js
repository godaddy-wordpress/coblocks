/* global coblocksYelp */

/**
 * External dependencies
 */
import { MountainsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { renderRating } from './utils';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
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
		SELECT_BUSINESS: 'select_business',
		SELECT_REVIEWS: 'select_reviews',
		SAVED_PREVIEW: 'saved_preview', /* eslint-disable-line sort-keys */
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

	// Reviews selected on the SELECT_REVIEWS step. These will be converted to inner blocks when the block move into the save state.
	const [ selectedReviews, setSelectedReviews ] = useState( {} );

	// Text field states for business search.
	const [ businessName, setBusinessName ] = useState( '' );
	const [ businessLocation, setBusinessLocation ] = useState( '' );

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

				apiFetch( { path: addQueryArgs( coblocksYelp.addAvatarToMediaLib, {
					src: review.authorAvatarSrc,
				} ) } )
					.then( ( json ) => {
						const newReviewItem = createBlock( 'coblocks/review-item', {
							author: review.author,
							avatarUrl: json.url,
							comment: review.comment,
							localizedDate: review.localizedDate,
							rating: review.rating,
						} );
						// insert the created block
						insertBlock( newReviewItem, innerBlocks.length, clientId, true );
					} );
			}

			setAttributes( { saved: true } );
		};

		return (
			<div>
				{ innerBlocks.length === 0 && <span><Spinner /> Loading your reviews...</span> }

				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		);
	};

	return (
		<div className={ className }>

			{ setupStep === BLOCK_SETUP_STEP.BUSINESS_SEARCH &&
			<BusinessSearch
				businessLocation={ businessLocation }
				businessName={ businessName }
				setBusinessLocation={ setBusinessLocation }
				setBusinessName={ setBusinessName }
				transitionStepNext={ () => setSetupStep( BLOCK_SETUP_STEP.SELECT_BUSINESS ) }
			/>
			}

			{ setupStep === BLOCK_SETUP_STEP.SELECT_BUSINESS &&
			<SelectBusiness
				businessLocation={ businessLocation }
				businessName={ businessName }
				setYelpBusinessId={ ( bizId ) => setAttributes( { yelpBusinessId: bizId } ) }
				transitionStepBack={ () => setSetupStep( BLOCK_SETUP_STEP.BUSINESS_SEARCH ) }
				transitionStepNext={ () => setSetupStep( BLOCK_SETUP_STEP.SELECT_REVIEWS ) }
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
	const { transitionStepNext, businessName, businessLocation, setBusinessName, setBusinessLocation } = props;

	/**
	 * Determines whether the "search yelp" button (for discovering the business id) is disabled. Returns boolean.
	 *
	 * @return {boolean} "Search Yelp" button disable state
	 */
	const shouldSearchBeDisabled = businessName.length === 0 || businessLocation.length === 0;

	return (
		<Placeholder
			icon={ <Icon icon={ icon } /> }
			instructions={ __(
				'Please enter your business name and location.',
				'coblocks'
			) }
			isColumnLayout={ true }
			label={ __( 'Find your business on Yelp', 'coblocks' ) }
		>

			<TextControl
				label="Business Name"
				onChange={ ( newBizName ) => setBusinessName( newBizName ) }
				value={ businessName }
			/>

			<TextControl
				label="Business Location"
				onChange={ ( newBizLoc ) => setBusinessLocation( newBizLoc ) }
				onKeyDown={ ( event ) => event.key === 'Enter' && ! shouldSearchBeDisabled && transitionStepNext() }
				value={ businessLocation }
			/>

			<div className="search_button">
				<Button
					disabled={ shouldSearchBeDisabled }
					isPrimary
					onClick={ transitionStepNext }
				>
					{ __( 'Search Yelp', 'coblocks' ) }
				</Button>
			</div>

		</Placeholder>
	);
};

const SelectBusiness = ( props ) => {
	const { transitionStepNext, transitionStepBack, setYelpBusinessId, businessName, businessLocation } = props;

	// Data fetch state, used to show a spinner when data loading is in progress.
	const [ isFetchingBusinesses, setIsFetchingBusinesses ] = useState( false );

	// Business-type results returned for business search.
	const [ businessSearchResults, setBusinessSearchResults ] = useState( [] );

	/**
	 * Extracts the business ID from a string of the form `/biz/[business_id]`.
	 *
	 * @param {string} url
	 * @return {string} a yelp business id
	 */
	const extractBizIdFromURL = ( url ) => url.substring( 5 );

	/**
	 * Performs API call to Yelp.com to fetch businesses matching the values of `businessName` and `businessLocation`.
	 */
	const fetchBusinessesMatchingQuery = async () => {
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
		setIsFetchingBusinesses( true );

		// perform the API Fetch to our Yelp Proxy API.
		apiFetch( { path: addQueryArgs( coblocksYelp.bizSearchProxy, {
			biz_loc: businessLocation,
			biz_name: businessName,
		} ) } )
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
				setIsFetchingBusinesses( false );
			} );
	};

	/**
	 * Sets this Reviews Block's yelpBusinessId to  `bizId`. Advances the block to the select reviews step.
	 *
	 * @param {string} bizId The business ID to save to the block's attributes.
	 */
	const selectBusiness = ( bizId ) => {
		setYelpBusinessId( bizId );
		transitionStepNext();
	};

	// Load businesses for the query passed into this component on render.
	useEffect( () => fetchBusinessesMatchingQuery(), [ businessName, businessLocation ] );

	return (
		<Placeholder
			icon={ <Icon icon={ icon } /> }
			isColumnLayout={ true }
			label={ __( 'Find your business on Yelp', 'coblocks' ) }
		>
			<p className="mt-0">{ isFetchingBusinesses ? 'Loading' : businessSearchResults.length } result{ businessSearchResults.length !== 1 && 's' } for <span style={ { fontWeight: 600 } }>{ businessName }, { businessLocation }</span> <Button className="edit_search_button" onClick={ transitionStepBack }>Edit Search</Button></p>

			{ isFetchingBusinesses && <Spinner /> }

			{ businessSearchResults.length > 0 &&
			<div className="search-results">
				{ businessSearchResults.map( ( biz, index ) => (
					<div className="search-result" key={ index }>
						<div className="thumbnail_image">
							<img alt="business thumbnail" height={ 32 } src={ biz.thumbnail.key } />
						</div>
						<div className="search-result__infos">
							<h3 className="search-result__infos__title">{ biz.title }</h3>
							<p className="search-result__infos__location">{ biz.subtitle }</p>
							<Button isSecondary onClick={ () => {
								selectBusiness( extractBizIdFromURL( biz.redirect_url ) );
							} }>Select</Button>
						</div>
					</div>
				) ) }
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
		const page = await apiFetch( { path: addQueryArgs( coblocksYelp.bizReviewsProxy, {
			biz_id: attributes.yelpBusinessId,
			paginateStart: pageNumber,
		} ) } );
		setPaginatedBusinessReviews( {
			...paginatedBusinessReviews,
			[ pageNumber ]: page.reviews,
		} );
	};

	const onReviewToggle = ( review ) => {
		const copy = { ...selectedReviews };

		if ( review.id in selectedReviews ) {
			// delete the selected review
			delete copy[ review.id ];
		} else {
			// insert the new review
			copy[ review.id ] = {
				author: review.user.markupDisplayName,
				authorAvatarSrc: review.user.src,
				comment: review.comment.text,
				id: review.id,
				localizedDate: review.localizedDate,
				rating: review.rating,
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
				{ paginatedBusinessReviews[ paginatePageNumber ] === undefined && (
					<div className="component-is-loading-reviews">
						<p className="loader-status-text" >Loading Reviews</p>
						<Spinner />
					</div>
				) }

				<div className="wp-block-coblocks-reviews">
					{
						paginatedBusinessReviews[ paginatePageNumber ] !== undefined && paginatedBusinessReviews[ paginatePageNumber ].map( ( review, index ) => {
							return (
								<div
									className={ `wp-block-coblocks-review-item ${ review.id in selectedReviews ? ' is-selected' : '' }` }
									key={ index }
								>
									<div className="wp-block-coblocks-review-item__header">
										<img
											alt=""
											className="wp-block-coblocks-review-item__header__avatar"
											src={ review.user.src }
										/>
										<div className="wp-block-coblocks-review-item__header__meta">
											<input
												checked={ review.id in selectedReviews }
												className="wp-block-coblocks-review-item__header__checkbox"
												onChange={ () => onReviewToggle( review ) }
												type="checkbox"
											/>
											<h3 className="wp-block-coblocks-review-item__header__name">{ review.user.markupDisplayName }</h3>
											<p className="wp-block-coblocks-review-item__header__rating">{ renderRating( review.rating ) } { review.localizedDate }</p>
										</div>
									</div>

									<div className="wp-block-coblocks-review-item__comment">
										<p dangerouslySetInnerHTML={ { __html: review.comment.text } }></p>
										<p><a href={ 'https://www.yelp.com/biz/' + review.business.alias + '?hrid=' + review.id }>See on Yelp.com</a></p>
									</div>
								</div>
							);
						} )
					}
				</div>

				<ButtonGroup>
					<Button disabled={ paginatePageNumber === 0 } isPrimary onClick={ paginateBackward }>Back</Button>
					<Button disabled={ paginatedBusinessReviews.length === 0 } isPrimary onClick={ paginateForward }>Next</Button>
				</ButtonGroup>

				<Button className="save-reviews-action" isPrimary onClick={ transitionStep }>Save Reviews</Button>
			</Placeholder>

		</div>
	);
};

export default compose( [ withNotices ] )( Edit );

