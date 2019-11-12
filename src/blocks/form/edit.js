/*global coblocksBlockData*/

/**
 * External dependencies
 */
import classnames from 'classnames';
import emailValidator from 'email-validator';

/**
 * Internal dependencies
 */
import Notice from './notice';
import SubmitButton from './submit-button';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Button, PanelBody, TextControl, ExternalLink } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Block constants
 */
// Note: Child form blocks are automatically allowed
const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/separator',
	'core/spacer',
];

/**
 * Get settings
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

const FORM_TEMPLATE = [
	[ 'coblocks/field-name', { required: false } ],
	[ 'coblocks/field-email', { required: true } ],
	[ 'coblocks/field-textarea', { required: true } ],
];

const RETRIEVE_KEY_URL = 'https://g.co/recaptcha/v3';
const HELP_URL = 'https://developers.google.com/recaptcha/docs/v3';

class FormEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onChangeSubject = this.onChangeSubject.bind( this );
		this.onBlurTo = this.onBlurTo.bind( this );
		this.onChangeTo = this.onChangeTo.bind( this );
		this.onChangeSubmit = this.onChangeSubmit.bind( this );
		this.getToValidationError = this.getToValidationError.bind( this );
		this.renderToAndSubjectFields = this.renderToAndSubjectFields.bind( this );
		this.preventEnterSubmittion = this.preventEnterSubmittion.bind( this );
		this.hasEmailError = this.hasEmailError.bind( this );
		this.saveRecaptchaKey = this.saveRecaptchaKey.bind( this );
		this.removeRecaptchaKey = this.removeRecaptchaKey.bind( this );

		this.state = {
			toError: error && error.length ? error : null,
			siteKey: '',
			isSavedKey: false,
			isSaving: false,
			keySaved: false,
		};

		const to = arguments[ 0 ].attributes.to ? arguments[ 0 ].attributes.to : '';
		const error = to
			.split( ',' )
			.map( this.getToValidationError )
			.filter( Boolean );

		settings.on( 'change:coblocks_google_recaptcha_site_key', model => {
			const recaptchaSiteKey = model.get( 'coblocks_google_recaptcha_site_key' );
			this.setState( {
				recaptchaSiteKey: settings.get( 'coblocks_google_recaptcha_site_key' ),
				isSavedKey: recaptchaSiteKey === '' ? false : true,
			} );
		} );

		settings.on( 'change:coblocks_google_recaptcha_secret_key', model => {
			const recaptchaSecretKey = model.get(
				'coblocks_google_recaptcha_secret_key'
			);
			this.setState( {
				recaptchaSecretKey: settings.get(
					'coblocks_google_recaptcha_secret_key'
				),
				isSavedKey: recaptchaSecretKey === '' ? false : true,
			} );
		} );

		settings.fetch().then( response => {
			this.setState( {
				recaptchaSiteKey: response.coblocks_google_recaptcha_site_key,
			} );
			if ( this.state.recaptchaSiteKey && this.state.recaptchaSiteKey !== '' ) {
				this.setState( { isSavedKey: true } );
			}
		} );

		settings.fetch().then( response => {
			this.setState( {
				recaptchaSecretKey: response.coblocks_google_recaptcha_secret_key,
			} );
			if (
				this.state.recaptchaSecretKey &&
				this.state.recaptchaSecretKey !== ''
			) {
				this.setState( { isSavedKey: true } );
			}
		} );
	}

	onChangeSubject( subject ) {
		this.props.setAttributes( { subject } );
	}

	getToValidationError( email ) {
		email = email.trim();
		if ( email.length === 0 ) {
			return false; // ignore the empty emails
		}
		if ( ! emailValidator.validate( email ) ) {
			return { email };
		}
		return false;
	}

	onBlurTo( event ) {
		const error = event.target.value
			.split( ',' )
			.map( this.getToValidationError )
			.filter( Boolean );
		if ( error && error.length ) {
			this.setState( { toError: error } );
		}
	}

	onChangeTo( to ) {
		const emails = to.trim();
		if ( emails.length === 0 ) {
			this.setState( { toError: null } );
			this.props.setAttributes( { to } );
			return;
		}

		this.setState( { toError: null } );
		this.props.setAttributes( { to } );
	}

	onChangeSubmit( submitButtonText ) {
		this.props.setAttributes( { submitButtonText } );
	}

	getfieldEmailError( errors ) {
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
					/* translators: %s1: placeholder for an email address. %s2: placeholder for an email address */
					__( '%s and %s are not valid email addresses.', 'coblocks' ),
					errors[ 0 ].email,
					errors[ 1 ].email
				);
			}
			const inValidEmails = errors.map( error => error.email );
			return sprintf(
				/* translators: %s1: placeholder for comma separated email addresses */
				__( '%s are not valid email addresses.', 'coblocks' ),
				inValidEmails.join( ', ' )
			);
		}
		return null;
	}

	preventEnterSubmittion( event ) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	saveRecaptchaKey() {
		this.setState( { isSaving: true } );

		const model = new wp.api.models.Settings( {
			coblocks_google_recaptcha_site_key: this.state.recaptchaSiteKey,
			coblocks_google_recaptcha_secret_key: this.state.recaptchaSecretKey,
		} );
		model.save().then( () => {
			this.setState( { isSavedKey: true, keySaved: true } );
			setTimeout( () => {
				this.setState( { isSaving: false } );
			}, 1000 );
			settings.fetch();
		} );
	}

	removeRecaptchaKey() {
		this.setState( {
			recaptchaSiteKey: '',
			recaptchaSecretKey: '',
		} );
		if ( this.state.isSavedKey ) {
			this.setState( { isSaving: true } );
			const model = new wp.api.models.Settings( {
				coblocks_google_recaptcha_site_key: '',
				coblocks_google_recaptcha_secret_key: '',
			} );
			model.save().then( () => {
				this.setState( { isSavedKey: false, isSaving: false, keySaved: false } );
				settings.fetch();
			} );
		}
	}

	renderToAndSubjectFields() {
		const fieldEmailError = this.state.toError;
		const { instanceId, attributes } = this.props;
		const { subject, to } = attributes;
		return (
			<Fragment>
				<TextControl
					aria-describedby={ `contact-form-${ instanceId }-email-${
						this.hasEmailError() ? 'error' : 'help'
					}` }
					label={ __( 'Email address', 'coblocks' ) }
					placeholder={ __( 'name@example.com', 'coblocks' ) }
					onKeyDown={ this.preventEnterSubmittion }
					value={ to || '' === to ? to : coblocksBlockData.form.adminEmail }
					onBlur={ this.onBlurTo }
					onChange={ this.onChangeTo }
				/>
				<Notice isError id={ `contact-form-${ instanceId }-email-error` }>
					{ this.getfieldEmailError( fieldEmailError ) }
				</Notice>
				<TextControl
					label={ __( 'Subject', 'coblocks' ) }
					value={
						subject || '' === subject ?
							subject :
							coblocksBlockData.form.emailSubject
					}
					onChange={ this.onChangeSubject }
				/>
			</Fragment>
		);
	}

	hasEmailError() {
		const fieldEmailError = this.state.toError;
		return fieldEmailError && fieldEmailError.length > 0;
	}

	render() {
		const {
			className,
		} = this.props;

		const classes = classnames(
			className,
			'coblocks-form',
		);

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Form Settings', 'coblocks' ) }>
						{ this.renderToAndSubjectFields() }
						{ applyFilters( 'coblocks.advanced_forms_cta' ) }
					</PanelBody>
					<PanelBody
						title={ __( 'Google reCAPTCHA', 'coblocks' ) }
						initialOpen={ this.state.recaptchaSecretKey ? false : true }
					>
						<p>{ __( 'Add your reCAPTCHA site and secret keys to protect your form from spam.', 'coblocks' ) }</p>
						<p>
							<Fragment>
								<ExternalLink href={ RETRIEVE_KEY_URL }>
									{ this.state.recaptchaSiteKey === '' &&
									this.state.recaptchaSecretKey === '' ?
										__( 'Generate keys', 'coblocks' ) :
										__( 'My keys', 'coblocks' ) }
								</ExternalLink>
								|&nbsp;
								<ExternalLink href={ HELP_URL }>{ __( 'Get help', 'coblocks' ) }</ExternalLink>
							</Fragment>
						</p>
						<TextControl
							label={ __( 'Site Key', 'coblocks' ) }
							value={ this.state.recaptchaSiteKey }
							onChange={ value => this.setState( { recaptchaSiteKey: value } ) }
							className="components-block-coblocks-form-recaptcha-key__custom-input"
						/>
						<TextControl
							label={ __( 'Secret Key', 'coblocks' ) }
							value={ this.state.recaptchaSecretKey }
							onChange={ value => this.setState( { recaptchaSecretKey: value } ) }
							className="components-block-coblocks-form-recaptcha-key__custom-input"
						/>
						<div className="components-base-control components-block-coblocks-form-recaptcha-buttons">
							<Button
								isPrimary
								onClick={ this.saveRecaptchaKey }
								disabled={
									this.state.recaptchaSiteKey === '' ||
									this.state.recaptchaSecretKey === ''
								}
							>
								{ this.state.isSaving ? __( 'Saving', 'coblocks' ) : __( 'Save', 'coblocks' ) }
							</Button>
							{ this.state.recaptchaSiteKey !== '' &&
								this.state.recaptchaSecretKey !== '' && (
								<Fragment>
										&nbsp;
									<Button
										className="components-block-coblocks-form-recaptcha-key-remove__button"
										isDefault
										onClick={ this.removeRecaptchaKey }
										disabled={
											this.state.recaptchaSiteKey === '' ||
												this.state.recaptchaSecretKey === ''
										}
									>
										{ __( 'Remove', 'coblocks' ) }
									</Button>
								</Fragment>
							) }
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						templateInsertUpdatesSelection={ false }
						renderAppender={ () => null }
						template={ FORM_TEMPLATE }
					/>
					<SubmitButton { ...this.props } />
				</div>
			</Fragment>
		);
	}
}

export default FormEdit;
