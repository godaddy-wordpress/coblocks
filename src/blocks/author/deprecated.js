/* eslint-disable sort-keys */
/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
					<div style={ { textAlign } }>
						{ imgUrl && (
							<div className={ 'wp-block-coblocks-author__avatar' }>
								<img
									alt="avatar"
									className="wp-block-coblocks-author__avatar-img"
									src={ imgUrl }
								/>
							</div>
						) }
						<div className={ 'wp-block-coblocks-author__content' }>
							{ ! RichText.isEmpty( heading ) && (
								<RichText.Content
									className="wp-block-coblocks-author__heading"
									tagName="p"
									value={ heading }
								/>
							) }
							{ ! RichText.isEmpty( name ) && (
								<RichText.Content
									className="wp-block-coblocks-author__name"
									tagName="span"
									value={ name }
								/>
							) }
							{ ! RichText.isEmpty( biography ) && (
								<RichText.Content
									className="wp-block-coblocks-author__biography"
									tagName="p"
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
