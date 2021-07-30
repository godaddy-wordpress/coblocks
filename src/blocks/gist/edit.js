/**
 * External dependencies
 */
import classnames from 'classnames';
import { GithubIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import Gist from './gist';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { PlainText, RichText } from '@wordpress/block-editor';
import { withNotices, Icon } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

const Edit = ( props ) => {
	const [ preview, setPreview ] = useState( false );
	const [ newFile, setNewFile ] = useState( props.attributes.file ? props.attributes.file : '' );
	const [ gistCallbackId, setGistCallbackId ] = useState( '' );

	useEffect( () => {
		if ( !! gistCallbackId === false ) {
			setGistCallbackId( Edit.__nextGist() );
		}
	}, [ gistCallbackId ] );

	useEffect( () => {
		if ( !! props.attributes.url ) {
			setPreview( true );
		}
	}, [] );

	useEffect( () => {
		if ( props.attributes.url ) {
			const gistId = parseGistId( props.attributes.url );

			fetch( 'https://api.github.com/gists/' + gistId )
				.then( ( data ) => data.json() )
				// Retrieve the list of files that are the keys of the JSON object
				.then( ( json ) => Object.keys( json.files ) )
				.then( ( keys ) => {
					// Transform app.js to App.js, for example
					const normalizedFilename = getFileNameWithCapitalization( newFile, keys );
					props.setAttributes( { file: normalizedFilename } );

					setPreview( true );
				} );
		}
	}, [ newFile ] );

	const parseGistId = ( url ) => {
		const [ gistId ] = url.split( '/' ).slice( -1 );

		return gistId;
	};

	const getFileNameWithCapitalization = ( fileName, gistFiles ) => {
		const fileFound = gistFiles.filter( ( file ) => file.toLowerCase() === fileName.toLowerCase() );

		// It is possible for a gist to contain two files that differentiate name only by case.
		// We will return the first file just like Gist api behavior.
		if ( fileFound.length > 0 ) {
			return fileFound[ 0 ];
		}

		// If no file found, we will load all the gist
		return '';
	};

	const updateURL = ( newURL = '' ) => {
		// While URL is editing enter preview state
		setPreview( false );

		// A forward slash suffix will result in not found error from Gist API so remove it here.
		const normalizeURL = newURL.trim()
			// Remove foward slash suffix at end of string.
			.replace( /\/$/, '' )
			// Remove forward slash suffix between `#file-` indicator.
			.replace( /(.*)(\/)(#file-.*)/, '$1$3' );

		// Handle no specified file.
		if ( normalizeURL.match( /#file-*/ ) === null ) {
			setNewFile( '' );
			props.setAttributes( { url: normalizeURL } );

			clearErrors();
			return;
		}

		// Check for #file in the entered URL. If it's there, let's use it properly.
		const file = normalizeURL.split( '#file-' ).pop();

		// File specified.
		const newURLWithNoFile = normalizeURL.replace( file, '' ).replace( '#file-', '' );
		setNewFile( file.replace( /-([^-]*)$/, '.' + '$1' ) );
		props.setAttributes( { url: newURLWithNoFile } );

		clearErrors();
	};

	const handleErrors = () => {
		const { noticeOperations } = props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( 'Sorry, this URL is not a GitHub Gist.' );
		setPreview( false );
	};

	const clearErrors = () => {
		const { noticeOperations } = props;
		noticeOperations.removeAllNotices();
	};

	const {
		attributes,
		className,
		isSelected,
		setAttributes,
		noticeUI,
	} = props;

	const { url, file, meta, caption } = attributes;

	return (
		<>
			{ url && url.length > 0 && isSelected &&
				<Controls
					preview={ preview }
					setPreview={ setPreview }
				/>
			}
			{ url && url.length > 0 && isSelected &&
				<Inspector
					updateURL={ updateURL }
					setPreview={ setPreview }
					setNewFile={ setNewFile }
					newFile={ newFile }
					{ ...props }
				/>
			}
			{ preview ? (
				url && (
					<div className={ classnames( className, meta ? null : 'no-meta' ) }>
						<Gist url={ url } file={ file } callbackId={ gistCallbackId } onError={ () => {
							handleErrors();
						} } />
						{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
							<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption…', 'coblocks' ) }
								value={ caption }
								onChange={ ( value ) => setAttributes( { caption: value } ) }
								keepPlaceholderOnFocus
								inlineToolbar
							/>
						) }
					</div>
				)
			) : (
				<>
					{ noticeUI }
					<div className={ className }>
						<label htmlFor={ `gist-url-input-${ props.clientId }` }>
							<Icon icon={ icon } />
							{ __( 'Gist URL', 'coblocks' ) }
						</label>
						<PlainText
							id={ `gist-url-input-${ props.clientId }` }
							className="input-control"
							value={ url }
							placeholder={ __( 'Add GitHub Gist URL…', 'coblocks' ) }
							onChange={ updateURL }
						/>
					</div>
				</>
			) }

		</>
	);
};

Edit.__gistCallbackId = 0;

// Each time we request a new Gist, we have to provide a new
// global function name to serve as the JSONP callback.
Edit.__nextGist = () => {
	return 'embed_gist_callback_' + Edit.__gistCallbackId++;
};

export default compose( withNotices )( Edit );
