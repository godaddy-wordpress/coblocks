/**
 * External dependencies
 */
import classnames from 'classnames';
import emailValidator from 'email-validator';

/**
 * Internal dependencies
 */
import icons from './icons';
import CoBlocksField from './components/fields/field';
import CoBlocksFieldName from './components/fields/field-name';
import CoBlocksFieldTextarea from './components/fields/field-textarea';
import Notice from './components/notice';
import SubmitButton from './components/submit-button';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType, getBlockType, createBlock } = wp.blocks;
const { Button, PanelBody, TextControl } = wp.components;
const { RichText, InspectorControls, InnerBlocks, InspectorAdvancedControls } = wp.editor;
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
	return null === attributes.label ? getBlockType( blockName ).title : attributes.label;
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
		name: 'field-name',
		settings: {
			...FieldDefaults,
			title: __( 'Name' ),
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
		name: 'field-email',
		settings: {
			...FieldDefaults,
			title: __( 'Email' ),
			keywords: [ __( 'e-mail' ), __( 'mail' ), 'email' ],
			description: __( 'An email address field.' ),
			icon:icons.email,
			edit: editField( 'email' ),
		},
	},
	{
		name: 'field-textarea',
		settings: {
			...FieldDefaults,
			title: __( 'Message' ),
			keywords: [ __( 'Textarea' ), 'textarea', __( 'Multiline text' ) ],
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
	registerBlockType( `coblocks/${ childBlock.name }`, childBlock.settings )
);

class FormEdit extends Component {

	constructor() {
		super( ...arguments );

		this.onChangeSubject = this.onChangeSubject.bind( this );
		this.onBlurTo = this.onBlurTo.bind( this );
		this.onChangeTo = this.onChangeTo.bind( this );
		this.onChangeSubmit = this.onChangeSubmit.bind( this );
		this.onFormSettingsSet = this.onFormSettingsSet.bind( this );
		this.getToValidationError = this.getToValidationError.bind( this );
		this.renderToAndSubjectFields = this.renderToAndSubjectFields.bind( this );
		this.preventEnterSubmittion = this.preventEnterSubmittion.bind( this );
		this.hasEmailError = this.hasEmailError.bind( this );

		const to = arguments[ 0 ].attributes.to ? arguments[ 0 ].attributes.to : '';
		const error = to
			.split( ',' )
			.map( this.getToValidationError )
			.filter( Boolean );

		this.state = {
			toError: error && error.length ? error : null,
		};
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
			return;
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

	onFormSettingsSet( event ) {
		event.preventDefault();
		if ( this.state.toError ) {
			// don't submit the form if there are errors.
			return;
		}
		this.props.setAttributes( { hasFormSettingsSet: 'yes' } );
	}

	getfieldEmailError( errors ) {
		if ( errors ) {
			if ( errors.length === 1 ) {
				if ( errors[ 0 ] && errors[ 0 ].email ) {
					return sprintf( __( '%s is not a valid email address.' ), errors[ 0 ].email );
				}
				return errors[ 0 ];
			}

			if ( errors.length === 2 ) {
				return sprintf(
					__( '%s and %s are not a valid email address.' ),
					errors[ 0 ].email,
					errors[ 1 ].email
				);
			}
			const inValidEmails = errors.map( error => error.email );
			return sprintf(
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
					value={ ( to || '' === to ) ? to : coblocksBlockData.form.adminEmail }
					onBlur={ this.onBlurTo }
					onChange={ this.onChangeTo }
				/>
				<Notice isError id={ `contact-form-${ instanceId }-email-error` }>
					{ this.getfieldEmailError( fieldEmailError ) }
				</Notice>
				<TextControl
					label={ __( 'Subject' ) }
					value={ ( subject || '' === subject ) ? subject : coblocksBlockData.form.emailSubject }
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
			attributes,
			className,
			setAttributes,
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
				</InspectorControls>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						templateLock={ true }
						templateInsertUpdatesSelection={ false }
						renderAppender={ () => ( null ) }
						template={
							[
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
									'coblocks/field-textarea', {
										required: true,
									},
								],
							]
						}
					/>
					<SubmitButton { ...this.props } />
				</div>
			</Fragment>
		);

	}
};

export default FormEdit;
