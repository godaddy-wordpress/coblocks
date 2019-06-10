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

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	getTextColor( isMaskStyle ) {

		const {
			backgroundColor,
			textColor,
		} = this.props;

		return isMaskStyle ? backgroundColor.color : textColor.color;
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		const {
			borderRadius,
			facebook,
			hasColors,
			linkedin,
			pinterest,
			reddit,
			size,
			textAlign,
			tumblr,
			twitter,
			email,
			iconSize,
			google,
			padding,
		} = attributes;

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		const classes = classnames( className, {
				[ `has-button-size-${ size }` ] : size != 'med',
				'has-colors' : hasColors,
			}
		);

		const buttonClasses = classnames(
			`wp-block-button__link`,
			`wp-block-coblocks-social__button`, {
				'has-background' : hasColors || backgroundColor.color,
				'has-text-color' : hasColors || textColor.color,
				'has-padding' : padding,
				[ textColor.class ]: textColor.class,
			}
		);

		const buttonStyles = {
			borderRadius: borderRadius && borderRadius + 'px',
			backgroundColor: ( ! hasColors && ! isMaskStyle ) && backgroundColor.color,
			color: ! hasColors && this.getTextColor( isMaskStyle ),
			padding: isCircularStyle && padding + 'px',
		};

		const iconStyles = {
			height: ( isMaskStyle || isCircularStyle ) && iconSize + 'px',
			width: ( isMaskStyle || isCircularStyle ) && iconSize + 'px',
		};

		return [
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div className={ classes } style={ { textAlign: textAlign } }>
					<ul>

					{ twitter &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--twitter` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Twitter' ) }</span>
							</a>
						</li>
					}
					{ facebook &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--facebook` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Facebook' ) }</span>
							</a>
						</li>
					}
					{ pinterest &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--pinterest` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Pinterest' ) }</span>
							</a>
						</li>
					}
					{ linkedin &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--linkedin` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on LinkedIn' ) }</span>
							</a>
						</li>
					}
					{ email &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--email` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share via Email' ) }</span>
							</a>
						</li>
					}
					{ tumblr &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--tumblr` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Tumblr' ) }</span>
							</a>
						</li>
					}
					{ google &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--google` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Google' ) }</span>
							</a>
						</li>
					}
					{ reddit &&
						<li>
							<a className={ classnames( buttonClasses, `wp-block-coblocks-social__button--reddit` ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Reddit' ) }</span>
							</a>
						</li>
					}
					</ul>
				</div>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );
