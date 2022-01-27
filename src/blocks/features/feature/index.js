/**
 * External dependencies
 */
import { FeatureIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import metadata from './block.json';
import save from './save';

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
	title: __( 'Feature', 'coblocks' ),
	/* translators: block description */
	description: __( 'A singular child column within a parent features block.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	parent: [ 'coblocks/features' ],
	supports: {
		inserter: false,
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
