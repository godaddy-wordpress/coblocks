/**
 * External dependencies
 */
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies.
 */
import Modal from '../modal';
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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
	let container, wrapper;

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

	beforeEach(() => {
		wrapper = setup();
		// setup a DOM element as a render target
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		// cleanup on exiting
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	afterAll(() => {
		global.fetch.mockClear();
	});

	test('should not show Modal initially', () => {
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
		jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve({ can_submit_feedback: true })
			})
		);

		await act(async () => {
			render(<div>
				<button id='deactivate-coblocks'>Deactivate</button>
				<Modal />
			</div>, container);
		});

		wrapper.find( '#deactivate-coblocks' ).simulate('click');
		expect( wrapper.find( '.coblocks-plugin-deactivate-modal' ) ).toBeTruthy();
		expect(wrapper.find('.coblocks-plugin-deactivate-modal__button')).toBeTruthy();
		global.fetch.mockRestore();
	});
} );
