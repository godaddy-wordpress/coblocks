/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;

export default function save( { attributes } ) {
	return hasEmptyAttributes( attributes ) ? null : (
		<div className={ attributes.className }>
			{ attributes.showImage && attributes.imageUrl && (
				<figure className="wp-block-coblocks-menu-item__image">
					<img src={ attributes.imageUrl } alt={ '' } />
				</figure>
			) }
			<div className="wp-block-coblocks-menu-item__content">
				<RichText.Content
					tagName="h4"
					className="wp-block-coblocks-menu-item__heading"
					value={ attributes.title }
				/>
				<RichText.Content
					tagName="p"
					className="wp-block-coblocks-menu-item__description"
					value={ attributes.description }
				/>
				{ attributes.showPrice && (
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-menu-item__price"
						value={ attributes.itemPrice }
					/>
				) }
			</div>
		</div>
	);
}
