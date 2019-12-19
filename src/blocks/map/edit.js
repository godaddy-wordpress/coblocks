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

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import GMapStyles from './map-styles';
import icon from './icon';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
	Placeholder,
	Button,
	TextControl,
	ResizableBox,
	withNotices,
} from '@wordpress/components';
import { Fragment, Component } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import { BlockIcon } from '@wordpress/block-editor';

/**
 * Get settings.
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			apiKey: '',
			address: this.props.attributes.address,
			coords: null,
			hasError: false,
			isLoading: true,
			isSavedKey: false,
			isSaving: false,
			keySaved: false,
		};

		settings.on( 'change:coblocks_google_maps_api_key', model => {
			const apiKey = model.get( 'coblocks_google_maps_api_key' );
			this.setState( {
				apiKey: settings.get( 'coblocks_google_maps_api_key' ),
				isSavedKey: apiKey !== '',
			} );
		} );

		settings.fetch().then( response => {
			this.setState( { apiKey: response.coblocks_google_maps_api_key } );
			if ( this.state.apiKey && this.state.apiKey !== '' ) {
				this.setState( { isSavedKey: true } );
			}

			this.setState( { isLoading: false } );
		} );

		this.updateApiKey = this.updateApiKey.bind( this );
		this.saveApiKey = this.saveApiKey.bind( this );
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
			this.props.setAttributes( { address: this.state.address, pinned: true } );
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
		this.setState( { apiKey, isSaving: true } );
		const model = new wp.api.models.Settings( {
			coblocks_google_maps_api_key: apiKey,
		} );
		model.save().then( () => {
			this.setState( {
				isSavedKey: true,
				isLoading: false,
				isSaving: false,
				keySaved: true,
			} );
			settings.fetch();
		} );
	}

	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

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

		const renderMap = () => {
			setAttributes( { address: this.state.address, pinned: true } );
		};

		const handleKeyDown = keyCode => {
			if ( keyCode !== ENTER ) {
				return;
			}

			renderMap();
		};

		const marker = {
			url: '/wp-content/plugins/coblocks/dist/images/markers/' + skin + '.svg',
			scaledSize: { width: iconSize, height: iconSize },
		};

		const GoogleMapApiRender = compose(
			withProps( {
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
						{ address: address },
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
		)( props => [
			props.coords ? (
				<GoogleMap
					isMarkerShown={ true }
					defaultZoom={ props.props.attributes.zoom }
					defaultCenter={ new window.google.maps.LatLng( props.coords ) }
					defaultOptions={ {
						styles: GMapStyles[ skin ],
						draggable: false,
						mapTypeControl: mapTypeControl,
						zoomControl: zoomControl,
						streetViewControl: streetViewControl,
						fullscreenControl: fullscreenControl,
					} }
				>
					<Marker
						position={ new window.google.maps.LatLng( props.coords ) }
						icon={ marker }
					/>
				</GoogleMap>
			) : null,
		] );

		const GoogleMapIframeRender = (
			<Fragment>
				<div style={ { width: '100%', height, position: 'absolute' } } />
				<div className="iframe__overflow-wrapper">
					<iframe
						title={ __( 'Google Map', 'coblocks' ) }
						frameBorder="0"
						style={ { width: '100%', minHeight: height + 'px' } }
						src={ `https://www.google.com/maps?q=${ encodeURIComponent( address ) }&output=embed&hl=${ locale }&z=${ zoom }` }
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
				{ isSelected && <Controls { ...this.props } apiKey={ this.state.apiKey } /> }
				{ pinned ? (
					<ResizableBox
						size={ {
							height: height,
							width: '100%',
						} }
						className={ classnames( { 'is-selected': isSelected } ) }
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
					>
						{ !! this.state.apiKey ? (
							<GoogleMapApiRender address={ address } />
						) : (
							GoogleMapIframeRender
						) }
					</ResizableBox>
				) : (
					<Placeholder
						icon={ <BlockIcon icon={ icon } /> }
						label={ __( 'Google Map', 'coblocks' ) }
						instructions={ __(
							'Enter a location or address to drop a pin on a Google map.', 'coblocks'
						) }
					>
						<TextControl
							className="components-placeholder__input"
							value={ this.state.address }
							placeholder={ __( 'Search for a place or address…', 'coblocks' ) }
							onChange={ nextAddress => this.setState( { address: nextAddress } ) }
							onKeyDown={ ( { keyCode } ) => handleKeyDown( keyCode ) }
						/>
						<Button isLarge type="button" onClick={ renderMap } disabled={ ! this.state.address }>
							{ __( 'Apply', 'coblocks' ) }
						</Button>

						{ address && (
							<Button
								className="components-placeholder__cancel-button"
								title={ __( 'Cancel', 'coblocks' ) }
								isLink
								onClick={ () => {
									setAttributes( { pinned: ! pinned } );
									this.setState( { address: this.props.attributes.address } );
								} }
								disabled={ ! address }
							>
								{ __( 'Cancel', 'coblocks' ) }
							</Button>
						) }
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
