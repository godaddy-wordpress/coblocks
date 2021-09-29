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
import { __ } from '@wordpress/i18n';
import { compose, usePrevious } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Dashicon, Popover, TextControl } from '@wordpress/components';

/**
 * Block edit function
 *
 * @param {Object} props for the component
 */
const SocialProfilesEdit = ( props ) => {
	const {
		attributes: {
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
			align,
		},
		className,
		isSelected,
		backgroundColor,
		blockBackgroundColor,
		textColor,
		setAttributes,
	} = props;

	const [ currentIcon, setCurrentIcon ] = useState( '' );

	const prevSelected = usePrevious( isSelected );
	const prevAlign = usePrevious( align );

	useEffect( () => {
		if (
			! isSelected &&
			prevSelected &&
			currentIcon
		) {
			setCurrentIcon( '' );
		}

		if ( prevAlign !== align && [ 'wide', 'full' ].includes( align ) && textAlign === undefined ) {
			setAttributes( { textAlign: 'center' } );
		}
	}, [ isSelected, prevSelected, prevAlign, align, textAlign, currentIcon ] );

	const getTextColor = ( isMaskStyle ) => {
		if ( isMaskStyle ) {
			return backgroundColor.color ? backgroundColor.color : 'black';
		} 

		return textColor.color;
	};

	const isMaskStyle = includes( className, 'is-style-mask' );
	const isCircularStyle = includes( className, 'is-style-circular' );

	const classes = classnames( className,
		'wp-block-coblocks-social', {
			[ `has-button-size-${ size }` ]: size,
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
		color: ! hasColors && getTextColor( isMaskStyle ),
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
		<>
			{ isSelected && <Controls { ...props } /> }
			{ isSelected && <Inspector { ...props } /> }

			<div className={ classes } style={ { textAlign, backgroundColor: blockBackgroundColor.color || '' } }>
				<ul>
					{ ( placeholder || ( facebook || isSelected ) ) && (
						<li>
							<button
								aria-expanded={ currentIcon === 'facebook' }
								aria-label={ __( 'Add Facebook profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--facebook',
									{
										'is-empty': ! facebook,
										'is-selected': currentIcon === 'facebook',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'facebook' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'Facebook', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'facebook' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ facebook }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://facebook.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) => setAttributes( { facebook: value } ) }
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
								aria-expanded={ currentIcon === 'twitter' }
								aria-label={ __( 'Add Twitter profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--twitter',
									{
										'is-empty': ! twitter,
										'is-selected': currentIcon === 'twitter',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'twitter' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'Twitter', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'twitter' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ twitter }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://twitter.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) => setAttributes( { twitter: value } ) }
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
								aria-expanded={ currentIcon === 'instagram' }
								aria-label={ __( 'Add Instagram profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--instagram',
									{
										'is-empty': ! instagram,
										'is-selected': currentIcon === 'instagram',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'instagram' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'Instagram', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'instagram' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ instagram }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://instagram.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) =>
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
								aria-expanded={ currentIcon === 'pinterest' }
								aria-label={ __( 'Add Pinterest profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--pinterest',
									{
										'is-empty': ! pinterest,
										'is-selected': currentIcon === 'pinterest',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'pinterest' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'Pinterest', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'pinterest' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ pinterest }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://pinterest.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) =>
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
								aria-expanded={ currentIcon === 'linkedin' }
								aria-label={ __( 'Add LinkedIn profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--linkedin',
									{
										'is-empty': ! linkedin,
										'is-selected': currentIcon === 'linkedin',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'linkedin' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'LinkedIn', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'linkedin' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ linkedin }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://linkedin.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) => setAttributes( { linkedin: value } ) }
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
								aria-expanded={ currentIcon === 'youtube' }
								aria-label={ __( 'Add YouTube profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--youtube',
									{
										'is-empty': ! youtube,
										'is-selected': currentIcon === 'youtube',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'youtube' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'YouTube', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'youtube' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ youtube }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://youtube.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) => setAttributes( { youtube: value } ) }
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
								aria-expanded={ currentIcon === 'yelp' }
								aria-label={ __( 'Add Yelp profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--yelp',
									{
										'is-empty': ! yelp,
										'is-selected': currentIcon === 'yelp',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'yelp' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'Yelp', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'yelp' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ yelp }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://yelp.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) => setAttributes( { yelp: value } ) }
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
								aria-expanded={ currentIcon === 'twitter' }
								aria-label={ __( 'Add Houzz profile', 'coblocks' ) }
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--houzz',
									{
										'is-empty': ! houzz,
										'is-selected': currentIcon === 'houzz',
									}
								) }
								style={ buttonStyles }
								onClick={ () => setCurrentIcon( 'houzz' ) }
							>
								<span
									className="wp-block-coblocks-social__icon"
									style={ iconStyles }
								/>
								<span className="wp-block-coblocks-social__text">
									{ __( 'Houzz', 'coblocks' ) }
								</span>
							</button>
							{ currentIcon === 'houzz' && (
								<Popover>
									<form
										className="block-library-button__inline-link block-library-button__inline-link--coblocks"
										onSubmit={ ( event ) => event.preventDefault() }
									>
										<Dashicon icon="admin-links" />
										<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
											<TextControl
												value={ houzz }
												/* eslint-disable jsx-a11y/no-autofocus */
												// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
												placeholder={ __( 'https://houzz.com/', 'coblocks' ) }
												/* eslint-enable jsx-a11y/no-autofocus */
												onChange={ ( value ) => setAttributes( { houzz: value } ) }
											/>
										</div>
									</form>
								</Popover>
							) }
						</li>
					) }
				</ul>
			</div>
		</>
	);
};

export default compose( [ applyWithColors ] )( SocialProfilesEdit );
