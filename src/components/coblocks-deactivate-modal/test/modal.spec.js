/**
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import React from "react";
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { act } from "react-dom/test-utils";

/**
 * Internal dependencies.
 */
import Modal, { fetchData } from '../modal';
import mockData from '../../../../.dev/tests/cypress/fixtures/network/coblocks_optout.json';

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

global.coblocksDeactivateData = {
	domain: 'foo.com',
	coblocksVersion: '1.0.0',
	hostname: 'test.server.net',
	wpOptions: {
		persona: 'persona',
		skill: 'skill',
	},
	wpVersion: '5.9',
}

const defaultEvent = {
	preventDefault: jest.fn(),
	target: {
		id: 'deactivate-coblocks',
		href: 'http://someHref',
	},
};

describe( 'coblocks-deactivate-modal', () => {
	let wrapper;
	let events = {};

	const setup = () => {
		return mount(
			<div>
				<button id='deactivate-coblocks'>Deactivate</button>
				<Modal />
			</div>
			);
	};

	beforeEach(() => {
		fetch.resetMocks();
		fetch.mockResponse(JSON.stringify(mockData));

		events = {};
		window.addEventListener = jest.fn( ( event, callback ) => {
			events[ event ] = callback;
		} );
	});

	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'fetchData', () => {
		test('should return feedback data', async () => {
			const response = await fetchData('foo.com');
			expect(response).toEqual(mockData);
		});

		test('should call the fetch api', async () => {
			const fetchMock = jest.spyOn(global, 'fetch');

			await act(async () => {
				wrapper = setup();
			});

			expect(fetchMock).toHaveBeenCalledWith('https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout?domain=foo.com&random=1&language=en-US');
		});
	});

	describe( 'closed state', () => {
		beforeEach(async () => {
			await act(async () => {
				wrapper = setup();
			});
		});

		test('should not display modal by default', () => {
			expect( wrapper.find( '.coblocks-plugin-deactivate-modal' ) ).toHaveLength( 0 );
		});

		it( 'should not be displayed when opening condition is not met', async() => {
			events.click( {
				...defaultEvent,
				target: {
					...defaultEvent.target,
					id: 'someId',
				},
			} );

			expect( wrapper.find( '.coblocks-plugin-deactivate-modal' ) ).toHaveLength( 0 );
		} );
	});

	describe( 'opened state', () => {
		beforeEach(async () => {
			await act(async () => {
				wrapper = setup();
			});
			events.click( defaultEvent );
			wrapper.update();
		});

		it( 'should show modal on click', () => {
			expect( wrapper.find( '.coblocks-plugin-deactivate-modal' ) ).toHaveLength( 2 );
		} );

		it( 'should call deactivate link on modal submit', () => {
			Object.defineProperty( window, 'location', {
				value: {
					href: defaultEvent.target.href,
				},
			} );

			const activateButton = wrapper.find( '.coblocks-plugin-deactivate-modal__button' ).first();
			activateButton.invoke( 'onClick' )();
			expect( window.location.href ).toEqual( defaultEvent.target.href );
		} );
	});
} );
