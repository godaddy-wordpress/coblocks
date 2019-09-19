/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { RichText, InnerBlocks } = wp.blockEditor;

const deprecated = [
	{
		attributes: {
			...metadata.attributes,
			heading: {
				type: 'string',
				selector: '.wp-block-coblocks-author__heading',
			},
			textAlign: {
				type: 'string',
			},
		},

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
	},
];

export default deprecated;
