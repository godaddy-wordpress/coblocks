/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import CSSGridAttributes from '../../components/grid-control/attributes';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import { BackgroundAttributes } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { HeroIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	...ResponsiveBaseControlAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Hero', 'coblocks' ),
	/* translators: block description */
	description: __( 'An introductory area of a page accompanied by a small amount of text and a call to action.', 'coblocks' ),
	icon: <Icon icon={ HeroIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'button', 'coblocks' ),
		/* translators: block keyword (abbreviation for "call to action") */
		__( 'cta', 'coblocks' ),
		/* translators: block keyword */
		__( 'call to action', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings, attributes };
