/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { Dashicon, Popover, TextControl } = wp.components;

/**
 * Block edit function
 */
class edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			currentIcon: '',
		};
	}

	componentDidUpdate( prevProps ) {
		const { attributes } = this.props;

		if (
			! this.props.isSelected &&
			prevProps.isSelected &&
			this.state.currentIcon
		) {
			this.setState( {
				currentIcon: '',
			} );
		}

		if ( prevProps.attributes.align !== attributes.align && [ 'wide', 'full' ].includes( attributes.align ) && attributes.textAlign === undefined ) {
			this.props.setAttributes( { textAlign: 'center' } );
		}
	}

	getTextColor( isMaskStyle ) {
		const { backgroundColor, textColor } = this.props;

		return isMaskStyle ? backgroundColor.color : textColor.color;
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			backgroundColor,
			blockBackgroundColor,
			textColor,
			setAttributes,
		} = this.props;

		const {
			borderRadius,
			customBlockBackgroundColor,
			facebook,
			hasColors,
			houzz,
			iconSize,
			instagram,
			linkedin,
			padding,
			pinterest,
			size,
			textAlign,
			twitter,
			yelp,
			youtube,
		} = attributes;

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		const classes = classnames( className,
			'wp-block-coblocks-social', {
				[ `has-button-size-${ size }` ]: size !== 'med',
				'has-colors': hasColors,
				'has-background': blockBackgroundColor.color || customBlockBackgroundColor,
			} );

		const buttonClasses = classnames(
			'wp-block-button__link',
			'wp-block-coblocks-social__button',
			{
				'has-background': hasColors || backgroundColor.color,
				'has-text-color': hasColors || textColor.color,
				'has-padding': padding,
				[ textColor.class ]: textColor.class,
			}
		);

		const buttonStyles = {
			borderRadius: borderRadius && borderRadius + 'px',
			backgroundColor: ! hasColors && ! isMaskStyle && backgroundColor.color,
			color: ! hasColors && this.getTextColor( isMaskStyle ),
			padding: isCircularStyle && padding + 'px',
		};

		const iconStyles = {
			height: ( isMaskStyle || isCircularStyle ) && iconSize + 'px',
			width: ( isMaskStyle || isCircularStyle ) && iconSize + 'px',
		};

		const placeholder = ! (
			facebook ||
			twitter ||
			instagram ||
			pinterest ||
			linkedin ||
			youtube ||
			yelp ||
			houzz
		);

		return (
			<Fragment>
				{ isSelected && <Controls { ...this.props } /> }
				{ isSelected && <Inspector { ...this.props } /> }

				<div className={ classes } style={ { textAlign, backgroundColor: blockBackgroundColor.color || '' } }>
					<ul>
						{ ( placeholder || ( facebook || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'facebook' }
									aria-label={ __( 'Add Facebook Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--facebook',
										{
											'is-empty': ! facebook,
											'is-selected': this.state.currentIcon === 'facebook',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'facebook' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'Facebook' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'facebook' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ facebook }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://facebook.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value => setAttributes( { facebook: value } ) }
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( twitter || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'twitter' }
									aria-label={ __( 'Add Twitter Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--twitter',
										{
											'is-empty': ! twitter,
											'is-selected': this.state.currentIcon === 'twitter',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'twitter' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'Twitter' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'twitter' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ twitter }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://twitter.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value => setAttributes( { twitter: value } ) }
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( instagram || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'instagram' }
									aria-label={ __( 'Add Instagram Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--instagram',
										{
											'is-empty': ! instagram,
											'is-selected': this.state.currentIcon === 'instagram',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'instagram' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'Instagram' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'instagram' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ instagram }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://instagram.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value =>
														setAttributes( { instagram: value } )
													}
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( pinterest || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'pinterest' }
									aria-label={ __( 'Add Pinterest Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--pinterest',
										{
											'is-empty': ! pinterest,
											'is-selected': this.state.currentIcon === 'pinterest',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'pinterest' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'Pinterest' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'pinterest' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ pinterest }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://pinterest.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value =>
														setAttributes( { pinterest: value } )
													}
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( linkedin || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'linkedin' }
									aria-label={ __( 'Add LinkedIn Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--linkedin',
										{
											'is-empty': ! linkedin,
											'is-selected': this.state.currentIcon === 'linkedin',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'linkedin' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'LinkedIn' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'linkedin' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ linkedin }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://linkedin.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value => setAttributes( { linkedin: value } ) }
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( youtube || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'youtube' }
									aria-label={ __( 'Add YouTube Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--youtube',
										{
											'is-empty': ! youtube,
											'is-selected': this.state.currentIcon === 'youtube',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'youtube' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'YouTube' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'youtube' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ youtube }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://youtube.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value => setAttributes( { youtube: value } ) }
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( yelp || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'yelp' }
									aria-label={ __( 'Add Yelp Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--yelp',
										{
											'is-empty': ! yelp,
											'is-selected': this.state.currentIcon === 'yelp',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'yelp' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'Yelp' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'yelp' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ yelp }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://yelp.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value => setAttributes( { yelp: value } ) }
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
						{ ( placeholder || ( houzz || isSelected ) ) && (
							<li>
								<button
									aria-expanded={ this.state.currentIcon === 'twitter' }
									aria-label={ __( 'Add Houzz Profile' ) }
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social__button--houzz',
										{
											'is-empty': ! houzz,
											'is-selected': this.state.currentIcon === 'houzz',
										}
									) }
									style={ buttonStyles }
									onClick={ () => this.setState( { currentIcon: 'houzz' } ) }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ __( 'Houzz' ) }
									</span>
								</button>
								{ this.state.currentIcon === 'houzz' && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ event => event.preventDefault() }
										>
											<Dashicon icon="admin-links" />
											<div className="editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													value={ houzz }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ __( 'https://houzz.com/' ) }
													/* eslint-enable jsx-a11y/no-autofocus */
													onChange={ value => setAttributes( { houzz: value } ) }
												/>
											</div>
										</form>
									</Popover>
								) }
							</li>
						) }
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default compose( [ applyWithColors ] )( edit );
