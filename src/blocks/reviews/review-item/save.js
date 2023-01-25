/**
 * External dependencies
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * Internal dependencies
 */
import { renderRating } from './../utils';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'author', 'rating', 'localizedDate' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

const save = ( { attributes } ) => {
	const {
		author,
		avatarUrl,
		comment,
		localizedDate,
		rating,
	} = attributes;

	return isEmpty( attributes ) ? null : (
		<div>
			<div className="wp-block-coblocks-review-item__header">
				<img
					alt=""
					className="wp-block-coblocks-review-item__header__avatar"
					src={ avatarUrl }
				/>
				<div className="wp-block-coblocks-review-item__header__meta">
					<RichText.Content
						className="wp-block-coblocks-review-item__header__name"
						tagName="h3"
						value={ author }
					/>
					<p className="wp-block-coblocks-review-item__header__rating">
						{ renderRating( rating ) } { localizedDate }
					</p>
				</div>
			</div>

			{ ! RichText.isEmpty( comment ) && (
				<div className="wp-block-coblocks-review-item__comment">
					<RichText.Content
						tagName="p"
						value={ comment }
					/>
				</div>
			) }
		</div>
	);
};

export default save;
