/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Trail } from '../index';

const defaultProps = {
	children: [
		( <div key="someChildKey1" data-testid="child_key">Some child 1</div> ),
		( <div key="someChildKey1" data-testid="child_key">Some child 2</div> ),
	],
	className: 'someClassName',
	config: { mass: 2 },
};

const setup = () => {
	const { container } = render( <Trail { ...defaultProps } /> );
	return container;
}

describe( 'animations-trail', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( '#render', () => {
		it( 'should be rendered', () => {
			const view = setup();
			expect( view.querySelectorAll( `.${ defaultProps.className }` ) ).toHaveLength( 1 );
			expect( screen.queryAllByTestId( 'child_key' ) ).toHaveLength( defaultProps.children.length );
		} );
	} );
} );
