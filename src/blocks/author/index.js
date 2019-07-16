/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'author';

const title = __( 'Author' );

const icon = icons.author;

const keywords = [
	__( 'biography' ),
	__( 'profile' ),
	__( 'coblocks' ),
];

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

const settings = {

	title: title,

	description: __( 'Add an author biography.' ),

	keywords: keywords,

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
			{
				type: 'prefix',
				prefix: ':author',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit: Edit,

	save( { attributes } ) {

		const {
			biography,
			heading,
			imgUrl,
			name,
			textAlign,
		} = attributes;

		if ( name ) {
			return (
				<div style={ { textAlign: textAlign } }>
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
								tagName="span"
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
						<InnerBlocks.Content/>
					</div>
				</div>
			);
		}
		return null;
	},
}

export { name, title, icon, settings };
