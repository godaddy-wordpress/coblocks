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
import { useEffect } from '@wordpress/element';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
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
		borderRadius,
		customBlockBackgroundColor,
		email,
		facebook,
		google,
		hasColors,
		iconSize,
		linkedin,
		padding,
		pinterest,
		reddit,
		size,
		textAlign,
		tumblr,
		twitter,
		align,
	} = attributes;

	const prevAlign = usePrevious( align );

	useEffect( () => {
		if ( prevAlign !== align && [ 'wide', 'full' ].includes( align ) && textAlign === undefined ) {
			setAttributes( { textAlign: 'center' } );
		}
	}, [ prevAlign, align, textAlign ] );

	const getTextColor = ( isMaskStyle ) => {
		return isMaskStyle ? backgroundColor.color : textColor.color;
	};

	const isMaskStyle = includes( className, 'is-style-mask' );
	const isCircularStyle = includes( className, 'is-style-circular' );

	const classes = classnames( className, {
		[ `has-button-size-${ size }` ]: size,
		'has-colors': hasColors,
		'has-background': blockBackgroundColor.color || customBlockBackgroundColor,
		[ `has-text-align-${ textAlign }` ]: textAlign,
	}
	);

	const buttonClasses = classnames(
		'wp-block-button__link',
		'wp-block-coblocks-social__button', {
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
		pinterest ||
		linkedin ||
		email ||
		tumblr ||
		google ||
		reddit
	);

	return (
		<>
			{ isSelected && <Controls { ...props } /> }
			{ isSelected && <Inspector { ...props } /> }
			<div className={ classes } style={ { backgroundColor: blockBackgroundColor.color || '' } }>
				<ul>
					{ ( placeholder || ( facebook || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--facebook',
									{ 'is-empty': ! facebook } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Facebook share button', 'coblocks' ) }
								onClick={ () => setAttributes( { facebook: ! facebook } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Facebook', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( twitter || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--twitter',
									{ 'is-empty': ! twitter } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Twitter share button', 'coblocks' ) }
								onClick={ () => setAttributes( { twitter: ! twitter } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Twitter', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( pinterest || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--pinterest',
									{ 'is-empty': ! pinterest } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Pinterest share button', 'coblocks' ) }
								onClick={ () => setAttributes( { pinterest: ! pinterest } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Pinterest', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( linkedin || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--linkedin',
									{ 'is-empty': ! linkedin } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Linkedin share button', 'coblocks' ) }
								onClick={ () => setAttributes( { linkedin: ! linkedin } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on LinkedIn', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( email || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--email',
									{ 'is-empty': ! email } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Email share button', 'coblocks' ) }
								onClick={ () => setAttributes( { email: ! email } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share via Email', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( tumblr || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--tumblr',
									{ 'is-empty': ! tumblr } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Tumblr share button', 'coblocks' ) }
								onClick={ () => setAttributes( { tumblr: ! tumblr } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Tumblr', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( google || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--google',
									{ 'is-empty': ! google } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Google share button', 'coblocks' ) }
								onClick={ () => setAttributes( { google: ! google } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Google', 'coblocks' ) }</span>
							</button>
						</li>
					) }
					{ ( placeholder || ( reddit || isSelected ) ) && (
						<li>
							<button
								className={ classnames(
									buttonClasses,
									'wp-block-coblocks-social__button--reddit',
									{ 'is-empty': ! reddit } ) }
								style={ buttonStyles }
								aria-label={ __( 'Add Reddit share button', 'coblocks' ) }
								onClick={ () => setAttributes( { reddit: ! reddit } ) }
							>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Reddit', 'coblocks' ) }</span>
							</button>
						</li>
					) }
				</ul>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
