/* global coblocksDeactivateData */

/**
 * WordPress dependencies
 */
import { useCallback, useEffect, useState } from '@wordpress/element';
import {
	Button,
	ButtonGroup,
	CheckboxControl,
	Modal,
	TextControl,
} from '@wordpress/components';

const API_BASE_URL = 'https://wpnux.godaddy.com/v3/api';

const PluginDeactivateModal = () => {
	const [ href, setHref ] = useState( null );
	const [ isOpen, setOpen ] = useState( false );
	const [ feedbackData, setFeedbackData ] = useState( null );
	const [ formData, setFormData ] = useState( {} );
	const language = document.documentElement.getAttribute( 'lang' ) || 'en-US';

	const clickHandler = useCallback( ( e ) => {
		if ( e.target.id !== 'deactivate-coblocks' ) {
			return;
		}

		e.preventDefault();
		setOpen( true );
		setHref( e.target.href );
	} );

	useEffect( () => {
		const domain = coblocksDeactivateData.domain;

		if ( ! coblocksDeactivateData || ! domain ) {
			return;
		}

		fetch(
			`${ API_BASE_URL }/feedback/coblocks-optout?domain=${ domain }&random=1&language=${ language }`
		)
			.then( async ( response ) => {
				const data = await response.json();

				if ( ! response.ok ) {
					const error = ( data && data.message ) || response.status;
					return Promise.reject( error );
				}

				if ( !! data.can_submit_feedback ) {
					window.addEventListener( 'click', clickHandler );
				}

				setInitialData( data );
			} )
			.catch( () => {} );

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
			coblocks_version: coblocksDeactivateData.coblocksVersion,
			domain: coblocksDeactivateData.domain,
			hostname: coblocksDeactivateData.hostname,
			language,
			persona: coblocksDeactivateData.wpOptions?.persona,
			skill: coblocksDeactivateData.wpOptions?.skill,
			wp_version: coblocksDeactivateData.wpVersion,
			...textFields,
		} );
	};

	const onDeactivate = async ( submit = false ) => {
		if ( submit && formData.choices.length >= feedbackData.choices_min ) {
			await fetch( `${ API_BASE_URL }/feedback/coblocks-optout`, {
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

	if ( ! isOpen || ! feedbackData ) {
		return null;
	}

	return (
		<Modal
			className="coblocks-plugin-deactivate-modal"
			onRequestClose={ () => setOpen( false ) }
			title={ feedbackData.labels.title }
		>
			<div className="coblocks-plugin-deactivate-modal__checkbox">
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
									className={ `coblocks-plugin-deactivate-modal__text ${
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
					className="coblocks-plugin-deactivate-modal__button"
					onClick={ () => onDeactivate( true ) }
					variant="primary"
				>
					{ feedbackData.labels.submit_deactivate }
				</Button>
				<Button
					className="coblocks-plugin-deactivate-modal__button"
					onClick={ () => onDeactivate( false ) }
					variant="link"
				>
					{ feedbackData.labels.skip_deactivate }
				</Button>
			</ButtonGroup>

			<footer className="coblocks-plugin-deactivate-modal__footer">
				<div
					dangerouslySetInnerHTML={ {
						__html: feedbackData.labels.privacy_disclaimer,
					} }
				/>
			</footer>
		</Modal>
	);
};

export default PluginDeactivateModal;
