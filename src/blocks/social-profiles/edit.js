/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { keyboardReturn } from '@wordpress/icons';
import { Button, Dashicon, Popover, TextControl } from '@wordpress/components';
import { compose, usePrevious } from '@wordpress/compose';
import { lazy, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import InspectorLoader from '../../components/inspector-loader';
const Inspector = lazy( () => import( './inspector' ) );

/**
 * Block edit function
 *
 * @param {Object} props for the component
 */
const SocialProfilesEdit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
		backgroundColor,
		blockBackgroundColor,
		textColor,
		setAttributes,
	} = props;

	const {
		align,
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
		tiktok,
		twitter,
		yelp,
		youtube,
	} = attributes;

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

	const socialItems = [
		{
			slug: 'facebook',
			name: __( 'Facebook', 'coblocks' ),
			placeholder: __( 'https://facebook.com/', 'coblocks' ),
			ariaLabel: __( 'Add Facebook profile', 'coblocks' ),
		},
		{
			slug: 'twitter',
			name: __( 'Twitter', 'coblocks' ),
			placeholder: __( 'https://twitter.com/', 'coblocks' ),
			ariaLabel: __( 'Add Twitter profile', 'coblocks' ),
		},
		{
			slug: 'instagram',
			name: __( 'Instagram', 'coblocks' ),
			placeholder: __( 'https://instagram.com', 'coblocks' ),
			ariaLabel: __( 'Add Instagram profile', 'coblocks' ),
		},
		{
			slug: 'tiktok',
			name: __( 'TikTok', 'coblocks' ),
			placeholder: __( 'https://tiktok.com', 'coblocks' ),
			ariaLabel: __( 'Add TikTok profile', 'coblocks' ),
		},
		{
			slug: 'pinterest',
			name: __( 'Pinterest', 'coblocks' ),
			placeholder: __( 'https://pinterest.com', 'coblocks' ),
			ariaLabel: __( 'Add Pinterest profile', 'coblocks' ),
		},
		{
			slug: 'linkedin',
			name: __( 'LinkedIn', 'coblocks' ),
			placeholder: __( 'https://linkedin.com', 'coblocks' ),
			ariaLabel: __( 'Add LinkedIn profile', 'coblocks' ),
		},
		{
			slug: 'youtube',
			name: __( 'YouTube', 'coblocks' ),
			placeholder: __( 'https://youtube.com', 'coblocks' ),
			ariaLabel: __( 'Add YouTube profile', 'coblocks' ),
		},
		{
			slug: 'yelp',
			name: __( 'Yelp', 'coblocks' ),
			placeholder: __( 'https://yelp.com', 'coblocks' ),
			ariaLabel: __( 'Add Yelp profile', 'coblocks' ),
		},
		{
			slug: 'houzz',
			name: __( 'Houzz', 'coblocks' ),
			placeholder: __( 'https://houzz.com', 'coblocks' ),
			ariaLabel: __( 'Add Houzz profile', 'coblocks' ),
		},
	];

	const placeholder = ! (
		facebook ||
		twitter ||
		instagram ||
		tiktok ||
		pinterest ||
		linkedin ||
		youtube ||
		yelp ||
		houzz
	);

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<InspectorLoader>
						<Inspector { ...props } />
					</InspectorLoader>
				</>
			) }

			<div className={ classes } style={ { textAlign, backgroundColor: blockBackgroundColor.color || '' } }>
				<ul>
					{ socialItems.map( ( socialItem ) => (
						( placeholder || ( attributes[ socialItem.slug ] || isSelected ) ) && (
							<li key={ `social-profile-item-${ socialItem.slug }` }>
								<button
									aria-expanded={ currentIcon === socialItem.slug }
									aria-label={ socialItem.ariaLabel }
									className={ classnames(
										buttonClasses,
										`wp-block-coblocks-social__button--${ socialItem.slug }`,
										{
											'is-empty': ! attributes[ socialItem.slug ],
											'is-selected': currentIcon === socialItem.slug,
										}
									) }
									onClick={ () => setCurrentIcon( socialItem.slug ) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social__text">
										{ socialItem.name }
									</span>
								</button>
								{ currentIcon === socialItem.slug && (
									<Popover>
										<form
											className="block-library-button__inline-link block-library-button__inline-link--coblocks"
											onSubmit={ ( event ) => {
												event.preventDefault();
												setCurrentIcon( '' );
											} }
										>
											<Dashicon icon="admin-links" />
											<div className="block-editor-url-input block-editor-url-input editor-url-input--coblocks">
												<TextControl
													onChange={ ( value ) => {
														setAttributes( { [ socialItem.slug ]: value } );
													} }
													/* eslint-disable jsx-a11y/no-autofocus */
													// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
													placeholder={ socialItem.placeholder }
													/* eslint-enable jsx-a11y/no-autofocus */
													value={ attributes[ socialItem.slug ] }
												/>
											</div>
											<Button
												className="is-save"
												icon={ keyboardReturn }
												iconSize={ 20 }
												label={ __( 'Apply', 'coblocks' ) }
												type="submit"
											/>
										</form>
									</Popover>
								) }
							</li>
						)
					) ) }
				</ul>
			</div>
		</>
	);
};

export default compose( [ applyWithColors ] )( SocialProfilesEdit );
