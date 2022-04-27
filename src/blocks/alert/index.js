/**
 * Internal dependencies
 */
import metadata from './block.json';
import { GithubIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { createBlock, switchToBlockType, registerBlockVariation } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { paragraph as paragraphIcon } from '@wordpress/icons';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		replaceBlocks(
			[ props.clientId ],
			switchToBlockType( props, 'core/paragraph' )
		);
		return null;
	},
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/paragraph' ],
				transform: ( attributes ) => {
					return createBlock( 'core/paragraph', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

registerBlockVariation( 'core/paragraph', {
	attributes: {
		className: 'is-style-info',
	},
	/* translators: block description */
	description: __( 'Informational paragraph.', 'coblocks' ),
	icon: <Icon icon={ paragraphIcon } />,
	keywords: [
		'paragraph',
		'info',
	],
	name: 'info-paragraph',
	/* translators: block name */
	title: __( 'Informational Paragraph', 'coblocks' ),
} );

registerBlockVariation( 'core/paragraph', {
	attributes: {
		className: 'is-style-warning',
	},
	/* translators: block description */
	description: __( 'Warning paragraph.', 'coblocks' ),
	icon: <Icon icon={ paragraphIcon } />,
	keywords: [
		'paragraph',
		'warning',
	],
	name: 'warning-paragraph',
	/* translators: block name */
	title: __( 'Warning Paragraph', 'coblocks' ),
} );

registerBlockVariation( 'core/paragraph', {
	attributes: {
		className: 'is-style-error',
	},
	/* translators: block description */
	description: __( 'Error paragraph.', 'coblocks' ),
	icon: <Icon icon={ paragraphIcon } />,
	keywords: [
		'paragraph',
		'error',
	],
	name: 'error-paragraph',
	/* translators: block name */
	title: __( 'Error Paragraph', 'coblocks' ),
} );

registerBlockVariation( 'core/paragraph', {
	attributes: {
		className: 'is-style-success',
	},
	/* translators: block description */
	description: __( 'Success paragraph.', 'coblocks' ),
	icon: <Icon icon={ paragraphIcon } />,
	keywords: [
		'paragraph',
		'success',
	],
	name: 'success-paragraph',
	/* translators: block name */
	title: __( 'Success Paragraph', 'coblocks' ),
} );
