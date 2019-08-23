/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const deprecated = [
	{
		save( { attributes } ) {
			const { url, file, meta } = attributes;

			const classes = classnames( {
				'wp-block-coblocks-gist--no-meta': ! meta,
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
				</div>
			);
		},
	},
];

export default deprecated;
