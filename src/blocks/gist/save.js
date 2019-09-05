/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;

const save = ( { attributes } ) => {
	const { url, file, meta, caption } = attributes;

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
				<a href={ noscriptSrc }>{ __( 'View this gist on GitHub' ) }</a>
			</noscript>
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content tagName="figcaption" value={ caption } />
			) }
		</div>
	);
};

export default save;
