/**
 * External dependencies
 */
import { HeroIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, Spinner } from '@wordpress/components';
import { lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../components/background';
import CSSGridAttributes from '../../components/grid-control/attributes';
import deprecated from './deprecated';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
const Edit = lazy( () => import( './edit' ) );
import { getBlockIconColor } from '../../utils/helper';
import metadata from './block.json';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import save from './save';
import transforms from './transforms';

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
	attributes,
	deprecated,
	/* translators: block description */
	description: __( 'An introductory area of a page accompanied by a small amount of text and a call to action.', 'coblocks' ),
	edit: ( props ) => (
		<Suspense fallback={ <Spinner /> }>
			<Edit { ...props } />
		</Suspense>
	),
	example: {
		attributes: {},
		innerBlocks: [
			{
				attributes: {
					content: 'Welcome to CoBlocks',
				},
				name: 'core/heading',
			},
			{
				attributes: {
					content: 'CoBlocks is the most innovative collection of page building WordPress blocks for the new Gutenberg WordPress block editor.',
				},
				name: 'core/paragraph',
			},
			{
				attributes: {
					gutter: 'medium',
					items: 2,
				},
				innerBlocks: [
					{
						attributes: {
							text: 'See more',
						},
						name: 'core/button',
					},
					{
						attributes: {
							className: 'is-style-outline',
							text: 'Contact Us',
						},
						name: 'core/button',
					},
				],
				name: 'core/buttons',
			},
		],
	},
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'button', 'coblocks' ),
		/* translators: block keyword (abbreviation for "call to action") */
		__( 'cta', 'coblocks' ),
		/* translators: block keyword */
		__( 'call to action', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	/* translators: block name */
	title: __( 'Hero', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings, attributes };
