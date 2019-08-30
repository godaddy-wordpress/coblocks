/**
 * External dependencies
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';

const isEmpty = attributes => {
	const attributesToCheck = [ 'heading', 'name', 'imgUrl', 'biography' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

/**
 * WordPress dependencies
 */
const { RichText, InnerBlocks } = wp.blockEditor;

const save = ( { attributes } ) => {
	const {
		biography,
		heading,
		imgUrl,
		name,
	} = attributes;

	return isEmpty( attributes ) ? null : (
		<div>
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
};

export default save;
