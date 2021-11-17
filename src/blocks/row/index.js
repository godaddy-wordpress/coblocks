/**
 * External dependencies
 */
import { RowIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import variations from './variations';
import { BackgroundAttributes } from '../../components/background';
import { getEditWrapperProps } from './utilities';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Row', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'rows', 'coblocks' ),
		/* translators: block keyword */
		__( 'columns', 'coblocks' ),
		/* translators: block keyword */
		__( 'layouts', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		gutter: {
			default: 'medium',
			customDefault: 0.8,
		},
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},
	attributes,
	variations,
	transforms,
	edit,
	example: {
		attributes: {}
	},
	getEditWrapperProps,
	save,
	deprecated,
};

export { name, category, metadata, settings };
