/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import icons from './components/icons';
import GistBlock from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/gist', {

	title: __( 'Gist' ),

	description: __( 'Embed GitHub gists by adding the gist link.' ),

	icon: {
		src: icons.github,
	},

	category: 'common',

	keywords: [
		__( 'code' ),
		__( 'github' ),
		__( 'coblocks' ),
	],

	attributes: {
		url: {
			type: 'string',
		},
		file: {
			type: 'string',
		},
		meta: {
			type: 'boolean',
			default: false,
		}
	},

	supports: {
		html: false,
	},

	edit: GistBlock,

	save( { attributes, className } ) {

		const { url, file, meta } = attributes;

		const src = file ? `${ url }.js?file=${ file }` : `${ url }.js`;

		return (
			<div
				className={ classnames(
					className,
					meta ? null : `wp-block-coblocks-gist--no-meta`,
				) }
			>
				<script src={ src }/>
			</div>

		);
	},
} );
