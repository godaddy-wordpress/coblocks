/**
 * External dependencies
 */
import { IconIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';

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
	attributes,
	category: hasFormattingCategory ? 'common' : 'design',
	deprecated,
	/* translators: block description */
	description: __( 'Add a stylized graphic symbol to communicate something more.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			preview: true,
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		'svg',
		/* translators: block keyword */
		__( 'icons', 'coblocks' ),
	],
	save,
	styles: [
		{
			isDefault: true,
			/* translators: block style */
			label: __( 'Outlined', 'coblocks' ),
			name: 'outlined',
		},
		{
			/* translators: block style */
			label: __( 'Filled', 'coblocks' ),
			name: 'filled',
		},
	],
	/* translators: block name */
	title: __( 'Icon', 'coblocks' ),
};

export { name, category, metadata, settings };
