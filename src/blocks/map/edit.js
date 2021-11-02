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
import { Fragment, Component } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			apiKey: '',
			address: this.props.attributes.address,
			coords: null,
			hasError: false,
			isSavedKey: false,
			keySaved: false,
		};

		this.updateApiKey = this.updateApiKey.bind( this );
		this.saveApiKey = this.saveApiKey.bind( this );
	}

	componentDidMount() {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			this.setState( {
				apiKey: res.coblocks_google_maps_api_key,
				isSavedKey: res.coblocks_google_maps_api_key !== '',
			} );
		} );
	}

	componentDidUpdate() {
		if ( !! this.state.apiKey && ! this.props.attributes.hasApiKey ) {
			this.props.setAttributes( { hasApiKey: true } );
		}

		if (
			! this.props.isSelected &&
			! this.props.attributes.pinned &&
			this.state.address &&
			Object.keys( this.state.address ).length
		) {
			this.props.setAttributes( {
				address: this.state.address,
				pinned: true,
			} );
		}
	}

	updateApiKey( apiKey = this.state.apiKey ) {
		const { attributes, setAttributes } = this.props;

		apiKey = apiKey.trim();

		this.saveApiKey( apiKey );

		if ( apiKey === '' ) {
			setAttributes( { hasApiKey: false } );

			if ( ! attributes.address ) {
				setAttributes( { pinned: false } );
			}

			return;
		}

		if ( attributes.address ) {
			setAttributes( { pinned: true } );
		}
	}

	saveApiKey( apiKey = this.state.apiKey ) {
		this.setState( { apiKey } );
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { coblocks_google_maps_api_key: apiKey },
		} ).then( () => {
			this.setState( {
				isSavedKey: true,
				keySaved: true,
			} );
		} );
	}

	render() {
		const { attributes, setAttributes, isSelected, className } = this.props;

		const {
			address,
			height,
			iconSize,
			pinned,
			skin,
			mapTypeControl,
			zoomControl,
			streetViewControl,
			fullscreenControl,
			zoom,
		} = attributes;

		const locale = document.documentElement.lang;

		const renderMap = ( event ) => {
			if ( event ) {
				event.preventDefault();
			}

			setAttributes( { address: this.state.address, pinned: true } );
		};

		const marker = {
			url:
				'/wp-content/plugins/coblocks/assets/images/markers/' +
				skin +
				'.svg',
			scaledSize: { width: iconSize, height: iconSize },
		};

		const GoogleMapIframeRender = () => (
			<Fragment>
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
			</Fragment>
		);

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
						apiKey={ this.state.apiKey }
						updateApiKeyCallBack={ this.updateApiKey }
					/>
				) }
				{ isSelected && (
					<Controls { ...this.props } apiKey={ this.state.apiKey } />
				) }
				{ pinned ? (
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
						{ !! this.state.apiKey
							? ( compose( withProps( {
								googleMapURL:
									`https://maps.googleapis.com/maps/api/js?key=${ this.state.apiKey }` +
									`&language=${ locale }` +
									'&v=3.exp&libraries=geometry,drawing,places',
								loadingElement: <div style={ { height: '100%' } } />,
								containerElement: <div style={ { height: '100%' } } />,
								mapElement: <div style={ { height: '100%' } } />,
								coords: null,
								props: this.props,
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
												this.props.props.setAttributes( {
													pinned: false,
													hasError: __( 'Invalid API key, or too many requests', 'coblocks' ),
												} );
												return;
											}

											this.setState( {
												coords: results[ 0 ].geometry.location.toJSON(),
											} );

											this.props.props.setAttributes( {
												lat: results[ 0 ].geometry.location.toJSON().lat.toString(),
												lng: results[ 0 ].geometry.location.toJSON().lng.toString(),
												hasError: '',
											} );
										}.bind( this )
									);
								},
							} )
							)( ( props ) => [
								props.coords ? (
									<GoogleMap
										isMarkerShown={ true }
										defaultZoom={ props.props.attributes.zoom }
										defaultCenter={ new window.google.maps.LatLng( props.coords ) }
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
											position={ new window.google.maps.LatLng( props.coords ) }
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
								value={ this.state.address || '' }
								className="components-placeholder__input"
								placeholder={ __(
									'Search for a place or address…',
									'coblocks'
								) }
								onChange={ ( nextAddress ) =>
									this.setState( {
										address: nextAddress,
									} )
								}
							/>
							<Button
								isPrimary={ !! this.state.address }
								isSecondary={ ! this.state.address }
								type="submit"
								disabled={ ! this.state.address }
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
											setAttributes( { pinned: ! pinned } );
											this.setState( {
												address: this.props.attributes
													.address,
											} );
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
			</Fragment>
		);
	}
}

export default compose( [ withNotices ] )( Edit );

