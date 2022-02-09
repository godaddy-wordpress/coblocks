/* global coblocksPluginDeactivateData */

/**
 * WordPress Dependencies
 */
import {
	Button,
	ButtonGroup,
	CheckboxControl,
	Modal,
	TextControl,
} from '@wordpress/components';
import { render, useCallback, useEffect, useState } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';

import './styles/style.scss';

const COBLOCKS_DEACTIVATE_MODAL_ID = 'coblocks-plugin-deactivate-modal';

const PluginDeactivateModal = () => {
	const [ href, setHref ] = useState( null );
	const [ isOpen, setOpen ] = useState( false );
	const [ feedbackChoices, setFeedbackChoices ] = useState( null );
	const [ formData, setFormData ] = useState( {} );

	const clickHandler = useCallback( ( e ) => {
		if ( e.target.id !== 'deactivate-coblocks' ) {
			return;
		}

		e.preventDefault();
		setOpen( true );
		setHref( e.target.href );
	} );

	useEffect( () => {
		const formatLocale = Array.isArray( navigator.language )
			? [ navigator.language[ 0 ] ]
			: [ navigator.language ];
		const domain = coblocksPluginDeactivateData.domain;

		fetch(
			`https://wpnux.dev-godaddy.com/v3/api/feedback/coblocks-optout?domain=${ domain }&random=1&language=${ formatLocale }`
		)
			.then( async ( response ) => {
				const data = await response.json();

				if ( ! response.ok ) {
					const error = ( data && data.message ) || response.status;
					return Promise.reject( error );
				}

				// TODO: revert to !!
				if ( ! data.can_submit_feedback ) {
					window.addEventListener( 'click', clickHandler );
				}

				setInitialData( data );
			} )
			.catch( () => {} );

		return () => {
			window.removeEventListener( 'click', clickHandler );
		};
	}, [] );

	useEffect( () => {}, [ formData ] );

	const setInitialData = ( data ) => {
		setFeedbackChoices( data );

		let textFields = {};
		data.choices.forEach( ( choice ) => {
			if ( !! choice.text_field ) {
				textFields = {
					...textFields,
					[ choice.text_field ]: '',
				};
			}
		} );
		setFormData( {
			domain: '',
			hostname: '',
			choices: [],
			...textFields,
		} );
	};

	const submitData = () => {
		fetch( 'https://wpnux.dev-godaddy.com/v3/api/feedback/coblocks-optout', {
			method: 'POST',
			body: JSON.stringify( formData ),
		} )
			.then( async ( response ) => {
				const data = await response.json();

				// TODO: show error message
				if ( ! response.ok ) {
					const error = ( data && data.message ) || response.status;
					return Promise.reject( error );
				}
			} )
			.catch( () => {} );
	};

	const onDeactivate = ( submit = false ) => {
		if ( submit ) {
			submitData();
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

	if ( ! isOpen || ! feedbackChoices ) {
		return null;
	}

	return (
		<Modal
			className="coblocks-plugin-deactivate-modal"
			onRequestClose={ () => setOpen( false ) }
			title={ __(
				'If you have a minute, we want to know what you think.',
				'coblocks'
			) }
		>
			<div className="coblocks-plugin-deactivate-modal__checkbox">
				{ feedbackChoices.choices.map( ( choice ) => {
					const isChecked = formData.choices.indexOf( choice.slug ) >= 0;
					return (
						<div key={ choice.slug }>
							<CheckboxControl
								checked={ isChecked }
								label={ choice.label }
								onChange={ ( checked ) => onCheckboxChange( checked, choice.slug ) }
							/>
							{ !! choice.slug && (
								<TextControl
									className={ `coblocks-plugin-deactivate-modal__text ${
										isChecked ? 'show' : ''
									}` }
									onChange={ ( value ) => onTextChange( choice.slug, value ) }
									value={ formData[ choice.slug ] }
								/>
							) }
						</div>
					);
				} ) }
			</div>
			<ButtonGroup>
				<Button
					className="coblocks-plugin-deactivate-modal__button"
					onClick={ onDeactivate }
					variant="link"
				>
					{ __( 'Skip & Deactivate', 'coblocks' ) }
				</Button>
				<Button
					className="coblocks-plugin-deactivate-modal__button"
					onClick={ () => onDeactivate( true ) }
					variant="primary"
				>
					{ __( 'Submit & Deactivate', 'coblocks' ) }
				</Button>
			</ButtonGroup>

			<footer className="coblocks-plugin-deactivate-modal__footer">
				{ __(
					'Please do not include any personal information in the text box. We do not collect or need this information. You can check out our privacy policy here.',
					'coblocks'
				) }
			</footer>
		</Modal>
	);
};

function initializeCoBlocksDeactivateModal() {
	render(
		<PluginDeactivateModal />,
		document.getElementById( COBLOCKS_DEACTIVATE_MODAL_ID )
	);
}

domReady( initializeCoBlocksDeactivateModal );
