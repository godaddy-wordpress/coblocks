/* global coblocksBlockData */

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	/* translators: block description */
	description: __( 'Go search field.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			count: 2,
		},
	},
	icon: 'search',
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'go', 'coblocks' ),
		/* translators: block keyword */
		__( 'search', 'coblocks' ),
	],
	save() {
		return (
			<>
				<button id="header__search-toggle" className="header__search-toggle" data-toggle-target=".search-modal" data-set-focus=".search-modal .search-form__input" type="button" aria-controls="js-site-search">
					<div className="search-toggle-icon">
						<Dashicon icon="search" />
					</div>
					<span className="screen-reader-text">{ __( 'Search Toggle', 'coblocks' ) }</span>
				</button>
				<div className="search-modal" data-modal-target-string=".search-modal" aria-expanded="false">
					<div className="search-modal-inner">
						<div id="js-site-search" className="site-search" itemScope="" itemType="http://schema.org/WebSite">

							<form role="search" id="searchform" className="search-form" method="get" action={ coblocksBlockData.searchForm.homeURL }>
								<label htmlFor="search-field">
									<span className="screen-reader-text">{ __( 'Search For', 'coblocks' ) }</span>
								</label>
								<input itemProp="query-input" type="search" id="search-field" className="input input--search search-form__input" autoComplete="off" placeholder={ _x( 'Search &hellip;', 'placeholder', 'go' ) } name="s" />
								<button type="submit" className="search-input__button">
									<span className="search-input__label">{ __( 'Submit', 'coblocks' ) }</span>
									<Dashicon icon="arrow-right-alt" />
								</button>
							</form>

						</div>
					</div>
				</div>
			</>
		);
	},
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	/* translators: block name */
	title: __( 'Go Search', 'coblocks' ),
};

export { name, category, metadata, settings };
