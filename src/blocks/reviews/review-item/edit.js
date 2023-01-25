/**
 * Internal dependencies
 */
import { renderRating } from './../utils';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

const Edit = ( props ) => {
	const {
		attributes,
	} = props;

	const {
		author,
		avatarUrl,
		comment,
		localizedDate,
		rating,
		reviewUrl,
	} = attributes;

	return (
		<div className="wp-block-coblocks-review-item">
			<div className="wp-block-coblocks-review-item__header">
				<img
					alt=""
					className="wp-block-coblocks-review-item__header__avatar"
					src={ avatarUrl }
				/>
				<div className="wp-block-coblocks-review-item__header__meta">
					<h3 className="wp-block-coblocks-review-item__header__name">{ author }</h3>
					<p className="wp-block-coblocks-review-item__header__rating">{ renderRating( rating ) } { localizedDate }</p>
				</div>
			</div>

			<div className="wp-block-coblocks-review-item__comment">
				<p dangerouslySetInnerHTML={ { __html: comment } }></p>
				<p><a href={ reviewUrl }>{ __( 'See on Yelp.com', 'coblocks' ) }</a></p>
			</div>
		</div>
	);
};

export default compose( [ ] )( Edit );
