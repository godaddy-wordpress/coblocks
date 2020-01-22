/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const { url, file, meta, caption } = attributes;

	if ( 'undefined' === typeof url ) {
		return;
	}

	const classes = classnames( {
		'no-meta': ! meta,
	} );

	const src = file ? `${ url }.js?file=${ file }` : `${ url }.js`;

	const noscriptSrc = file ?
		`${ url }#file-${ file.replace( '.', '-' ) }` :
		`${ url }`;

	return (
		<div className={ classes }>
			<script src={ src } />
			<noscript>
				<a href={ noscriptSrc }>{ __( 'View this gist on GitHub', 'coblocks' ) }</a>
			</noscript>
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content tagName="figcaption" value={ caption } />
			) }
		</div>
	);
};

export default save;
