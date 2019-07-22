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

// Extending PureComponent allow us to prevent re-rendering when the props DONT change.
class Gist extends Component {
	constructor( props ) {
		super( props, ...arguments );
		this.stylesheetAdded = false; // Ensures we only add the Gist's stylesheet one time.
		this.state = {
			url: this.props.value,
			file: this.props.file,
			error: false, // If error loading Gist url.
			loading: false, // We have not fetched the Gist yet.
			gistContent: '', // Raw HTML of the Gist.
			rendered: '',
			// preview: this.props.preview,
		};
		this._handleScriptError = this._handleScriptError.bind( this );
		this._buildGist = this._buildGist.bind( this );
		this._formOnSubmit = this._formOnSubmit.bind( this );
		this._setupURL = this._setupURL.bind( this );
		this._getFile = this._getFile.bind( this );
		this._getID = this._getID.bind( this );
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
		if ( ! this.props.url ) {
			return;
		}
		// Request the Gist iframe.
		this._buildGist();
	}

	_getID() {
		// Extract a string in form `username/uniqueValue` from the provided Gist url.
		let urlToParse;
		if ( this.props.url ) {
			urlToParse = this.props.url;
		} else if ( this.props.value ) {
			urlToParse = this.props.value;
		}
		if ( urlToParse.match( /(\.com\/)(.*?)([^#]+)/ ) === null ) {
			return null;
		}
		return urlToParse.match( /(\.com\/)(.*?)([^#]+)/ ).pop();
	}

	_getFile() {
		// If `file` prop was provided return that.
		if ( this.state.file !== undefined ) {
			return `&file=${ this.state.file }`;
		}

		let urlToParse;
		if ( this.state.value ) {
			urlToParse = this.state.value;
		} else if ( this.state.url ) {
			urlToParse = this.state.url;
		}

		// Else construct the file parameter from the `value` prop.
		const file = urlToParse.split( '#' ).pop();

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
		if ( id === null ) {
			this._handleScriptError();
			return;
		}
		const file = this._getFile();

		return `https://gist.github.com/${ id }.json?callback=${ gistCallback }${ file }`;
	}

	_handleScriptError( err ) {
		console.log( 'script error' );
		this.props.noticeOperations.createErrorNotice( err );
		this.setState( {
			error: true,
			loading: false,
		} );
		this.props.changePreviewState();
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
		if ( this.state.rendered !== this._tranformedURL( gistCallback ) ) {
			console.log( this._tranformedURL( gistCallback ) );
			gistScript.src = this._tranformedURL( gistCallback );
		} else {
			this.setState( { loading: false } );
			this.props.changePreviewState();
			return;
		}

		gistScript.onerror = function( err ) {
			_handleScriptError( err );
		};
		document.head.appendChild( gistScript );
		this.setState( { rendered: gistScript.src, loading: false } );
	}

	_formOnSubmit( event ) {
		event.preventDefault();
		this.setState( { loading: true } );
		// if ( this.state.rendered !== this.state.url ) {
		// 	console.log( this.props.url );
		// 	console.log( this.props.value );
		// 	this.props.changePreviewState();
		// 	this.setState( { loading: false } );
		// } else {
		this._setupURL( this.props.value );
		// }
	}

	_setupURL( newURL ) {
		this.setState( {
			url: newURL,
		} );
		// Check for #file in the entered URL. If it's there, let's use it properly.
		let file = newURL.split( '#file-' ).pop();

		if ( file ) {
			file = '#file-' + file;
		}

		if ( newURL.match( /#file-*/ ) !== null ) {
			const newURLWithNoFile = newURL.replace( file, '' ).replace( '#file-', '' );
			this.setState(
				{
					url: newURLWithNoFile,
					file: file.replace( /-([^-]*)$/, '.' + '$1' ),
				},
				() => {
					const urlProps = {
						urlText: this.props.value,
						url: this.state.url,
						file: this.state.file,
					};
					this.props.updateURL( urlProps );
					this._buildGist();
				}
			);
		} else {
			this.setState(
				{
					file: file,
				},
				() => {
					const urlProps = {
						urlText: this.props.value,
						url: this.state.url,
						file: this.state.file,
					};
					this.props.updateURL( urlProps );
					this._buildGist();
				}
			);
		}
		// Render as html.
		// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
		// return <div dangerouslySetInnerHTML={ { __html: this.state.gistContent } } />;
	}

	render() {
		const {
			// noticeOperations,
			noticeUI,
			icon,
			label,
			value,
			onChange,
			// cannotEmbed,
			// fallback,
			// tryAgain,
			// url,
			// file,
			// ,
		} = this.props;

		const { _formOnSubmit } = this;
		return (
			<Fragment>
				{ this.state.error ? noticeUI : null }
				{ this.state.loading && (
					<Placeholder
						key="placeholder"
						icon={ icons.github }
						label={ __( 'Loading Gist' ) }
					>
						<Spinner />
					</Placeholder>
				) }
				{ /* { ! this.state.loading && ! this.state.rendered ? */
					! this.props.preview && (
						<Placeholder
							icon={ <BlockIcon icon={ icon } showColors /> }
							label={ label }
							className="wp-block-embed"
						>
							<form onSubmit={ event => _formOnSubmit( event ) }>
								<input
									type="url"
									value={ value || '' }
									className="components-placeholder__input"
									aria-label={ label }
									placeholder={ __( 'Enter URL to embed here…' ) }
									onChange={ onChange }
								/>
								<Button isLarge type="submit" disabled={ this.props.value.length <= 0 }>
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
					) }
				{ this.props.preview ? (
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
