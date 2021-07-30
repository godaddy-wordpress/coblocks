/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { GithubIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner, Icon } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

const Gist = ( props ) => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ gistContent, setGistContent ] = useState( '' );
	const [ stylesheetAdded, setStylesheetAdded ] = useState( false );

	const url = props.url;
	const file = props.file;
	const gistCallback = props.callbackId;

	useEffect( () => {
		_buildGist();
	}, [] );

	const __addStylesheet = ( href ) => {
		if ( ! stylesheetAdded ) {
			const link = document.createElement( 'link' );
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = href;
			document.head.appendChild( link );
			setStylesheetAdded( true );
		}
	};

	const _buildGist = () => {
		window[ gistCallback ] = ( gist ) => {
			__addStylesheet( gist.stylesheet );
			setIsLoading( false );
			setGistContent( gist.div );
		};

		const gistScript = document.createElement( 'script' );
		gistScript.type = 'text/javascript';
		const transformedURL = _transformedURL( gistCallback );
		if ( ! transformedURL ) {
			return;
		}
		gistScript.src = transformedURL;
		gistScript.onerror = function() {
			_handleError();
		};
		document.head.appendChild( gistScript );
	};

	const _handleError = () => {
		const { onError } = props;
		setIsLoading( false );
		onError();
	};

	const _getID = () => {
		// Extract a string in form `username/uniqueValue` from the provided Gist url.
		if ( url.match( /(\.com\/)(.*?)([^#]+)/ ) === null ) {
			_handleError();
			return;
		}
		return url.match( /(\.com\/)(.*?)([^#]+)/ ).pop();
	};

	const _getFile = () => {
		// If `file` prop was provided return that.
		if ( file !== undefined ) {
			return `&file=${ file }`;
		}

		// Else construct the file parameter from the `url` prop.
		const fileSplit = url.split( '#' ).pop();

		// If the file parameter exist in Gist url return that file.
		if ( fileSplit.match( /file*/ ) !== null ) {
			return `&file=${ fileSplit.replace( 'file-', '' ).replace( '-', '.' ) }`;
		}

		// Else the user wants to link the whole Gist.
		return '';
	};

	const _transformedURL = ( callback ) => {
		// Construct a gist url that will allow us to render the Gist into our page.
		const id = _getID();
		if ( ! id ) {
			return false;
		}
		const fileName = _getFile();
		return `https://gist.github.com/${ id }.json?callback=${ callback }${ fileName }`;
	};

	if ( isLoading ) {
		return (
			<Placeholder
				key="placeholder"
				icon={ <Icon icon={ icon } /> }
				label={ __( 'Loading Gist', 'coblocks' ) }
			>
				<Spinner />
			</Placeholder>
		);
	}

	if ( gistContent ) {
		// Render as html.
		// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml\
		return <div dangerouslySetInnerHTML={ { __html: gistContent } } />;
	}

	return '';
};

export default Gist;

// - PROP TYPES -
Gist.propTypes = {
	file: PropTypes.string,
	onError: PropTypes.func,
	url: PropTypes.string.isRequired,
};
