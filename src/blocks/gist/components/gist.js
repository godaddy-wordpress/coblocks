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
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Placeholder, Spinner } = wp.components;

// -- MAIN --
// Extending PureComponent allow us to prevent re-rendering when the props DONT change.
export default class Gist extends Component {
	constructor( props ) {
		super( props );
		this.url = props.url;
		this.file = props.file;
		this.stylesheetAdded = false; // Ensures we only add the Gist's stylesheet one time.
		this.state = {
			loading: true, // We have not fetched the Gist yet.
			gistContent: '', // Raw HTML of the Gist.
		};
	}

	// Each time we request a new Gist, we have to provide a new
	// global function name to serve as the JSONP callback.
	static __gistCallbackId() {
		return 0;
	}

	static __nextGist() {
		return 'embed_gist_callback_' + this.__gistCallbackId++;
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
		// Request the Gist iframe.
		this._buildGist();
	}

	_getID() {
		// Extract a string in form `username/uniqueValue` from the provided Gist url.
		return this.url.match( /(\.com\/)(.*?)([^#]+)/ ).pop();
	}

	_getFile() {
		// If `file` prop was provided return that.
		if ( this.file !== undefined ) {
			return `&file=${ this.file }`;
		}

		// Else construct the file parameter from the `url` prop.
		const file = this.url.split( '#' ).pop();

		// If the file parameter exist in Gist url return that file.
		if ( file.match( /file*/ ) !== null ) {
			return `&file=${ file.replace( 'file-', '' ).replace( '-', '.' ) }`;
		}

		// Else the user wants to link the whole Gist repository.
		return '';
	}

	_tranformedURL( gistCallback ) {
		// Construct a gist url that will allow us to redner the Gist into our page.
		const id = this._getID();
		const file = this._getFile();

		return `https://gist.github.com/${ id }.json?callback=${ gistCallback }${ file }`;
	}

	_buildGist() {
		const gistCallback = Gist.__nextGist();
		window[ gistCallback ] = gist => {
			Gist.__addStylesheet( gist.stylesheet );
			this.setState( {
				loading: false,
				gistContent: gist.div,
			} );
		};

		const gistScript = document.createElement( 'script' );
		gistScript.type = 'text/javascript';
		gistScript.src = this._tranformedURL( gistCallback );
		document.head.appendChild( gistScript );
	}

	render() {
		if ( this.state.loading ) {
			return [
				<Placeholder
					key="placeholder"
					icon={ icons.github }
					label={ __( 'Loading Gist' ) }
				>
					<Spinner />
				</Placeholder>,
			];
		}
		// Render as html.
		// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
		return <div dangerouslySetInnerHTML={ { __html: this.state.gistContent } } />;
	}
}

// - PROP TYPES -
Gist.propTypes = {
	url: PropTypes.string.isRequired,
	file: PropTypes.string,
};
