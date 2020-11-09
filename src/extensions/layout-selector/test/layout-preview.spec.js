/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import '@wordpress/hooks';
import { addFilter } from '@wordpress/hooks';

import { registerCoreBlocks } from '@wordpress/block-library';
registerCoreBlocks();

/**
 * Internal dependencies.
 */
import {
	LayoutSelectorResults,
	LayoutPreviewList,
} from '../layout-selector-results';

describe( name, () => {

	it( 'should render layout results', () => {
		const componentProps = {
			layouts: [ {
				label: 'About',
				category: 'about',
				blocks: [ [ 'core/paragraph', { content: 'Paragraph Block' }, [] ] ],
			} ],
			registeredBlocks: [ 'core/paragraph' ],
			category: 'about',
			onInsert: () => {},
		};

		const combineLayoutsProps = ( shallowRender ) => {
			return shallowRender
				.find( LayoutPreviewList )
				.map( ( node ) =>
					node.prop( 'layouts' ).map(
						( layout ) => layout.blocks
					)
				)
				.flat( 2 );
		}

		const renderOne = shallow( <LayoutSelectorResults { ...componentProps } /> );
		expect( combineLayoutsProps( renderOne ) ).toHaveLength( 1 );

		addFilter(
			'coblocks.layoutPreviewBlocks',
			'tests/coblocks/layoutPreviewBlocks',
			() => ( [] ) // remove all blocks.
		);

		const renderTwo = shallow( <LayoutSelectorResults { ...componentProps } /> );
		expect( combineLayoutsProps( renderTwo ) ).toHaveLength( 0 );
	} );

} );
