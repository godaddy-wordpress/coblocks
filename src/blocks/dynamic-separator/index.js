/**
 * External dependencies
 */
import { separator as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { getBlockIconColor } from '../../utils/helper';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Dynamic HR', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a resizable spacer between other blocks.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		'hr',
		/* translators: block keyword */
		__( 'spacer', 'coblocks' ),
		/* translators: block keyword */
		__( 'separator', 'coblocks' ),
	],
	styles: [
		{
			name: 'dots',
			/* translators: block style */
			label: __( 'Dot', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'line',
			/* translators: block style */
			label: __( 'Line', 'coblocks' ),
		},
		{
			name: 'fullwidth',
			/* translators: block style */
			label: __( 'Fullwidth', 'coblocks' ),
		},
	],
	example: {
		attributes: {
			height: 100,
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
