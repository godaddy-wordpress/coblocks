/* eslint-disable no-restricted-syntax */
/*global coblocksBlockData, jQuery*/

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
import SubmitButton from './submit-button';
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
import { withSelect, useDispatch } from '@wordpress/data';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';

/**
 * Get settings
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

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
		this.onChangeSubmit = this.onChangeSubmit.bind( this );
		this.getToValidationError = this.getToValidationError.bind( this );
		this.renderToAndSubjectFields = this.renderToAndSubjectFields.bind( this );
		this.preventEnterSubmittion = this.preventEnterSubmittion.bind( this );
		this.hasEmailError = this.hasEmailError.bind( this );
		this.saveRecaptchaKey = this.saveRecaptchaKey.bind( this );
		this.removeRecaptchaKey = this.removeRecaptchaKey.bind( this );
		this.setTemplate = this.setTemplate.bind( this );
		this.appendTagsToSubject = this.appendTagsToSubject.bind( this );
		this.supportsBlockPatternPicker = this.supportsBlockPatternPicker.bind( this );
		this.supportsInnerBlocksPicker = this.supportsInnerBlocksPicker.bind( this );
		this.innerBlocksPatternPicker = this.innerBlocksPatternPicker.bind( this );
		this.blockPatternPicker = this.blockPatternPicker.bind( this );

		this.state = {
			toError: error && error.length ? error : null,
			siteKey: '',
			isSavedKey: false,
			isSaving: false,
			keySaved: false,
			template: null,
		};

		const to = arguments[ 0 ].attributes.to ? arguments[ 0 ].attributes.to : '';
		const error = to
			.split( ',' )
			.map( this.getToValidationError )
			.filter( Boolean );
	}

	componentDidMount() {
		if ( typeof settings !== 'undefined' ) {
			settings.on( 'change:coblocks_google_recaptcha_site_key', ( model ) => {
				const recaptchaSiteKey = model.get( 'coblocks_google_recaptcha_site_key' );
				this.setState( {
					recaptchaSiteKey: settings.get( 'coblocks_google_recaptcha_site_key' ),
					isSavedKey: recaptchaSiteKey === '' ? false : true,
				} );
			} );

			settings.on( 'change:coblocks_google_recaptcha_secret_key', ( model ) => {
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

			settings.fetch().then( ( response ) => {
				this.setState( {
					recaptchaSiteKey: response.coblocks_google_recaptcha_site_key,
				} );
				if ( this.state.recaptchaSiteKey && this.state.recaptchaSiteKey !== '' ) {
					this.setState( { isSavedKey: true } );
				}
			} );

			settings.fetch().then( ( response ) => {
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

		const { hasInnerBlocks, innerBlocks, defaultPattern } = this.props;
		if ( hasInnerBlocks ) {
			this.setState( { template: innerBlocks } );
		}

		if ( ! this.supportsInnerBlocksPicker() && ! this.supportsBlockPatternPicker() && hasInnerBlocks === false ) {
			this.setTemplate( defaultPattern );
		}
	}

	componentDidUpdate( prevProps ) {
		const { innerBlockCount, innerBlocks } = this.props;

		// Store the selected innerBlocks layout in state so that undo and redo functions work properly.
		if ( prevProps.innerBlockCount !== innerBlockCount ) {
			this.setState( { template: innerBlockCount ? innerBlocks : null } );
		}
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
			const inValidEmails = errors.map( ( error ) => error.email );
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

	appendTagsToSubject( event ) {
		const { attributes } = this.props;
		let { subject } = attributes;
		if ( null === subject ) {
			subject = jQuery( event.target ).closest( 'div.components-base-control' ).find( 'input[type="text"]' ).val();
		}
		this.onChangeSubject( subject + event.target.innerHTML );
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
		const { setAttributes } = this.props;
		let submitButtonText;
		map( TEMPLATE_OPTIONS, ( elem ) => {
			if ( isEqual( elem.template, layout ) ) {
				submitButtonText = elem.submitButtonText;
				if ( Array.isArray( submitButtonText ) ) {
					submitButtonText = submitButtonText.join( '' );
				}
			}
		} );

		this.setState( { template: layout } );
		setAttributes( { submitButtonText } );
	}

	createBlocksFromInnerBlocksTemplate( innerBlocksTemplate ) {
		return map( innerBlocksTemplate, ( [ name, attributes, innerBlocks = [] ] ) => createBlock( name, attributes, this.createBlocksFromInnerBlocksTemplate( innerBlocks ) ) );
	}

	supportsInnerBlocksPicker() {
		return typeof InnerBlocks.prototype.shouldComponentUpdate === 'undefined' ? false : true;
	}

	supportsBlockPatternPicker() {
		return !! registerBlockVariation;
	}

	blockPatternPicker( ) {
		return (
			<Fragment>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				<SubmitButton { ...this.props } />
			</Fragment>
		);
	}

	innerBlocksPatternPicker( ) {
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
				{ hasInnerBlocks && <SubmitButton { ...this.props } /> }
			</Fragment>
		);
	}

	render() {
		const { className, blockType, defaultPattern, replaceInnerBlocks, hasInnerBlocks, variations } = this.props;

		const classes = classnames(
			className,
			'coblocks-form',
		);

		if ( hasInnerBlocks || ! this.supportsBlockPatternPicker() ) {
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
								onChange={ ( value ) => this.setState( { recaptchaSiteKey: value } ) }
								className="components-block-coblocks-form-recaptcha-key__custom-input"
							/>
							<TextControl
								label={ __( 'Secret Key', 'coblocks' ) }
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
						{ this.supportsBlockPatternPicker() ? this.blockPatternPicker() : this.innerBlocksPatternPicker() }
					</div>
				</Fragment>
			);
		}

		const blockVariationPickerOnSelect = ( nextVariation = defaultPattern ) => {
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
	const { getBlockType, getBlockVariations, getDefaultBlockVariation } = select( 'core/blocks' );
	const innerBlocks = getBlocks( props.clientId );
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	return {
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		innerBlocks,
		hasInnerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,

		blockType: getBlockType( props.name ),
		defaultPattern: typeof getDefaultBlockVariation === 'undefined' ? null : getDefaultBlockVariation( props.name ),
		variations: typeof getBlockVariations === 'undefined' ? null : getBlockVariations( props.name ),
		replaceInnerBlocks,
	};
} );

export default compose( applyWithSelect )( FormEdit );
