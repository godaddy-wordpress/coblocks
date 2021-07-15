/**
 * External dependencies
 */
import { OpentableIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { useState, useEffect } from '@wordpress/element';
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
import { compose } from '@wordpress/compose';
import {
	Placeholder,
	Button,
	withNotices,
	Icon,
	FormTokenField,
} from '@wordpress/components';

const Edit = ( props ) => {
	// const onSelectImages = ( images ) => {
	// 	props.setAttributes( { images: images.map( ( image ) => pickRelevantMediaFiles( image ) ) } );
	// };

	// const onDropImages = ( images ) => {
	// 	const imagesNormalized = images.map( ( image ) => pickRelevantMediaFiles( image ) );
	// 	const currentImages = props.attributes.images || [];
	// 	props.setAttributes( { images: currentImages.concat( imagesNormalized )	} );
	// };

	// const { className, noticeOperations, attributes, noticeUI, isSelected } = props;

	const [ ridField, setRidField ] = useState( [] );

	const [ queryResults, setQueryResults ] = useState( [] );
	const { className, attributes } = props;

	//searches the opentable reservation network for restaurants with the given name or ID
	const searchRestaurants = ( token ) => {
		fetch(
			'https://www.opentable.com/widget/reservation/restaurant-search?pageSize=15' +
				'&query=' +
				encodeURIComponent( token )
		)
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				setQueryResults( [] );
				for ( const item in json.items ) {
					const name = decodeURIComponent( json.items[ item ].name ) + ' (' + json.items[ item ].rid + ')';
					setQueryResults( ( oldQueryResults ) => [ ...oldQueryResults, name ] );
				}
			} );
	};
	useEffect( () => {
		setRidField( attributes.restaurantIDs );
	}, [] );

	// const renderOpenTable = ( event ) => {
	// 	if ( event ) {
	// 		event.preventDefault();
	// 	}

	// 	// setAttributes( { restaurantID: restaurantID } );
	// };

	// const hasRestaurantID = !! attributes.restaurantID.length;

	return (
		<>
			<Controls { ...props } />
			<InspectorControls
				attributes={ attributes }
				setAttributes={ props.setAttributes }
			/>
			<div className={ className }>

				{ ( ! attributes.pinned ) ? (
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
								saveTransform={ ( token ) => {
									return token.substring( token.lastIndexOf( '(' ) + 1, token.length - 1 );
								} }
								__experimentalHowTo={ false }
							/>
							<Button
								isPrimary={ !! ridField }
								isSecondary={ ! ridField }
								type="submit"
								disabled={ ! ridField }
								onClick={ () => {
									props.setAttributes( { restaurantIDs: ridField, pinned: true } );
								} }
							>
								{ __( 'Embed', 'coblocks' ) }
							</Button>
						</div>
						{ /* </form> */ }
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
