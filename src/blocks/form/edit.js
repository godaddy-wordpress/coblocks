/*global coblocksBlockData*/

/**
 * External dependencies
 */
import classnames from 'classnames';
import emailValidator from 'email-validator';
import get from 'lodash/get';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';

/**
 * Internal dependencies
 */
import Notice from './notice';
import { TEMPLATE_OPTIONS } from './deprecatedTemplates/layouts';
import LabelColorControl from '../../components/form-label-colors/label-color-control';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button, PanelBody, TextControl, ExternalLink, TextareaControl } from '@wordpress/components';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { InspectorControls, InnerBlocks, __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { compose, usePrevious } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';
import apiFetch from '@wordpress/api-fetch';

/**
 * Block constants
 */
const RETRIEVE_KEY_URL = 'https://g.co/recaptcha/v3';
const HELP_URL = 'https://developers.google.com/recaptcha/docs/v3';
// Note: Child form blocks are automatically allowed
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/separator', 'core/spacer' ];

const FormEdit = ( props ) => {
	const {
		blockType,
		className,
		hasInnerBlocks,
		innerBlocks,
		defaultVariation,
		clientId,
		innerBlockCount,
		insertBlock,
		getBlocksByClientId,
		updateBlockAttributes,
		instanceId,
		replaceInnerBlocks,
		variations,
		attributes,
		setAttributes,
	} = props;

	const [ isSaving, setIsSaving ] = useState( false );
	const [ toError, setToError ] = useState( null );
	const [ recaptchaSiteKey, setRecaptchaSiteKey ] = useState( '' );
	const [ recaptchaSecretKey, setRecaptchaSecretKey ] = useState( '' );
	const [ isSavedKey, setIsSavedKey ] = useState( false );
	const [ template, setTemplate ] = useState( null );
	const [ subjectValue, setSubjectValue ] = useState( attributes.subject || '' === attributes.subject
		? attributes.subject
		: coblocksBlockData.form.emailSubject );

	const prevInnerBlockCount = usePrevious( innerBlockCount );
	const prevTemplate = usePrevious( template );
	const prevInnerBlocks = usePrevious( innerBlocks );

	const classes = classnames(
		className,
		'coblocks-form',
	);

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			setRecaptchaSiteKey( res.coblocks_google_recaptcha_site_key );
			setIsSavedKey( res.coblocks_google_recaptcha_site_key === '' || res.coblocks_google_recaptcha_secret_key === '' ? false : true );
			setRecaptchaSecretKey( res.coblocks_google_recaptcha_secret_key );
		} );

		if ( hasInnerBlocks ) {
			setTemplate( innerBlocks );
		}

		if ( ! supportsInnerBlocksPicker() && ! supportsBlockVariationPicker() && hasInnerBlocks === false ) {
			setTemplate( defaultVariation );
		}
	}, [] );

	useEffect( () => {
		// Store the selected innerBlocks layout in state so that undo and redo functions work properly.
		if ( prevInnerBlockCount !== innerBlockCount ) {
			setTemplate( innerBlockCount ? innerBlocks : null );
		}

		let submitButtonText;
		const clientID = clientId;

		map( TEMPLATE_OPTIONS, ( elem ) => {
			if ( isEqual( elem.template, template ) ) {
				// Update the child block's attributes
				submitButtonText = elem.submitButtonText;
				if ( Array.isArray( submitButtonText ) ) {
					submitButtonText = submitButtonText.join( '' );
				}
				const childBlocks = getBlocksByClientId( clientID )[ 0 ].innerBlocks;
				updateBlockAttributes( childBlocks[ childBlocks.length - 1 ].clientId, { submitButtonText } );
			}
		} );

		// Add field-submit-button block to the end of innerBlocks if it doesn't already exist.
		if (
			(
				// Check if the template does not include the submit button.
				prevTemplate !== template &&
				prevInnerBlocks && prevInnerBlocks.length &&
				innerBlocks.filter( ( block ) => block.name === 'coblocks/field-submit-button' ).length < 1
			) || (
				// Check if a submit button exists when a block has been removed.
				innerBlocks.length < prevInnerBlocks && prevInnerBlocks.length &&
				innerBlocks.filter( ( block ) => block.name === 'coblocks/field-submit-button' ).length < 1
			)
		) {
			insertBlock(
				createBlock( 'coblocks/field-submit-button', { submitButtonText: __( 'Submit', 'coblocks' ) } ),
				innerBlocks.length,
				clientId,
				false
			);
		}
	}, [ prevTemplate, template, clientId, prevInnerBlockCount, innerBlockCount, prevInnerBlocks, innerBlocks ] );

	const supportsBlockVariationPicker = () => {
		return !! registerBlockVariation;
	};

	const onChangeSubject = ( subject ) => {
		setSubjectValue( subject );
		setAttributes( { subject } );
	};

	const onChangeSuccessText = ( successText ) => {
		setAttributes( { successText } );
	};

	const getToValidationError = ( email ) => {
		email = email.trim();
		if ( email.length === 0 ) {
			return false; // ignore the empty emails
		}
		if ( ! emailValidator.validate( email ) ) {
			return { email };
		}
		return false;
	};

	const onBlurTo = ( event ) => {
		const error = event.target.value
			.split( ',' )
			.map( getToValidationError )
			.filter( Boolean );
		if ( error && error.length ) {
			setToError( error );
		}
	};

	const onChangeTo = ( to ) => {
		const emails = to.trim();
		if ( emails.length === 0 ) {
			setToError( null );
			setAttributes( { to } );
			return;
		}

		this.setState( { toError: null } );
		setToError( null );
		setAttributes( { to } );
	};

	const getfieldEmailError = ( errors ) => {
		if ( errors ) {
			if ( errors.length === 1 ) {
				if ( errors[ 0 ] && errors[ 0 ].email ) {
					return sprintf(
						/* translators: %s: placeholder for an email address */
						__( '%s is not a valid email address.', 'coblocks' ),
						errors[ 0 ].email
					);
				}
				return errors[ 0 ];
			}

			if ( errors.length === 2 ) {
				return sprintf(
					/* translators: %1$s: placeholder for an email address. %2$s: placeholder for an email address */
					__( '%1$s and %2$s are not valid email addresses.', 'coblocks' ),
					errors[ 0 ].email,
					errors[ 1 ].email
				);
			}
			const inValidEmails = errors.map( ( error ) => error.email );
			return sprintf(
				/* translators: %s1: placeholder for comma separated email addresses */
				__( '%s are not valid email addresses.', 'coblocks' ),
				inValidEmails.join( ', ' )
			);
		}
		return null;
	};

	const preventEnterSubmission = ( event ) => {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const saveRecaptchaKey = () => {
		setIsSaving( true );
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { coblocks_google_recaptcha_site_key: recaptchaSiteKey, coblocks_google_recaptcha_secret_key: recaptchaSecretKey },
		} ).then( () => {
			setIsSavedKey( true );
			setIsSaving( false );
		} );
	};

	const appendTagsToSubject = ( event ) => {
		onChangeSubject( subjectValue + event.target.innerHTML );
	};

	const removeRecaptchaKey = () => {
		setRecaptchaSiteKey( '' );
		setRecaptchaSecretKey( '' );

		if ( isSavedKey ) {
			setIsSaving( true );

			apiFetch( {
				path: '/wp/v2/settings',
				method: 'POST',
				data: { coblocks_google_recaptcha_site_key: '', coblocks_google_recaptcha_secret_key: '' },
			} ).then( () => {
				setIsSavedKey( true );
				setIsSaving( false );
			} );
		}
	};

	const renderToAndSubjectFields = () => {
		const fieldEmailError = toError;
		const { to, successText } = attributes;
		return (
			<>
				<TextControl
					aria-describedby={ `contact-form-${ instanceId }-email-${
						hasEmailError() ? 'error' : 'help'
					}` }
					label={ __( 'Email address', 'coblocks' ) }
					placeholder={ __( 'name@example.com', 'coblocks' ) }
					onKeyDown={ preventEnterSubmission }
					value={ to || '' === to ? to : coblocksBlockData.form.adminEmail }
					onBlur={ onBlurTo }
					onChange={ onChangeTo }
					help={ __( 'Enter the email address where emails should be sent to.', 'coblocks' ) }
				/>
				<Notice isError id={ `contact-form-${ instanceId }-email-error` }>
					{ getfieldEmailError( fieldEmailError ) }
				</Notice>
				<TextControl
					label={ __( 'Subject', 'coblocks' ) }
					value={ subjectValue }
					onChange={ onChangeSubject }
					help={
						<>
							{ __( 'You may use the following tags in the subject field: ', 'coblocks' ) }
							<Button
								isLink
								onClick={ appendTagsToSubject }
							>
								[{ __( 'email', 'coblocks' ) }]
							</Button>
							<Button
								isLink
								onClick={ appendTagsToSubject }
							>
								[{ __( 'name', 'coblocks' ) }]
							</Button>
						</>
					}
				/>
				<TextareaControl
					label={ __( 'Success message', 'coblocks' ) }
					placeholder={ __( 'Your message was sent:', 'coblocks' ) }
					onKeyDown={ preventEnterSubmission }
					value={ successText }
					onChange={ onChangeSuccessText }
					help={ __( 'Form submission confirmation text.', 'coblocks' ) }
				/>
			</>
		);
	};

	const hasEmailError = () => {
		const fieldEmailError = toError;
		return fieldEmailError && fieldEmailError.length > 0;
	};

	const createBlocksFromInnerBlocksTemplate = ( innerBlocksTemplate ) => {
		return map( innerBlocksTemplate, ( [ name, newAttributes, newInnerBlocks = [] ] ) => createBlock( name, newAttributes, createBlocksFromInnerBlocksTemplate( newInnerBlocks ) ) );
	};

	const supportsInnerBlocksPicker = () => {
		return typeof InnerBlocks.prototype === 'undefined' ? false : true;
	};

	const blockVariationPicker = () => {
		return (
			<>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					__experimentalCaptureToolbars={ true }
				/>
			</>
		);
	};

	const innerBlocksPicker = () => {
		return (
			<>
				<InnerBlocks
					__experimentalTemplateOptions={ TEMPLATE_OPTIONS }
					__experimentalOnSelectTemplateOption={ ( chosenTemplate ) => {
						if ( chosenTemplate === undefined ) {
							chosenTemplate = TEMPLATE_OPTIONS[ 0 ].template;
						}
						setTemplate( chosenTemplate );
					} }
					__experimentalAllowTemplateOptionSkip
					template={ supportsInnerBlocksPicker() ? template : TEMPLATE_OPTIONS[ 0 ].template }
					allowedBlocks={ ALLOWED_BLOCKS }
					templateInsertUpdatesSelection={ false }
					__experimentalCaptureToolbars={ true }
				/>
			</>
		);
	};

	if ( hasInnerBlocks || ! supportsBlockVariationPicker() ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Form settings', 'coblocks' ) }>
						{ renderToAndSubjectFields() }
						{ applyFilters( 'coblocks.advanced_forms_cta' ) }
					</PanelBody>
					<PanelBody
						title={ __( 'Google reCAPTCHA', 'coblocks' ) }
						initialOpen={ '' === recaptchaSecretKey ? false : true }
					>
						<p>{ __( 'Add your reCAPTCHA site and secret keys to protect your form from spam.', 'coblocks' ) }</p>
						<p>
							<>
								<ExternalLink href={ RETRIEVE_KEY_URL }>
									{ recaptchaSiteKey === '' &&
										recaptchaSecretKey === ''
										? __( 'Generate keys', 'coblocks' )
										: __( 'My keys', 'coblocks' ) }
								</ExternalLink>
								|&nbsp;
								<ExternalLink href={ HELP_URL }>{ __( 'Get help', 'coblocks' ) }</ExternalLink>
							</>
						</p>
						<TextControl
							label={ __( 'Site key', 'coblocks' ) }
							value={ recaptchaSiteKey }
							onChange={ ( value ) => setRecaptchaSiteKey( value ) }
							className="components-block-coblocks-form-recaptcha-key__custom-input"
						/>
						<TextControl
							label={ __( 'Secret key', 'coblocks' ) }
							value={ recaptchaSecretKey }
							onChange={ ( value ) => setRecaptchaSecretKey( value ) }
							className="components-block-coblocks-form-recaptcha-key__custom-input"
						/>
						<div className="components-base-control">
							<Button
								isPrimary
								onClick={ saveRecaptchaKey }
								disabled={
									recaptchaSiteKey === '' ||
									recaptchaSecretKey === ''
								}
							>
								{ isSaving ? __( 'Saving', 'coblocks' ) : __( 'Save', 'coblocks' ) }
							</Button>
							{ recaptchaSiteKey !== '' &&
								recaptchaSecretKey !== '' && (
								<Button
									className="components-block-coblocks-form-recaptcha-key-remove__button"
									isSecondary
									onClick={ removeRecaptchaKey }
									disabled={ recaptchaSiteKey === '' || recaptchaSecretKey === '' }
								>
									{ __( 'Remove', 'coblocks' ) }
								</Button>
							) }
						</div>
					</PanelBody>
					<LabelColorControl { ...props } />
				</InspectorControls>
				<div className={ classes }>
					{ supportsBlockVariationPicker() ? blockVariationPicker() : innerBlocksPicker() }
				</div>
			</>
		);
	}

	const blockVariationPickerOnSelect = ( nextVariation = defaultVariation ) => {
		if ( nextVariation.attributes ) {
			setAttributes( nextVariation.attributes );
		}

		const submitButtonText = map( variations, ( elem ) => {
			if ( isEqual( elem.innerBlocks, nextVariation.innerBlocks ) ) {
				return elem.submitButtonText;
			}
		} );

		setAttributes( { submitButtonText: submitButtonText.join( '' ) } );
		if ( nextVariation.innerBlocks ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	};

	return (
		<>
			<__experimentalBlockVariationPicker
				icon={ get( blockType, [ 'icon', 'src' ] ) }
				label={ get( blockType, [ 'title' ] ) }
				instructions={ __( 'Select a variation to start with.', 'coblocks' ) }
				variations={ variations }
				allowSkip
				onSelect={ ( nextVariation ) => blockVariationPickerOnSelect( nextVariation ) }
			/>
		</>
	);
};

const applyWithSelect = withSelect( ( select, props ) => {
	const { getBlocks } = select( 'core/block-editor' );
	const { getBlocksByClientId } = select( 'core/editor' );
	const { getBlockType, getBlockVariations, getDefaultBlockVariation } = select( 'core/blocks' );
	const innerBlocks = getBlocks( props.clientId );

	return {
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		blockType: getBlockType( props.name ),
		defaultVariation: typeof getDefaultBlockVariation === 'undefined' ? null : getDefaultBlockVariation( props.name ),
		getBlocksByClientId,
		hasInnerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,
		innerBlocks,
		variations: typeof getBlockVariations === 'undefined' ? null : getBlockVariations( props.name ),
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const {
		insertBlock,
		replaceInnerBlocks,
	} = dispatch( 'core/block-editor' );

	const {
		updateBlockAttributes,
	} = dispatch( 'core/editor' );

	return {
		insertBlock,
		replaceInnerBlocks,
		updateBlockAttributes,
	};
} );

export default compose( [ applyWithSelect, applyWithDispatch ] )( FormEdit );
