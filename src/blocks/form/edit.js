/*global coblocksBlockData*/

/**
 * External dependencies
 */
import classnames from 'classnames';
import emailValidator from 'email-validator';

/**
 * Internal dependencies
 */
import icons from './icons';
import CoBlocksField from './fields/field';
import CoBlocksFieldName from './fields/field-name';
import CoBlocksFieldTextarea from './fields/field-textarea';
import Notice from './notice';
import SubmitButton from './submit-button';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType, getBlockType } = wp.blocks;
const { Button, PanelBody, TextControl, ExternalLink } = wp.components;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { applyFilters } = wp.hooks;

/**
 * Block constants
 */
const ALLOWED_BLOCKS = [];

const FieldDefaults = {
	category: 'coblocks',
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes: {
		label: {
			type: 'string',
			default: null,
		},
		required: {
			type: 'boolean',
			default: false,
		},
		hasLastName: {
			type: 'boolean',
			default: false,
		},
		labelFirstName: {
			type: 'string',
			default: __( 'First' ),
		},
		labelLastName: {
			type: 'string',
			default: __( 'Last' ),
		},
	},
	save: () => null,
};

const getFieldLabel = ( { attributes, name: blockName } ) => {
	return null === attributes.label ?
		getBlockType( blockName ).title :
		attributes.label;
};

const editField = type => props => (
	<CoBlocksField
		type={ type }
		label={ getFieldLabel( props ) }
		required={ props.attributes.required }
		setAttributes={ props.setAttributes }
		isSelected={ props.isSelected }
	/>
);

export const childBlocks = [
	{
		name: 'coblocks/field-name',
		settings: {
			...FieldDefaults,
			title: _x( 'Name', 'block name' ),
			description: __( 'A text field for names.' ),
			icon: icons.name,
			edit: props => (
				<CoBlocksFieldName
					type={ 'name' }
					label={ getFieldLabel( props ) }
					labelFirstName={ props.attributes.labelFirstName }
					labelLastName={ props.attributes.labelLastName }
					required={ props.attributes.required }
					hasLastName={ props.attributes.hasLastName }
					setAttributes={ props.setAttributes }
					isSelected={ props.isSelected }
				/>
			),
		},
	},
	{
		name: 'coblocks/field-email',
		settings: {
			...FieldDefaults,
			title: _x( 'Email', 'block name' ),
			keywords: [ _x( 'e-mail', 'block keyword' ), _x( 'mail', 'block keyword' ), 'email' ],
			description: __( 'An email address field.' ),
			icon: icons.email,
			edit: editField( 'email' ),
		},
	},
	{
		name: 'coblocks/field-textarea',
		settings: {
			...FieldDefaults,
			title: _x( 'Message', 'block name' ),
			keywords: [ _x( 'Textarea', 'block keyword' ), 'textarea', _x( 'Multiline text', 'block keyword' ) ],
			description: __( 'A text box for longer responses.' ),
			icon: icons.textarea,
			edit: props => (
				<CoBlocksFieldTextarea
					label={ getFieldLabel( props ) }
					required={ props.attributes.required }
					setAttributes={ props.setAttributes }
					isSelected={ props.isSelected }
				/>
			),
		},
	},
];

childBlocks.forEach( childBlock =>
	registerBlockType( childBlock.name, childBlock.settings )
);

/**
 * Get settings
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

const FORM_TEMPLATE = [
	[
		'coblocks/field-name',
		{
			required: false,
		},
	],
	[
		'coblocks/field-email',
		{
			required: true,
		},
	],
	[
		'coblocks/field-textarea',
		{
			required: true,
		},
	],
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
						/* translators: %s: Placeholder for email address provided by user.  */
						__( '%s is not a valid email address.' ),
						errors[ 0 ].email
					);
				}
				return errors[ 0 ];
			}

			if ( errors.length === 2 ) {
				return sprintf(
					/* translators: %s1: Placeholder for email address provided by user. %s2: Placeholder for email address provided by user.  */
					__( '%s and %s are not a valid email address.' ),
					errors[ 0 ].email,
					errors[ 1 ].email
				);
			}
			const inValidEmails = errors.map( error => error.email );
			return sprintf(
				/* translators: %s1: Placeholder for email address provided by user. */
				__( '%s are not a valid email address.' ),
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
					label={ __( 'Email address' ) }
					placeholder={ __( 'name@example.com' ) }
					onKeyDown={ this.preventEnterSubmittion }
					value={ to || '' === to ? to : coblocksBlockData.form.adminEmail }
					onBlur={ this.onBlurTo }
					onChange={ this.onChangeTo }
				/>
				<Notice isError id={ `contact-form-${ instanceId }-email-error` }>
					{ this.getfieldEmailError( fieldEmailError ) }
				</Notice>
				<TextControl
					label={ __( 'Subject' ) }
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
					<PanelBody title={ __( 'Form Settings' ) }>
						{ this.renderToAndSubjectFields() }
						{ applyFilters( 'coblocks.advanced_forms_cta' ) }
					</PanelBody>
					<PanelBody
						title={ __( 'Google reCAPTCHA' ) }
						initialOpen={ this.state.recaptchaSecretKey ? false : true }
					>
						<p>{ __( 'Add your reCAPTCHA site and secret keys to protect your form from spam.' ) }</p>
						<p>
							<Fragment>
								<ExternalLink href={ RETRIEVE_KEY_URL }>
									{ this.state.recaptchaSiteKey === '' &&
									this.state.recaptchaSecretKey === '' ?
										__( 'Generate keys' ) :
										__( 'My keys' ) }
								</ExternalLink>
								|&nbsp;
								<ExternalLink href={ HELP_URL }>{ __( 'Get help' ) }</ExternalLink>
							</Fragment>
						</p>
						<TextControl
							label={ __( 'Site Key' ) }
							value={ this.state.recaptchaSiteKey }
							onChange={ value => this.setState( { recaptchaSiteKey: value } ) }
							className="components-block-coblocks-form-recaptcha-key__custom-input"
						/>
						<TextControl
							label={ __( 'Secret Key' ) }
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
								{ this.state.isSaving ? __( 'Saving' ) : __( 'Save' ) }
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
										{ __( 'Remove' ) }
									</Button>
								</Fragment>
							) }
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						templateLock={ true }
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
