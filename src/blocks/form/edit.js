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

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Button, PanelBody, TextControl, ExternalLink } from '@wordpress/components';
import { InspectorControls, InnerBlocks, __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
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

class FormEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onChangeSubject = this.onChangeSubject.bind( this );
		this.onBlurTo = this.onBlurTo.bind( this );
		this.onChangeTo = this.onChangeTo.bind( this );
		this.getToValidationError = this.getToValidationError.bind( this );
		this.renderToAndSubjectFields = this.renderToAndSubjectFields.bind( this );
		this.preventEnterSubmission = this.preventEnterSubmission.bind( this );
		this.hasEmailError = this.hasEmailError.bind( this );
		this.saveRecaptchaKey = this.saveRecaptchaKey.bind( this );
		this.removeRecaptchaKey = this.removeRecaptchaKey.bind( this );
		this.setTemplate = this.setTemplate.bind( this );
		this.appendTagsToSubject = this.appendTagsToSubject.bind( this );
		this.supportsBlockVariationPicker = this.supportsBlockVariationPicker.bind( this );
		this.supportsInnerBlocksPicker = this.supportsInnerBlocksPicker.bind( this );
		this.innerBlocksPicker = this.innerBlocksPicker.bind( this );
		this.blockVariationPicker = this.blockVariationPicker.bind( this );

		this.state = {
			toError: error && error.length ? error : null,
			siteKey: '',
			isSavedKey: false,
			isSaving: false,
			keySaved: false,
			template: null,
			subjectValue: this.props.attributes.subject || '' === this.props.attributes.subject ?
				this.props.attributes.subject :
				coblocksBlockData.form.emailSubject,
		};

		const to = arguments[ 0 ].attributes.to ? arguments[ 0 ].attributes.to : '';
		const error = to
			.split( ',' )
			.map( this.getToValidationError )
			.filter( Boolean );
	}

	componentDidMount() {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			this.setState( {
				recaptchaSiteKey: res.coblocks_google_recaptcha_site_key,
				recaptchaSecretKey: res.coblocks_google_recaptcha_secret_key,
				isSavedKey: res.coblocks_google_recaptcha_site_key === '' || res.coblocks_google_recaptcha_secret_key === '' ? false : true,
			} );
		} );

		const { hasInnerBlocks, innerBlocks, defaultVariation } = this.props;
		if ( hasInnerBlocks ) {
			this.setState( { template: innerBlocks } );
		}

		if ( !this.supportsInnerBlocksPicker() && !this.supportsBlockVariationPicker() && hasInnerBlocks === false ) {
			this.setTemplate( defaultVariation );
		}
	}

	componentDidUpdate( prevProps, prevState ) {
		const {
			clientId,
			innerBlockCount,
			innerBlocks,
			insertBlock,
			getBlocksByClientId,
			updateBlockAttributes,
		} = this.props;

		// Store the selected innerBlocks layout in state so that undo and redo functions work properly.
		if ( prevProps.innerBlockCount !== innerBlockCount ) {
			this.setState( { template: innerBlockCount ? innerBlocks : null } );
		}

		let submitButtonText;
		const clientID = this.props.clientId;

		map( TEMPLATE_OPTIONS, ( elem ) => {
			if ( isEqual( elem.template, this.state.template ) ) {
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
				prevState.template !== this.state.template &&
				Object.keys( prevProps.innerBlocks ).length &&
				innerBlocks.filter( block => block.name === 'coblocks/field-submit-button' ).length < 1
			) || (
				// Check if a submit button exists when a block has been removed.
				Object.keys( innerBlocks ).length < Object.keys( prevProps.innerBlocks ).length &&
				innerBlocks.filter( block => block.name === 'coblocks/field-submit-button' ).length < 1
			)
		) {
			insertBlock(
				createBlock( 'coblocks/field-submit-button', { submitButtonText: __( 'Submit', 'coblocks' ) } ),
				innerBlocks.length,
				clientId,
				false
			);
		}
	}

	onChangeSubject( subject ) {
		this.setState( { subjectValue: subject } );
		this.props.setAttributes( { subject } );
	}

	getToValidationError( email ) {
		email = email.trim();
		if ( email.length === 0 ) {
			return false; // ignore the empty emails
		}
		if ( !emailValidator.validate( email ) ) {
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
			const inValidEmails = errors.map( ( error ) => error.email );
			return sprintf(
				/* translators: %s1: placeholder for comma separated email addresses */
				__( '%s are not valid email addresses.', 'coblocks' ),
				inValidEmails.join( ', ' )
			);
		}
		return null;
	}

	preventEnterSubmission( event ) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	saveRecaptchaKey() {
		const { recaptchaSiteKey, recaptchaSecretKey } = this.state;
		this.setState( { isSaving: true } );
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { coblocks_google_recaptcha_site_key: recaptchaSiteKey, coblocks_google_recaptcha_secret_key: recaptchaSecretKey },
		} ).then( () => {
			this.setState( {
				isSavedKey: true,
				keySaved: true,
				isSaving: false,
			} );
		} );
	}

	appendTagsToSubject( event ) {
		this.onChangeSubject( this.state.subjectValue + event.target.innerHTML );
	}

	removeRecaptchaKey() {
		this.setState( {
			recaptchaSiteKey: '',
			recaptchaSecretKey: '',
		} );
		if ( this.state.isSavedKey ) {
			this.setState( { isSaving: true } );
			apiFetch( {
				path: '/wp/v2/settings',
				method: 'POST',
				data: { coblocks_google_recaptcha_site_key: '', coblocks_google_recaptcha_secret_key: '' },
			} ).then( () => {
				this.setState( {
					isSavedKey: true,
					keySaved: true,
					isSaving: false,
				} );
			} );
		}
	}

	renderToAndSubjectFields() {
		const fieldEmailError = this.state.toError;
		const { instanceId, attributes } = this.props;
		const { to } = attributes;
		const { subjectValue } = this.state;
		return (
			<Fragment>
				<TextControl
					aria-describedby={ `contact-form-${instanceId}-email-${
						this.hasEmailError() ? 'error' : 'help'
						}` }
					label={ __( 'Email address', 'coblocks' ) }
					placeholder={ __( 'name@example.com', 'coblocks' ) }
					onKeyDown={ this.preventEnterSubmission }
					value={ to || '' === to ? to : coblocksBlockData.form.adminEmail }
					onBlur={ this.onBlurTo }
					onChange={ this.onChangeTo }
				/>
				<Notice isError id={ `contact-form-${instanceId}-email-error` }>
					{ this.getfieldEmailError( fieldEmailError ) }
				</Notice>
				<TextControl
					label={ __( 'Subject', 'coblocks' ) }
					value={ subjectValue }
					onChange={ this.onChangeSubject }
					help={ <Fragment> { __( 'You may use the following tags in the subject field: ', 'coblocks' ) }
						<Button
							isLink
							onClick={ this.appendTagsToSubject }
						>
							[{ __( 'email', 'coblocks' ) }]
						</Button>
						<Button
							isLink
							onClick={ this.appendTagsToSubject }
						>
							[{ __( 'name', 'coblocks' ) }]
						</Button></Fragment> }

				/>

			</Fragment>
		);
	}

	hasEmailError() {
		const fieldEmailError = this.state.toError;
		return fieldEmailError && fieldEmailError.length > 0;
	}

	setTemplate( layout ) {
		this.setState( { template: layout } );
	}

	createBlocksFromInnerBlocksTemplate( innerBlocksTemplate ) {
		return map( innerBlocksTemplate, ( [ name, attributes, innerBlocks = [] ] ) => createBlock( name, attributes, this.createBlocksFromInnerBlocksTemplate( innerBlocks ) ) );
	}

	supportsInnerBlocksPicker() {
		return typeof InnerBlocks.prototype === 'undefined' ? false : true;
	}

	supportsBlockVariationPicker() {
		return !!registerBlockVariation;
	}

	blockVariationPicker() {
		return (
			<Fragment>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</Fragment>
		);
	}

	innerBlocksPicker() {
		const { hasInnerBlocks } = this.props;
		return (
			<Fragment>
				<InnerBlocks
					__experimentalTemplateOptions={ TEMPLATE_OPTIONS }
					__experimentalOnSelectTemplateOption={ ( chosenTemplate ) => {
						if ( chosenTemplate === undefined ) {
							chosenTemplate = TEMPLATE_OPTIONS[ 0 ].template;
						}
						this.setTemplate( chosenTemplate );
					} }
					__experimentalAllowTemplateOptionSkip
					template={ this.supportsInnerBlocksPicker() ? this.state.template : TEMPLATE_OPTIONS[ 0 ].template }
					allowedBlocks={ ALLOWED_BLOCKS }
					templateInsertUpdatesSelection={ false }
				/>
			</Fragment>
		);
	}

	render() {
		const { className, blockType, defaultVariation, replaceInnerBlocks, hasInnerBlocks, variations } = this.props;

		const classes = classnames(
			className,
			'coblocks-form',
		);

		if ( hasInnerBlocks || !this.supportsBlockVariationPicker() ) {
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Form settings', 'coblocks' ) }>
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
								label={ __( 'Site key', 'coblocks' ) }
								value={ this.state.recaptchaSiteKey }
								onChange={ ( value ) => this.setState( { recaptchaSiteKey: value } ) }
								className="components-block-coblocks-form-recaptcha-key__custom-input"
							/>
							<TextControl
								label={ __( 'Secret key', 'coblocks' ) }
								value={ this.state.recaptchaSecretKey }
								onChange={ ( value ) => this.setState( { recaptchaSecretKey: value } ) }
								className="components-block-coblocks-form-recaptcha-key__custom-input"
							/>
							<div className="components-base-control">
								<Button
									isPrimary
									isLarge
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
										<Button
											className="components-block-coblocks-form-recaptcha-key-remove__button"
											isLarge
											isSecondary
											onClick={ this.removeRecaptchaKey }
											disabled={ this.state.recaptchaSiteKey === '' || this.state.recaptchaSecretKey === '' }
										>
											{ __( 'Remove', 'coblocks' ) }
										</Button>
									) }
							</div>
						</PanelBody>
					</InspectorControls>
					<div className={ classes }>
						{ this.supportsBlockVariationPicker() ? this.blockVariationPicker() : this.innerBlocksPicker() }
					</div>
				</Fragment>
			);
		}

		const blockVariationPickerOnSelect = ( nextVariation = defaultVariation ) => {
			if ( nextVariation.attributes ) {
				this.props.setAttributes( nextVariation.attributes );
			}

			const submitButtonText = map( variations, ( elem ) => {
				if ( isEqual( elem.innerBlocks, nextVariation.innerBlocks ) ) {
					return elem.submitButtonText;
				}
			} );

			this.props.setAttributes( { submitButtonText: submitButtonText.join( '' ) } );
			if ( nextVariation.innerBlocks ) {
				replaceInnerBlocks(
					this.props.clientId,
					this.createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
				);
			}
		};

		return (
			<Fragment>
				<__experimentalBlockVariationPicker
					icon={ get( blockType, [ 'icon', 'src' ] ) }
					label={ get( blockType, [ 'title' ] ) }
					instructions={ __( 'Select a variation to start with.', 'coblocks' ) }
					variations={ variations }
					allowSkip
					onSelect={ ( nextVariation ) => blockVariationPickerOnSelect( nextVariation ) }
				/>
			</Fragment>
		);
	}
}

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
