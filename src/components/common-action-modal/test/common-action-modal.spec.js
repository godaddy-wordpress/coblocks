/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from '@testing-library/react';

import CommonActionModal from '../common-action-modal';
import mockData from '../../../../.dev/tests/cypress/fixtures/network/coblocks_optout.json';

const defaultProps = {
	feedbackData: mockData,
	formData: {
		choices: [],
			coblocks_version: '2.26.0',
			domain: "http://localhost:8888",
			hostname: "298769f6195d",
			language: 'en-US',
			persona: null,
			skill: null,
			wp_version: '6.1',
	},
	onCheckboxChange: jest.fn(),
	closeModal: jest.fn(),
	onTextChange: jest.fn(),
	onAction: jest.fn(),
}

const setup = () => {
	const { container } = render( <CommonActionModal { ...defaultProps } /> );
	return container;
};

describe('common-action-modal', () => {
	it('should render the amount of feedback choices provided', () => {
		const view = setup();

		expect( screen.queryAllByTestId( 'deactivate-modal__choice' ) ).toHaveLength( defaultProps.feedbackData.choices.length );
	});

	it('should call onCheckboxChange on checkbox click', () => {
		const view = setup();

		const firstOptionCheckbox = screen.queryAllByTestId( 'deactivate-modal__choice' )[0];

		fireEvent.click(  firstOptionCheckbox.querySelector( 'input' )  );

		expect( defaultProps.onCheckboxChange ).toHaveBeenCalled();
	});

	it('should call onAction when one of the buttons are clicked', () => {
		const view = setup();

		const actionButton = screen.queryAllByTestId( 'common-deactivate-modal__button' )[0];

		fireEvent.click( actionButton );

		expect( defaultProps.onAction ).toHaveBeenCalled();
	});
});
