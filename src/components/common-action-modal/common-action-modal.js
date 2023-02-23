import { safeHTML } from '@wordpress/dom';
import { Button, ButtonGroup, CheckboxControl, Modal, TextControl } from '@wordpress/components';

const CommonActionModal = ( {
	feedbackData,
	formData,
	onCheckboxChange,
	closeModal,
	onTextChange,
	onAction,
} ) => {
	return (
		<Modal
			className="common-deactivate-modal"
			onRequestClose={ closeModal }
			title={ feedbackData.labels.title }
		>
			<div className="common-deactivate-modal__checkbox">
				{ feedbackData.choices.map( ( choice ) => {
					const isChecked = formData.choices.indexOf( choice.slug ) >= 0;
					return (
						<div className="common-deactivate-modal__choice" data-testid="deactivate-modal__choice" key={ choice.slug }>
							<CheckboxControl
								checked={ isChecked }
								label={ choice.label }
								onChange={ ( checked ) => onCheckboxChange( checked, choice.slug ) }
							/>
							{ !! choice.text_field && (
								<TextControl
									className={ `common-deactivate-modal__text ${
										isChecked ? 'show' : ''
									}` }
									onChange={ ( value ) => onTextChange( choice.text_field, value ) }
									value={ formData[ choice.text_field ] }
								/>
							) }
						</div>
					);
				} ) }
			</div>
			<ButtonGroup>
				<Button
					className="common-deactivate-modal__button"
					data-testid="common-deactivate-modal__button"
					onClick={ () => onAction( true ) }
					variant="primary"
				>
					{ feedbackData.labels.submit_deactivate }
				</Button>
				<Button
					className="common-deactivate-modal__button"
					data-testid="common-deactivate-modal__button"
					onClick={ () => onAction( false ) }
					variant="link"
				>
					{ feedbackData.labels.skip_deactivate }
				</Button>
			</ButtonGroup>

			<footer className="common-deactivate-modal__footer">
				<div
					dangerouslySetInnerHTML={ {
						__html: safeHTML( feedbackData.labels.privacy_disclaimer ),
					} }
				/>
			</footer>
		</Modal>
	);
};

export default CommonActionModal;
