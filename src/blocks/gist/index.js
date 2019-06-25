/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import icons from './../../utils/icons';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { createBlock, getBlockAttributes } = wp.blocks;
const { RichText } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'gist';

const title = __( 'Gist' );

const icon = icons.github;

const keywords = [
	__( 'code' ),
	__( 'github' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	url: {
		type: 'string',
	},
	file: {
		type: 'string',
	},
	meta: {
		type: 'boolean',
		default: true,
	},
	caption: {
		type: 'string',
		source: 'html',
		selector: 'figcaption',
	},
};

const schema = {
	div: {
		classes: [ 'wp-block-coblocks-gist' ],
	},
};

const settings = {

	title: title,

	description: __( 'Embed GitHub gists by adding the gist link.' ),

	keywords: keywords,

	attributes: blockAttributes,

	transforms: {
		from: [
			{
				type: 'raw',
				priority: 1,
				isMatch: ( node ) => node.nodeName === 'P' && /^\s*(https?:\/\/\S+)\s*$/i.test( node.textContent ) && node.textContent.match( /^https?:\/\/(www\.)?gist\.github\.com\/.+/i ),
				transform: ( node ) => {
					// Check for a file within the URL.
					const file = ( node.textContent.trim() ).split( '#' ).pop();
					const fileClean = file.replace('file-', '#file-').replace('-', '.');

					return createBlock( 'coblocks/gist', {
						url: node.textContent.trim(),
						file: file.match(/file*/) != null ? fileClean : undefined,
					} );
				},
			},
			{
				type: 'prefix',
				prefix: ':gist',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	supports: {
		html: false,
		align: [ 'wide' ],
	},

	edit: Edit,

	save( { attributes, className } ) {

		const {
			url,
			file,
			meta,
			caption,
		} = attributes;

		const classes = classnames( {
				[ 'no-meta' ] : ! meta,
			}
		);

		const src = file ? `${ url }.js?file=${ file }` : `${ url }.js`;

		const noscriptSrc = file ? `${ url }#file-${ file.replace('.', '-') }` : `${ url }`;

		return (
			<div className={ classes }>
				<script src={ src }/>
				<noscript><a href={ noscriptSrc }>{ __( 'View this gist on GitHub' ) }</a></noscript>
				{ ! RichText.isEmpty( caption ) && <RichText.Content tagName="figcaption" value={ caption } /> }
			</div>

		);
	},

	deprecated: [
		{
			save( { attributes, className } ) {

			const {
				url,
				file,
				meta,
			} = attributes;

			const classes = classnames( {
					[ 'wp-block-coblocks-gist--no-meta' ] : ! meta,
				}
			);

			const src = file ? `${ url }.js?file=${ file }` : `${ url }.js`;

			const noscriptSrc = file ? `${ url }#file-${ file.replace('.', '-') }` : `${ url }`;

			return (
				<div className={ classes }>
					<script src={ src }/>
					<noscript><a href={ noscriptSrc }>{ __( 'View this gist on GitHub' ) }</a></noscript>
				</div>

			);
		},
	}
	],
};

export { name, title, icon, settings };

