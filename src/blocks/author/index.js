
/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './components/edit';
import icons from './../../utils/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.author;

const settings = {
	title: __( 'Author' ),
	description: __( 'Add an author biography.' ),
	keywords: [ __( 'biography' ), __( 'profile' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
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
	edit,
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
								className="wp-block-coblocks-author__avatar-img"
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
						<InnerBlocks.Content />
					</div>
				</div>
			);
		}
		return null;
	},
};

export { name, icon, settings };
