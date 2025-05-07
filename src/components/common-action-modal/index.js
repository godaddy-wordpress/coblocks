import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from '@wordpress/element';

import CommonActionModal from './common-action-modal';

const language = document.documentElement.getAttribute( 'lang' ) || 'en-US';

const fetchData = async ( apiUrl, getParams = null ) => {
	const params = {
		...getParams,
		random: 1,
		language,
	};

	const paramString = new URLSearchParams( params ).toString();

	try {
		const response = await fetch( `${ apiUrl }?${ paramString }` );
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

	const closeModal = () => setOpen( false );

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
		<CommonActionModal
			closeModal={ closeModal }
			feedbackData={ feedbackData }
			formData={ formData }
			onAction={ onAction }
			onCheckboxChange={ onCheckboxChange }
			onTextChange={ onTextChange }
		/>
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
