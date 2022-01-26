/**
 * External dependencies
 */
import { IconIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { getBlockIconColor } from '../../utils/helper';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';

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
	// We can't enable example on this block without breaking style previews as attributes are completely replaced by the example.
	//example: {}
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		'svg',
		/* translators: block keyword */
		__( 'icons', 'coblocks' ),
	],
	save: () => null,
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
