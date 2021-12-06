/**
 * External dependencies
 */
import { IconIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { hasFormattingCategory } from '../../utils/block-helpers';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Set default icon size equivalent to "Medium".
 */
export const DEFAULT_ICON_SIZE = 60;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Icon', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a stylized graphic symbol to communicate something more.', 'coblocks' ),
	category: hasFormattingCategory ? 'common' : 'design',
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		'svg',
		/* translators: block keyword */
		__( 'icons', 'coblocks' ),
	],
	styles: [
		{
			name: 'outlined',
			/* translators: block style */
			label: __( 'Outlined', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'filled',
			/* translators: block style */
			label: __( 'Filled', 'coblocks' ),
		},
	],
	attributes,
	edit,
	example: {
		attributes: {
			preview: true,
		},
	},
	save,
	deprecated,
};

export { name, category, metadata, settings };
