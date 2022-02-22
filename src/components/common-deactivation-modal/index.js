import { Button, ButtonGroup, CheckboxControl, Modal, TextControl } from '@wordpress/components';
import { safeHTML } from '@wordpress/dom';
import { useCallback, useEffect, useState } from '@wordpress/element';
import PropTypes from 'prop-types';

const language = document.documentElement.getAttribute( 'lang' ) || 'en-US';

const fetchData = async ( apiUrl, getParams = null ) => {
	const params = {
		...getParams,
		random: 1,
		language,
	};
	let paramString = '';
	Object.keys( params ).forEach( ( key ) => paramString += `${ key }=${ params[ key ] }&` );

	try {
		const response = await fetch( `${ apiUrl }?${ paramString.slice( 0, -1 ) }` );
		if ( ! response.ok ) {
			return null;
		}

		return await response.json();
	} catch ( e ) {
		return null;
	}
};

const DeactivateModal = ( { apiUrl, getParams, isEvent, pageData } ) => {
	const [ href, setHref ] = useState( null );
	const [ isOpen, setOpen ] = useState( false );
	const [ feedbackData, setFeedbackData ] = useState( null );
	const [ formData, setFormData ] = useState( {} );

	useEffect( () => {
		const getData = async () => {
			const data = await fetchData( apiUrl, getParams );

			if ( data && data.can_submit_feedback ) {
				window.addEventListener( 'click', clickHandler );
				setInitialData( data );
			}
		};

		getData();

		return () => {
			window.removeEventListener( 'click', clickHandler );
		};
	}, [] );

	const setInitialData = ( data ) => {
		setFeedbackData( data );

		const textFields = {};
		data.choices.forEach( ( choice ) => {
			if ( !! choice.text_field ) {
				textFields[ choice.text_field ] = '';
			}
		} );

		setFormData( {
			choices: [],
			coblocks_version: pageData.coblocksVersion,
			domain: pageData.domain,
			hostname: pageData.hostname,
			language,
			persona: pageData.wpOptions?.persona,
			skill: pageData.wpOptions?.skill,
			wp_version: pageData.wpVersion,
			...textFields,
		} );
	};

	const clickHandler = useCallback( ( e ) => {
		if ( ! isEvent( e ) ) {
			return;
		}

		e.preventDefault();
		setOpen( true );
		setHref( e.target.href );
	} );

	const onCheckboxChange = ( isChecked, slug ) => {
		setFormData( ( prevFormData ) => {
			const choices = prevFormData.choices;
			if ( isChecked ) {
				choices.push( slug );
			} else {
				choices.splice( choices.indexOf( slug ), 1 );
			}
			return {
				...prevFormData,
				choices,
			};
		} );
	};

	const onTextChange = ( key, value ) => {
		setFormData( ( prevFormData ) => ( {
			...prevFormData,
			[ key ]: value,
		} ) );
	};

	const onAction = async ( submit = false ) => {
		if ( submit && formData.choices.length >= feedbackData.choices_min ) {
			await fetch( apiUrl, {
				method: 'POST',
				body: JSON.stringify( formData ),
				headers: {
					'Content-Type': 'application/json',
				},
			} );
		}

		setOpen( false );
		window.location.href = href;
	};

	if ( ! isOpen || ! feedbackData ) {
		return null;
	}

	return (
		<Modal
			className="common-deactivate-modal"
			onRequestClose={ () => setOpen( false ) }
			title={ feedbackData.labels.title }
		>
			<div className="common-deactivate-modal__checkbox">
				{ feedbackData.choices.map( ( choice ) => {
					const isChecked = formData.choices.indexOf( choice.slug ) >= 0;
					return (
						<div key={ choice.slug }>
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
					onClick={ () => onAction( true ) }
					variant="primary"
				>
					{ feedbackData.labels.submit_deactivate }
				</Button>
				<Button
					className="common-deactivate-modal__button"
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

DeactivateModal.propTypes = {
	apiUrl: PropTypes.string.isRequired,
	getParams: PropTypes.object,
	isEvent: PropTypes.func.isRequired,
	pageData: PropTypes.object.isRequired,
};

export {
	DeactivateModal as default,
	fetchData,
};
