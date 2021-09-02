/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import { withProps, lifecycle } from 'recompose';
import { MapIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import GMapStyles from './map-styles';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
	Placeholder,
	Button,
	ResizableBox,
	withNotices,
	Icon,
	TextControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const Edit = ( props ) => {
	const {
		attributes,
		setAttributes,
		isSelected,
		className,
	} = props;

	const {
		height,
		iconSize,
		skin,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
		zoom,
	} = attributes;

	const [ apiKey, setApiKey ] = useState( '' );
	const [ address, setAddress ] = useState( attributes.address );
	const [ , setIsSavedKey ] = useState( false );
	const [ , setKeySaved ] = useState( false );
	const [ , setCoords ] = useState( null );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			setApiKey( res.coblocks_google_maps_api_key );
			setIsSavedKey( res.coblocks_google_maps_api_key !== '' );
		} );
	}, [] );

	useEffect( () => {
		if ( !! apiKey && ! attributes.hasApiKey ) {
			setAttributes( { hasApiKey: true } );
		}

		if (
			! isSelected &&
			! attributes.pinned &&
			address &&
			Object.keys( address ).length
		) {
			setAttributes( {
				address,
				pinned: true,
			} );
		}
	}, [ address, isSelected, apiKey, attributes.hasApiKey, attributes.pinned ] );

	const updateApiKey = ( newApiKey = apiKey ) => {
		newApiKey = apiKey.trim();

		saveApiKey( newApiKey );

		if ( newApiKey === '' ) {
			setAttributes( { hasApiKey: false } );

			if ( ! attributes.address ) {
				setAttributes( { pinned: false } );
			}

			return;
		}

		if ( attributes.address ) {
			setAttributes( { pinned: true } );
		}
	};

	const saveApiKey = ( newApiKey = apiKey ) => {
		setApiKey( newApiKey );
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { coblocks_google_maps_api_key: newApiKey },
		} ).then( () => {
			setIsSavedKey( true );
			setKeySaved( true );
		} );
	};

	const locale = document.documentElement.lang;

	const renderMap = ( event ) => {
		if ( event ) {
			event.preventDefault();
		}

		setAttributes( { address, pinned: true } );
	};

	const marker = {
		url:
				'/wp-content/plugins/coblocks/dist/images/markers/' +
				skin +
				'.svg',
		scaledSize: { width: iconSize, height: iconSize },
	};

	const GoogleMapIframeRender = () => (
		<>
			<div
				style={ { width: '100%', height, position: 'absolute' } }
			/>
			<div className="iframe__overflow-wrapper">
				<iframe
					title={ __( 'Google Map', 'coblocks' ) }
					frameBorder="0"
					style={ { width: '100%', minHeight: height + 'px' } }
					src={ `https://www.google.com/maps?q=${ encodeURIComponent(
						address
					) }&output=embed&hl=${ locale }&z=${ zoom }` }
				/>
			</div>
		</>
	);

	return (
		<>
			{ isSelected && (
				<Inspector
					{ ...props }
					apiKey={ apiKey }
					updateApiKeyCallBack={ updateApiKey }
				/>
			) }
			{ isSelected && (
				<Controls { ...props } apiKey={ apiKey } />
			) }
			{ attributes.pinned ? (
				<ResizableBox
					size={ {
						height,
						width: '100%',
					} }
					className={ classnames( className, {
						'is-selected': isSelected,
					} ) }
					minHeight="200"
					enable={ {
						bottom: true,
						bottomLeft: false,
						bottomRight: false,
						left: false,
						right: false,
						top: false,
						topLeft: false,
						topRight: false,
					} }
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
					} }
					showHandle={ isSelected }
				>
					{ !! apiKey
						? ( compose(	withProps( {
							googleMapURL:
									`https://maps.googleapis.com/maps/api/js?key=${ apiKey }` +
									`&language=${ locale }` +
									'&v=3.exp&libraries=geometry,drawing,places',
							loadingElement: <div style={ { height: '100%' } } />,
							containerElement: <div style={ { height: '100%' } } />,
							mapElement: <div style={ { height: '100%' } } />,
							coords: null,
							props,
						} ),
						withScriptjs,
						withGoogleMap,
						lifecycle( {
							componentDidMount() {
								const geocoder = new window.google.maps.Geocoder();
								geocoder.geocode(
									{ address },
									function( results, status ) {
										if ( status !== 'OK' ) {
											props.setAttributes( {
												pinned: false,
												hasError: __( 'Invalid API key, or too many requests', 'coblocks' ),
											} );
											return;
										}

										setCoords( results[ 0 ].geometry.location.toJSON() );

										props.setAttributes( {
											lat: results[ 0 ].geometry.location.toJSON().lat.toString(),
											lng: results[ 0 ].geometry.location.toJSON().lng.toString(),
											hasError: '',
										} );
									}.bind( this )
								);
							},
						} )
						)( ( innerProps ) => [
							innerProps.coords ? (
								<GoogleMap
									isMarkerShown={ true }
									defaultZoom={ innerProps.props.attributes.zoom }
									defaultCenter={ new window.google.maps.LatLng( innerProps.coords ) }
									defaultOptions={ {
										styles: GMapStyles[ skin ],
										draggable: false,
										mapTypeControl,
										zoomControl,
										streetViewControl,
										fullscreenControl,
									} }
								>
									<Marker
										position={ new window.google.maps.LatLng( innerProps.coords ) }
										icon={ marker }
									/>
								</GoogleMap>
							) : null,
						] ) )() : GoogleMapIframeRender() }
				</ResizableBox>
			) : (
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					label={ __( 'Map', 'coblocks' ) }
					instructions={ __(
						'Enter a location or address to drop a pin on a Google map.',
						'coblocks'
					) }
				>
					<form onSubmit={ renderMap }>
						<TextControl
							value={ address || '' }
							className="components-placeholder__input"
							placeholder={ __(
								'Search for a place or address…',
								'coblocks'
							) }
							onChange={ ( nextAddress ) =>
								setAddress( nextAddress )
							}
						/>
						<Button
							isPrimary={ !! address }
							isSecondary={ ! address }
							type="submit"
							disabled={ ! address }
						>
							{ __( 'Search', 'coblocks' ) }
						</Button>
						<div className="components-placeholder__learn-more">
							{ address && (
								<Button
									isTertiary
									className="components-placeholder__cancel-button"
									title={ __( 'Cancel', 'coblocks' ) }
									onClick={ () => {
										setAttributes( { pinned: ! attributes.pinned } );
										setAddress( attributes
											.address );
									} }
									disabled={ ! address }
								>
									{ __( 'Cancel', 'coblocks' ) }
								</Button>
							) }
						</div>
					</form>
					{ attributes.lng && attributes.hasError && (
						<span className="invalid-google-maps-api-key">
							{ attributes.hasError }
						</span>
					) }
				</Placeholder>
			) }
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
