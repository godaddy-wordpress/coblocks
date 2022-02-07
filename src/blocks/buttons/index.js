/**
 * THIS BLOCK IS DEPRECRATED. IT WILL NOT SHOW UP IN THE INSERTER ANYMORE.
 * SEE /src/js/deprecations/deprecate-coblocks-buttons.js
 */

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { button as icon } from '@wordpress/icons';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Buttons', 'coblocks' ),
	/* translators: block description */
	description: __( 'Prompt visitors to take action with multiple buttons, side by side.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'link', 'coblocks' ),
		/* translators: block keyword (abbreviation for "call to action") */
		__( 'cta', 'coblocks' ),
		/* translators: block keyword */
		__( 'call to action', 'coblocks' ),
	],
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
