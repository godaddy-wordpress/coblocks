/**
 * External dependencies
 */
import { StarStyles } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';

export const renderRating = ( rating, baseRating = 5 ) => {
	const ui = [];

	ui.push( ...Array( rating ).fill( renderRatingIcon( StarStyles.default ) ) );

	if ( baseRating - rating > 0 ) {
		ui.push( ...Array( baseRating - rating ).fill( renderRatingIcon( StarStyles.outlined ) ) );
	}

	return ui;
};

const renderRatingIcon = ( ratingIcon ) => <Icon icon={ ratingIcon } size={ 16 } />;
