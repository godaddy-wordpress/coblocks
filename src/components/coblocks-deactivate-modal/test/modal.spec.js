/**
 * External dependencies
 */
import { mount, configure } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

/**
 * Internal dependencies.
 */
import Modal from '../modal';
import React from "react";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

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

global.fetch = jest.fn(() => Promise.resolve({
	json: () => Promise.resolve({})
}));

describe( 'coblocks-deactivate-modal', () => {
	let wrapper;

	const setup = () => {
		return mount(
			<div>
				<button id='deactivate-coblocks'>Deactivate</button>
				<Modal />
			</div>
			);
	};

	const mockFetch = (response) => {
		const fetchMock = jest
			.spyOn(global, 'fetch')
			.mockResolvedValue({
				json: () => Promise.resolve(response)
			});

		return fetchMock;
	};

	afterAll(() => {
		global.fetch.mockClear();
	});

	test('should not show Modal initially', () => {
		wrapper = setup();
		expect( wrapper.find( '.coblocks-plugin-deactivate-modal' ) ).toHaveLength( 0 );
		expect( wrapper.find( '#deactivate-coblocks' ) ).toHaveLength( 1 );
	});

	test('should call the fetch api', () => {
		const fetchMock = mockFetch({});

		act(() => {
			wrapper = setup();
		});

		wrapper.find( '#deactivate-coblocks' ).simulate('click');
		expect(fetchMock).toHaveBeenCalledWith('https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout?domain=foo.com&random=1&language=en-US');
	});

	test('should show modal if can_submit_feedback is true', async () => {
		mockFetch({ can_submit_feedback: true });

		act(() => {
			wrapper = setup();
			wrapper.find( '#deactivate-coblocks' ).simulate('click');
		});

		expect(wrapper.find( '.coblocks-plugin-deactivate-modal' )).toBeTruthy();
	});
} );
