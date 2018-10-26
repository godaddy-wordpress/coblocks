/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Author from './components/author';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	biography: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-author__biography',
		default: [],
	},
	heading: {
		type: 'string',
		selector: '.wp-block-coblocks-author__heading',
		default: __( 'Written by...' ),
	},
	name: {
		type: 'string',
		selector: '.wp-block-coblocks-author__name',
	},
	imgId: {
		type: 'number',
	},
	imgUrl: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	textAlign: {
		type: 'string',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/author', {

	title: __( 'Author' ),

	description: __( 'Add an author biography.' ),

	icon: {
		src: icons.author,
	},

	category: 'coblocks',

	keywords: [
		__( 'biography' ),
		__( 'profile' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	transforms: {
		from: [
			{
				type: 'raw',
				selector: 'div.wp-block-coblocks-author',
				schema: {
					div: {
						classes: [ 'wp-block-coblocks-author' ],
					},
				},
			},
		],
	},

	edit: Edit,

	save: function( props ) {

		const {
			biography,
			heading,
			imgUrl,
			name,
			textAlign,
		} = props.attributes;

		if ( name ) {
			return (
				<Author { ...props }>
					{ imgUrl && (
						<div className={ 'wp-block-coblocks-author__avatar' }>
							<img
								class="wp-block-coblocks-author__avatar-img"
								src={ imgUrl }
								alt="avatar"
							/>
						</div>
					) }
					<div className={ 'wp-block-coblocks-author__content' }>
						{ ! RichText.isEmpty( heading ) && (
							<RichText.Content
								tagName="p"
								className="wp-block-coblocks-author__heading"
								value={ heading }
							/>
						) }
						{ ! RichText.isEmpty( name ) && (
							<RichText.Content
								tagName="h3"
								className="wp-block-coblocks-author__name"
								value={ name }
							/>
						) }
						{ ! RichText.isEmpty( biography ) && (
							<RichText.Content
								tagName="p"
								className="wp-block-coblocks-author__biography"
								value={ biography }
							/>
						) }
						<InnerBlocks.Content />
					</div>
				</Author>
			);
		}
		return null;
	},
} );