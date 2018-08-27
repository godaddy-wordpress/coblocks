/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Author from './components/author';
import Edit from './components/edit';
import icons from './components/icons';

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
		selector: '.wp-block-coblocks-author__content-biography p',
		source: 'children',
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
						{ heading && heading.length > 0 && (
							<div className={ 'wp-block-coblocks-author__content-heading' }>
								<RichText.Content
									tagName="p"
									value={ heading }
								/>
							</div>
						) }
						{ name && name.length > 0 && (
							<div className={ 'wp-block-coblocks-author__content-name' }>
								<RichText.Content
									tagName="h3"
									value={ name }
								/>
							</div>
						) }
						{ biography && biography.length > 0 && (
							<div className={ 'wp-block-coblocks-author__content-biography' }>
								<RichText.Content
									tagName="p"
									value={ biography }
								/>
							</div>
						) }
						{ buttonText && buttonText.length > 0 && (
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