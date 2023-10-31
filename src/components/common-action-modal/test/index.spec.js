import { render } from '@testing-library/react';

import Modal, { fetchData } from '../index';

import mockData from '../../../../.dev/tests/cypress/fixtures/network/coblocks_optout.json';

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

let events = {};

const props = {
	apiUrl: 'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout',
	getParams: {
		domain: 'foo.com',
	},
	isEvent: () => true,
	pageData: {
		domain: 'foo.com',
		coblocksVersion: '1.0.0',
		hostname: 'test.server.net',
		wpOptions: {
			persona: 'persona',
			skill: 'skill',
		},
		wpVersion: '5.9',
	},
};

const setup = () => {
	const { container } = render( <Modal { ...props } /> );
	return container;
};

describe( 'common-deactivate-modal', () => {
	beforeEach( () => {
		fetch.resetMocks();
		fetch.mockResponse( JSON.stringify( mockData ) );

		events = {};
		window.addEventListener = jest.fn( ( event, callback ) => {
			events[ event ] = callback;
		} );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'fetchData', () => {
		test( 'should return feedback data', async () => {
			const response = await fetchData( 'foo.com' );
			expect( response ).toEqual( mockData );
		} );

		test( 'should call the fetch api', async () => {
			const fetchMock = jest.spyOn( global, 'fetch' );

			setup();

			expect( fetchMock ).toHaveBeenCalledWith( 'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout?domain=foo.com&random=1&language=en-US' );
		} );
	} );
} );
