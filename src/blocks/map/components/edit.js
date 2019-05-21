/**
 * External dependencies
 */
import classnames from 'classnames';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import { withProps, lifecycle } from 'recompose';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import GMapStyles from './map-styles';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Placeholder, Button, Spinner, TextControl, ResizableBox } = wp.components;
const { Fragment, Component } = wp.element;
const { ENTER} = wp.keycodes;

/**
 * Get settings.
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
});

const RETRIEVE_KEY_URL = 'https://cloud.google.com/maps-platform';
const HELP_URL = 'https://developers.google.com/maps/documentation/javascript/get-api-key';

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
		this.state = {
			apiKey: '',
			coords: null,
			hasError: false,
			isLoading: true,
			isSavedKey: false,
			isSaving: false,
			keySaved: false,
		}

		this.saveApiKey = this.saveApiKey.bind( this );

		settings.on( 'change:coblocks_google_maps_api_key', ( model ) => {
			const apiKey = model.get( 'coblocks_google_maps_api_key' );
			this.setState( { apiKey: settings.get( 'coblocks_google_maps_api_key' ), isSavedKey: ( apiKey === '' ) ? false : true  } );
		});

		settings.fetch().then( response => {
			this.setState({ apiKey: response.coblocks_google_maps_api_key });
			if ( this.state.apiKey && this.state.apiKey !== '' ) {
				this.setState({ isSavedKey: true });
			}

			this.setState({ isLoading: false });
		});

	}

	saveApiKey() {
		this.setState( { isSaving: true } );
		const model = new wp.api.models.Settings( { coblocks_google_maps_api_key: this.state.apiKey } );
		model.save().then( response => {
			this.setState({ isSavedKey: true, isLoading: false, isSaving: false, keySaved: true });
			settings.fetch();
		} );
	}

	render() {

		const {
			attributes,
			className,
			toggleSelection,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			address,
			apiKey,
			height,
			iconSize,
			pinned,
			skin,
			mapTypeControl,
			zoomControl,
			streetViewControl,
			fullscreenControl,
			hasError,
		} = attributes;

		const backgroundClasses = classnames(
			className,
		);

		const backgroundStyles = {
			minHeight: height ? height + 'px' : undefined,
			width: '100%',
		};

		const renderMap = () => {
			this.saveApiKey();

			if ( this.state.apiKey && this.state.apiKey !== '' ) {
				setAttributes( { pinned: true } );
				this.setState( { hasError: false } );
			} else {
				this.setState( { hasError: true } );
			}
		}

		const handleKeyDown = ( keyCode ) => {
			if ( keyCode !== ENTER ) {
				return;
			}
			renderMap();
		}

		const google = window.google;
		const icon = { url: '/wp-content/plugins/coblocks/dist/images/markers/' + skin + '.svg', scaledSize: { width: iconSize, height: iconSize } };

		const GoogleMapRender = compose(
			withProps({
				googleMapURL: ('https://maps.googleapis.com/maps/api/js?key='+ this.state.apiKey +'&v=3.exp&libraries=geometry,drawing,places'),
				loadingElement: (<div style={{ height: '100%' }} />),
				containerElement: (<div style={{ height: '100%' }} />),
				mapElement: (<div style={{ height: '100%' }} />),
				coords : null,
				props: this.props,
			}),
			withScriptjs,
			withGoogleMap,
			lifecycle( {
				componentDidMount() {
					let geocoder = new window.google.maps.Geocoder();
					geocoder.geocode( { 'address': address }, function( results, status ) {
						if (status == 'OK') {
							this.setState({
								coords: results[0].geometry.location.toJSON(),
							});

							this.props.props.setAttributes({
								lat: results[0].geometry.location.toJSON().lat.toString(),
								lng: results[0].geometry.location.toJSON().lng.toString(),
								hasError: '',
							});

						} else {
							this.props.props.setAttributes({
								pinned: false,
								hasError: __( 'Invalid API key, or too many requests' ),
							});
							console.log( 'Geocode was not successful for the following reason: ' + status );
						}
					}.bind( this ) );
	            }
	        } )
		)( props =>
			[
			props.coords ?
				<GoogleMap
					isMarkerShown ={ true }
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
					<Marker position={ new window.google.maps.LatLng( props.coords ) } icon={ icon } />
				</GoogleMap>
			:null
			]
		);

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ pinned ?
					<ResizableBox
						size={ {
							height: height,
							width: '100%',
						} }
						className={ classnames(
							{ 'is-selected': isSelected }
						) }
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
						onResizeStop={ ( event, direction, elt, delta ) => {
							setAttributes( {
								height: parseInt( height + delta.height, 10 ),
							} );
							toggleSelection( true );
						} }
						onResizeStart={ () => {
							toggleSelection( false );
						} }
					>
						{ this.state.apiKey &&
							<GoogleMapRender
								address={ address }
							/>
						}
					</ResizableBox>
				:
					<Placeholder
						icon={ icons.googleMap }
						label={  __( 'Google Map' ) }
						instructions={ ! this.state.isSavedKey ? __( 'Enter your Google API key to render a map.' ) : __( 'Enter an address to drop a pin on a Google map.' ) } >
						{ ( ! this.state.isSavedKey  ) ?
							<TextControl
								className="components-placeholder__input"
								value={ this.state.apiKey }
								onChange={ value => this.setState( { apiKey: value } ) }
								placeholder={ __( 'Enter Google API key…' ) }
								style={ ( this.state.hasError ) ? { border: '1px solid red' } : null }
							/>
						:
							<TextControl
								className="components-placeholder__input"
								value={ ( attributes.address ) ? attributes.address : '' }
								placeholder={ __( 'Search for a place or address…' ) }
								onChange={ ( nextAddress ) => this.props.setAttributes( { address: nextAddress } ) }
								onKeyDown={ ( { keyCode } ) => handleKeyDown( keyCode ) }
							/>
						}
						<Button
							isLarge
							type="button"
							onClick={ () => renderMap() }>
							{ __( 'Apply' ) }
						</Button>

						{ ( attributes.lng && attributes.hasError  ) ?
							<span class="invalid-google-maps-api-key">{ attributes.hasError }</span>
						: null }

						{ ( ! this.state.isSavedKey  ) ?
							<span><a href={ RETRIEVE_KEY_URL } target="_blank"> { __( 'Retrieve your key' ) }</a> | <a href={ HELP_URL } target="_blank">{ __( 'Need help?' ) }</a></span>
						: null }
					</Placeholder>
				}
			</Fragment>
		];
	}
}

export default Edit;
