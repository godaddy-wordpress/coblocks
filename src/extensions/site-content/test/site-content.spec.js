import { render } from '@testing-library/react';

import { CoBlocksSiteContent } from '../index';
import { propsMockData } from './mock-data';

const defaultProps = {
	lockPostSaving: jest.fn(),
	getEntityRecord: jest.fn(),
	setupEditor: jest.fn(),
	unlockPostSaving: jest.fn(),
};

const setup = () => {
	const { container } = render( <CoBlocksSiteContent { ...defaultProps } { ...propsMockData } /> );
	return container;
};

describe( 'SiteContent', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	describe( '#render', () => {
		it( 'should render', () => {
			expect( wrapper.querySelectorAll( '.content-management' ) ).toHaveLength( 1 );
			expect( wrapper.querySelectorAll( '[data-test="post-type-panel"]' ) ).toHaveLength( 2 );
		} );
	} );
} );
