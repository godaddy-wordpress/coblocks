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
const { registerBlockType, createBlock } = wp.blocks;

/**
 * Block attributes
 */
const blockAttributes = {
	url: {
		type: 'string',
	},
	file: {
		type: 'string',
	},
	meta: {
		type: 'boolean',
		default: false,
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/gist', {

	title: __( 'Gist' ),

	description: __( 'Embed GitHub gists by adding the gist link.' ),

	icon: {
		src: icons.github,
	},

	category: 'coblocks',

	keywords: [
		__( 'code' ),
		__( 'github' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	transforms: {
		from: [
			{
				type: 'raw',
				isMatch: ( node ) => node.nodeName === 'P' && /^\s*(https?:\/\/\S+)\s*$/i.test( node.textContent ) && node.textContent.match( /^https?:\/\/(www\.)?gist\.github\.com\/.+/i ),
				transform: ( node ) => {

					// Check for a file within the URL.
					const file = ( node.textContent.trim() ).split( '#' ).pop();
					const fileClean = file.replace('file-', '').replace('-', '.');

					return createBlock( 'coblocks/gist', {
						url: node.textContent.trim(),
						file: file.match(/file*/) != null ? fileClean : undefined,
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

		const { url, file, meta } = attributes;

		const src = file ? `${ url }.js?file=${ file }` : `${ url }.js`;

		const noscriptSrc = file ? `${ url }#file-${ file.replace('.', '-') }` : `${ url }`;

		return (
			<div
				className={ classnames(
					className,
					meta ? null : `wp-block-coblocks-gist--no-meta`,
				) }
			>
				<script src={ src }/>
				<noscript><a href={ noscriptSrc }>{ __( 'View this gist on GitHub' ) }</a></noscript>
			</div>

		);
	},
} );
