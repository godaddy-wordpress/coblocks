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
import { compose } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';

/**
 * Block edit function
 */
class edit extends Component {
	getTextColor( isMaskStyle ) {
		const {
			backgroundColor,
			textColor,
		} = this.props;

		return isMaskStyle ? backgroundColor.color : textColor.color;
	}

	componentDidUpdate( prevProps ) {
		const { attributes } = this.props;
		if ( prevProps.attributes.align !== attributes.align && [ 'wide', 'full' ].includes( attributes.align ) && attributes.textAlign === undefined ) {
			this.props.setAttributes( { textAlign: 'center' } );
		}
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			backgroundColor,
			blockBackgroundColor,
			textColor,
		} = this.props;

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
		} = attributes;

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		const classes = classnames( className, {
			[ `has-button-size-${ size }` ]: size !== 'med',
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
			color: ! hasColors && this.getTextColor( isMaskStyle ),
			padding: isCircularStyle && padding + 'px',
		};

		const iconStyles = {
			height: ( isMaskStyle || isCircularStyle ) && iconSize + 'px',
			width: ( isMaskStyle || isCircularStyle ) && iconSize + 'px',
		};

		return [
			// eslint-disable-next-line react/jsx-key
			<Fragment>
				{ isSelected && <Controls { ...this.props } /> }
				{ isSelected && <Inspector { ...this.props } /> }
				<div className={ classes } style={ { backgroundColor: blockBackgroundColor.color || '' } }>
					<ul>
						{ facebook &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--facebook' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Facebook', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ twitter &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--twitter' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Twitter', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ pinterest &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--pinterest' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Pinterest', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ linkedin &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--linkedin' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on LinkedIn', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ email &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--email' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share via Email', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ tumblr &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--tumblr' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Tumblr', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ google &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--google' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Google', 'coblocks' ) }</span>
							</span>
						</li>
						}
						{ reddit &&
						<li>
							<span className={ classnames( buttonClasses, 'wp-block-coblocks-social__button--reddit' ) } style={ buttonStyles }>
								<span className="wp-block-coblocks-social__icon" style={ iconStyles }></span>
								<span className="wp-block-coblocks-social__text">{ __( 'Share on Reddit', 'coblocks' ) }</span>
							</span>
						</li>
						}
					</ul>
				</div>
			</Fragment>,
		];
	}
}

export default compose( [
	applyWithColors,
] )( edit );
