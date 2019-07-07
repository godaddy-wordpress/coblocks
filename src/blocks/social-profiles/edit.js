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
// import Placeholder from './placeholder';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;

/**
 * Block edit function
 */
class edit extends Component {
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
			textColor,
		} = this.props;

		const {
			borderRadius,
			hasColors,
			size,
			textAlign,
			iconSize,
			padding,
			facebook,
			twitter,
			instagram,
			pinterest,
			linkedin,
			youtube,
			yelp,
			houzz,
		} = attributes;

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		const classes = classnames( className, {
			[ `has-button-size-${ size }` ]: size !== 'med',
			'has-colors': hasColors,
		} );

		const buttonClasses = classnames(
			'wp-block-button__link',
			'wp-block-coblocks-social-profiles__button',
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

		return [
			// eslint-disable-next-line react/jsx-key
			<Fragment>
				{ isSelected && <Controls { ...this.props } /> }
				{ isSelected && <Inspector { ...this.props } /> }
				<div className={ classes } style={ { textAlign: textAlign } }>
					<ul>
						{ ( facebook || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--facebook'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'Share on Facebook' ) }
									</span>
								</span>
							</li>
						) }
						{ ( twitter || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--twitter'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'Share on Twitter' ) }
									</span>
								</span>
							</li>
						) }
						{ ( instagram || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--instagram'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'See us on Instagram' ) }
									</span>
								</span>
							</li>
						) }
						{ ( pinterest || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--pinterest'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'Share on Pinterest' ) }
									</span>
								</span>
							</li>
						) }
						{ ( linkedin || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--linkedin'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'Share on LinkedIn' ) }
									</span>
								</span>
							</li>
						) }
						{ ( youtube || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--youtube'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'See us on Youtube' ) }
									</span>
								</span>
							</li>
						) }
						{ ( yelp || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--yelp'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'Rate us on Yelp' ) }
									</span>
								</span>
							</li>
						) }
						{ ( houzz || placeholder ) && (
							<li>
								<span
									className={ classnames(
										buttonClasses,
										'wp-block-coblocks-social-profiles__button--houzz'
									) }
									style={ buttonStyles }
								>
									<span
										className="wp-block-coblocks-social-profiles__icon"
										style={ iconStyles }
									/>
									<span className="wp-block-coblocks-social-profiles__text">
										{ __( 'Rate us on Houzz' ) }
									</span>
								</span>
							</li>
						) }
					</ul>
				</div>
			</Fragment>,
		];
	}
}

export default compose( [ applyWithColors ] )( edit );
