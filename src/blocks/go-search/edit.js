/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

/**
 * Block edit function
 */
const GoSearchEdit = () => {
	return (
		<>
			<button id="header__search-toggle" className="header__search-toggle" data-toggle-target=".search-modal" data-set-focus=".search-modal .search-form__input" type="button" aria-controls="js-site-search">
				<div className="search-toggle-icon">
					<Dashicon icon="search" />
				</div>
				<span className="screen-reader-text">{ __( 'Search Toggle', 'coblocks' ) }</span>
			</button>
		</>
	);
};

export default GoSearchEdit;
