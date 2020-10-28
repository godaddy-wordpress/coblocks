/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import '@wordpress/hooks';
import { BlockPreview } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';

import { registerCoreBlocks } from '@wordpress/block-library';
registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { LayoutPreview } from '../index';

describe( name, () => {

	it( 'should render blocks preview', () => {
		const componentProps = {
			layout: { postContent: '<!-- wp:paragraph -->\r\n<p>Paragraph Block</p>\r\n<!-- /wp:paragraph -->' },
			registeredBlocks: [ 'core/paragraph' ],
		};

		const renderOne = shallow( <LayoutPreview { ...componentProps } /> );
		expect( renderOne.find( BlockPreview ).prop( 'blocks' ) ).toHaveLength( 1 );

		addFilter(
			'coblocks.layoutPreviewBlocks',
			'tests/coblocks/layoutPreviewBlocks',
			() => ( [] ) // remove all blocks.
		);

		const renderTwo = shallow( <LayoutPreview { ...componentProps } /> );
		expect( renderTwo.find( BlockPreview ).prop( 'blocks' ) ).toHaveLength( 0 );
	} );

} );
