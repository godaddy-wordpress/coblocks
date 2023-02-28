/**
 * Internal dependencies
 */
import fromEntries from '../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../utils/block-helpers';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'name', 'imgUrl', 'biography' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

const save = ( { attributes } ) => {
	const {
		biography,
		imgUrl,
		name,
	} = attributes;

	const saveBlockProps = useBlockProps.save( );

	return isEmpty( attributes ) ? null : (
		<div { ...saveBlockProps } >
			{ imgUrl && (
				<figure className="wp-block-coblocks-author__avatar">
					<img alt={ name } className="wp-block-coblocks-author__avatar-img" src={ imgUrl } />
				</figure>
			) }
			<div className={ 'wp-block-coblocks-author__content' }>
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
};

export default save;
