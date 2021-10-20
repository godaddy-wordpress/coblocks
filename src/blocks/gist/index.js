/**
 * External dependencies
 */
import { GithubIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { registerBlockVariation, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Gist', 'coblocks' ),
	/* translators: block description */
	description: __( 'Embed a GitHub Gist.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	supports: {
		html: false,
		align: [ 'wide' ],
	},
	parent: [],
	attributes,
	transforms,
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		replaceBlocks(
			[ props.clientId ],
			switchToBlockType( props, 'core/embed' )
		);
		return null;
	},
	save: () => null,
	deprecated,
};

export { name, category, metadata, settings };

registerBlockVariation( 'core/embed', {
	name: 'gist',
	/* translators: block name */
	title: __( 'Gist', 'coblocks' ),
	/* translators: block description */
	description: __( 'Embed a GitHub Gist.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		'github',
		/* translators: block keyword */
		__( 'code', 'coblocks' ),
	],
	patterns: [ /https?:\/\/gist\.github\.com\/.+/i ],
	attributes: { providerNameSlug: 'gist' },
	isActive: () => [ 'providerNameSlug' ],
} );
