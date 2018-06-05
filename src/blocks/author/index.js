/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Author from './components/author';
import AuthorBlock from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/author', {

	title: __( 'Author' ),

	description: __( 'Add an author biography.' ),

	icon: 'admin-users',

	category: 'common',

	keywords: [
		__( 'biography' ),
		__( 'profile' ),
		__( 'coblocks' ),
	],

	attributes: {
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
	},

	edit: AuthorBlock,

	save: function( props ) {

		const {
			biography,
			buttonText,
			buttonUrl,
			heading,
			name,
			imgUrl,
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
								<p>{ heading }</p>
							</div>
						) }

						{ name && name.length > 0 && (
							<div className={ 'wp-block-coblocks-author__content-name' }>
								<h3>{ name }</h3>
							</div>
						) }

						{ biography && biography.length > 0 && (
							<div className={ 'wp-block-coblocks-author__content-biography' }>
								<p>{ biography }</p>
							</div>
						) }

						{ buttonText && buttonText.length > 0 && (
							<a className={ 'wp-block-coblocks-author__content-button' } href={ buttonUrl }>
								{ buttonText }
							</a>
						) }

					</div>

				</Author>
			);
		}

		return null;
	},
} );