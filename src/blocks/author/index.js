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
const { RichText } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	biography: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-author__content-biography-text',
		default: [],
	},
	buttonText: {
		type: 'string',
		selector: '.wp-block-coblocks-author__content-button',
		default: __( 'Follow' ),
	},
	buttonUrl: {
		type: 'string',
	},
	heading: {
		type: 'string',
		selector: '.wp-block-coblocks-author__content-heading',
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
	name: {
		type: 'string',
		selector: '.wp-block-coblocks-author__content-name',
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
			buttonText,
			buttonUrl,
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
							<div className={ 'wp-block-coblocks-author__content-heading' }>
								<RichText.Content
									tagName="p"
									value={ heading }
								/>
							</div>
						) }
						{ ! RichText.isEmpty( name ) && (
							<div className={ 'wp-block-coblocks-author__content-name' }>
								<RichText.Content
									tagName="h3"
									value={ name }
								/>
							</div>
						) }
						{ ! RichText.isEmpty( biography ) && (
							<div className={ 'wp-block-coblocks-author__content-biography' }>
								<RichText.Content
									tagName="p"
									value={ biography }
									className={ 'wp-block-coblocks-author__content-biography-text' }
								/>
							</div>
						) }
						{ ! RichText.isEmpty( buttonText ) && (
							<RichText.Content
								tagName="a"
								className={ 'wp-block-coblocks-author__content-button' }
								value={ buttonText }
								href={ buttonUrl }
							/>
						) }
					</div>
				</Author>
			);
		}
		return null;
	},
} );