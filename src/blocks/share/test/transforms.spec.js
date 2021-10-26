/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType, serialize, parse, rawHandler } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe('coblocks/social transforms', () => {
	beforeAll(() => {
		// Register the block.
		registerBlockType(name, { category: 'common', ...settings });
	});

	it('should transform to core/social-links block', () => {
		const block = createBlock(name);
		const transformed = switchToBlockType(block, 'core/social-links');

		expect(transformed[0].isValid).toBe(true);
	});
});
