/**
 * External dependencies
 */
import { GithubIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import { getBlockIconColor } from '../../utils/helper';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { Icon } from '@wordpress/components';
import { registerBlockVariation, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	deprecated,
	/* translators: block description */
	description: __( 'Embed a GitHub Gist.', 'coblocks' ),
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		replaceBlocks(
			[ props.clientId ],
			switchToBlockType( props, 'core/embed' )
		);
		return null;
	},
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	parent: [],
	save: () => null,
	supports: {
		align: [ 'wide' ],
		html: false,
	},
	/* translators: block name */
	title: __( 'Gist', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };

registerBlockVariation( 'core/embed', {
	attributes: { providerNameSlug: 'gist' },
	/* translators: block description */
	description: __( 'Embed a GitHub Gist.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	isActive: [ 'providerNameSlug' ],
	keywords: [
		'coblocks',
		'github',
		/* translators: block keyword */
		__( 'code', 'coblocks' ),
	],
	name: 'gist',
	patterns: [ /https?:\/\/gist\.github\.com\/.+/i ],
	/* translators: block name */
	title: __( 'Gist', 'coblocks' ),
} );
