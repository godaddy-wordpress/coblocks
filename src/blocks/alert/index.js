/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

alert( name );
console.log( metadata );

const settings = {
	title: 'Alert',
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		replaceBlocks(
			[ props.clientId ],
			switchToBlockType( props, 'core/paragraph' )
		);
		return null;
	},
	parent: [],
	save: () => null
};

export { name, metadata, settings };
