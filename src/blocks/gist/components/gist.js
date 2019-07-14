/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockIcon } = wp.blockEditor;
const { Placeholder, Spinner, withNotices, Button } = wp.components;

// -- MAIN --
// Extending PureComponent allow us to prevent re-rendering when the props DONT change.
class Gist extends Component {
	constructor( props ) {
		super( props );
		console.log( props );
		this.stylesheetAdded = false; // Ensures we only add the Gist's stylesheet one time.
		this.icon = props.icon;
		this.label = props.label;
		this.onSubmit = props.onSubmit;
		this.onChange = props.onChange;
		this.updateURL = props.updateURL;
		this.state = {
			url: this.props.url,
			file: this.props.editProps.attributes.file,
			error: false, // If error loading Gist url.
			loading: false, // We have not fetched the Gist yet.
			gistContent: '', // Raw HTML of the Gist.
		};
		this._handleScriptError = this._handleScriptError.bind( this );
		this._buildGist = this._buildGist.bind( this );
		this._setUrlTrigger = this._setUrlTrigger.bind( this );
	}

	// Each time we request a new Gist, we have to provide a new
	// global function name to serve as the JSONP callback.
	static __gistCallbackId() {
		return 0;
	}

	static __nextGist() {
		return 'embed_gist_callback_' + 0;
	}

	// The Gist JSON data includes a stylesheet file.
	// We ensure to add that file only one time in our page.
	static __addStylesheet( href ) {
		if ( ! this.stylesheetAdded ) {
			const link = document.createElement( 'link' );
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = href;
			document.head.appendChild( link );
			this.stylesheetAdded = true;
		}
	}

	componentDidMount() {
		const { _handleScriptError } = this;
		console.log( this.props );
		console.log( this.state );
		if ( ! this.state.url ) {
			return;
		}
		// Request the Gist iframe.
		this._buildGist();
	}

	_getID() {
		// Extract a string in form `username/uniqueValue` from the provided Gist url.
		return this.state.url.match( /(\.com\/)(.*?)([^#]+)/ ).pop();
	}

	_getFile() {
		// If `file` prop was provided return that.
		if ( this.state.file !== undefined ) {
			return `&file=${ this.state.file }`;
		}

		// Else construct the file parameter from the `url` prop.
		const file = this.state.url.split( '#' ).pop();

		// If the file parameter exist in Gist url return that file.
		if ( file.match( /file*/ ) !== null ) {
			return `&file=${ file.replace( 'file-', '' ).replace( '-', '.' ) }`;
		}

		// Else the user wants to link the whole Gist repository.
		return '';
	}

	_tranformedURL( gistCallback ) {
		// Construct a gist url that will allow us to render the Gist into our page.
		const id = this._getID();
		const file = this._getFile();

		return `https://gist.github.com/${ id }.json?callback=${ gistCallback }${ file }`;
	}

	_handleScriptError() {
		this.props.noticeOperations.createErrorNotice( 'Error message' );
		this.setState( {
			error: true,
			loading: false,
			gistContent: '',
		} );
	}

	_buildGist() {
		const { _handleScriptError } = this;
		const gistCallback = Gist.__nextGist();
		window[ gistCallback ] = gist => {
			Gist.__addStylesheet( gist.stylesheet );
			this.setState( {
				error: false,
				gistContent: gist.div,
			} );
		};
		const gistScript = document.createElement( 'script' );
		gistScript.type = 'text/javascript';
		gistScript.src = this._tranformedURL( gistCallback );
		gistScript.onerror = function( err ) {
			_handleScriptError();
		};
		document.head.appendChild( gistScript );
		this.setState( { rendered: true } );
	}

	_setUrlTrigger() {
		console.log( this.state );
		this.setState( { url: this.props.editProps.attributes.url } );
	}

	render() {
		const {
			// noticeOperations,
			noticeUI,
			// icon,
			// label,
			value,
			// onSubmit,
			// onChange,
			// cannotEmbed,
			// fallback,
			// tryAgain,
			// url,
			// file,
			// updateURL,
		} = this.props;

		const { _buildGist, _setUrlTrigger } = this;
		return (
			<Fragment>
				{ this.state.error ? noticeUI : null }
				{ this.state.loading && ! this.state.rendered ? (
					<Placeholder
						key="placeholder"
						icon={ icons.github }
						label={ __( 'Loading Gist' ) }
					>
						<Spinner />
					</Placeholder>
				) : null }
				{ ! this.state.loading ? (
					<Placeholder
						icon={ <BlockIcon icon={ this.icon } showColors /> }
						label={ this.label }
						className="wp-block-embed"
					>
						<form
							onSubmit={ event => {
								event.preventDefault();
								console.log( value );
								this.updateURL( value );
								_setUrlTrigger();
							} }
						>
							<input
								type="url"
								value={ value || '' }
								className="components-placeholder__input"
								aria-label={ this.label }
								placeholder={ __( 'Enter URL to embed here…' ) }
								onChange={ this.onChange }
							/>
							<Button isLarge type="submit">
								{ _x( 'Embed', 'button label' ) }
							</Button>
							{
								//cannotEmbed && (
								// <p className="components-placeholder__error">
								// 	{ __( 'Sorry, this content could not be embedded.' ) }
								// 	<br />
								// 	<Button isLarge onClick={ tryAgain }>
								// 		{ _x( 'Try again', 'button label' ) }
								// 	</Button>{ ' ' }
								// 	<Button isLarge onClick={ fallback }>
								// 		{ _x( 'Convert to link', 'button label' ) }
								// 	</Button>
								// </p>
								//)
							}
						</form>
					</Placeholder>
				) : null }
				{ this.state.rendered ? (
					// Render as html.
					// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
					<div dangerouslySetInnerHTML={ { __html: this.state.gistContent } } />
				) : null }
			</Fragment>
		);
	}
}

export default withNotices( Gist );

// - PROP TYPES -
Gist.propTypes = {
	url: PropTypes.string.isRequired,
	file: PropTypes.string,
};
