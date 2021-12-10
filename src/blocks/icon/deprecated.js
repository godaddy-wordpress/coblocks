/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import deprecatedSvgs from './deprecated/svgs';
import deprecatedSvgsFocusable from './deprecated/svgsfocusable';
import metadata from './block.json';
import svgs from './deprecated/svgsv1';

const oldLinkAttributes = {
	href: {
		type: 'string',
		source: 'attribute',
		selector: 'div > div > a',
		attribute: 'href',
	},
	rel: {
		type: 'string',
		source: 'attribute',
		selector: 'div > div > a',
		attribute: 'rel',
	},
	linkTarget: {
		type: 'string',
		source: 'attribute',
		selector: 'div > div > a',
		attribute: 'target',
	},
};

const deprecated = [
	// Moving from v1 to server side render.
	{
		attributes: {
			...metadata.attributes,
			...oldLinkAttributes,
		},
		save: ( { attributes, className } ) => {
			const {
				icon,
				backgroundColor,
				customBackgroundColor,
				customIconColor,
				contentAlign,
				iconColor,
				height,
				width,
				borderRadius,
				padding,
				href,
				linkTarget,
				rel,
			} = attributes;

			let iconStyle = 'outlined';

			if ( attributes.className ) {
				if ( attributes.className.includes( 'is-style-filled' ) ) {
					iconStyle = 'filled';
				}
			}

			const textClass = getColorClassName( 'color', iconColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			const classes = classnames( className, {
				[ `has-text-align-${ contentAlign }` ]: contentAlign,
			} );

			const innerClasses = classnames( 'wp-block-coblocks-icon__inner', {
				'has-text-color': iconColor || customIconColor,
				[ textClass ]: textClass,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customIconColor,
				fill: textClass ? undefined : customIconColor,
				height,
				width,
				borderRadius: borderRadius ? borderRadius + 'px' : undefined,
				padding: padding ? padding + 'px' : undefined,
			};

			return (
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						{ typeof icon !== 'undefined' &&
							( href
								? <a href={ href } target={ linkTarget } rel={ rel }>
									{ svgs[ iconStyle ][ icon ] && svgs[ iconStyle ][ icon ].icon }
								</a>
								: svgs[ iconStyle ][ icon ] && svgs[ iconStyle ][ icon ].icon
							)
						}
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...metadata.attributes,

		},
		save: ( { attributes, className } ) => {
			const {
				icon,
				backgroundColor,
				customBackgroundColor,
				customIconColor,
				contentAlign,
				iconColor,
				height,
				width,
				borderRadius,
				padding,
				href,
				linkTarget,
				rel,
			} = attributes;

			let iconStyle = 'outlined';

			if ( attributes.className ) {
				if ( attributes.className.includes( 'is-style-filled' ) ) {
					iconStyle = 'filled';
				}
			}

			const textClass = getColorClassName( 'color', iconColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			const classes = classnames( className, {
				[ `has-text-align-${ contentAlign }` ]: contentAlign,
			} );

			const innerClasses = classnames( 'wp-block-coblocks-icon__inner', {
				'has-text-color': iconColor || customIconColor,
				[ textClass ]: textClass,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customIconColor,
				fill: textClass ? undefined : customIconColor,
				height,
				width,
				borderRadius: borderRadius ? borderRadius + 'px' : undefined,
				padding: padding ? padding + 'px' : undefined,
			};

			return (
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						{ href
							? ( <a href={ href } target={ linkTarget } rel={ rel }>
								{ icon && deprecatedSvgs[ iconStyle ][ icon ] && deprecatedSvgs[ iconStyle ][ icon ].icon }
							</a> )
							: icon && deprecatedSvgs[ iconStyle ][ icon ] && deprecatedSvgs[ iconStyle ][ icon ].icon
						}
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...metadata.attributes,
			...oldLinkAttributes,
		},
		save( { attributes, className } ) {
			const {
				icon,
				backgroundColor,
				customBackgroundColor,
				customIconColor,
				contentAlign,
				iconColor,
				height,
				width,
				borderRadius,
				padding,
				href,
				linkTarget,
				rel,
			} = attributes;

			let iconStyle = 'outlined';

			if ( attributes.className ) {
				if ( attributes.className.includes( 'is-style-filled' ) ) {
					iconStyle = 'filled';
				}
			}

			const textClass = getColorClassName( 'color', iconColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			const classes = classnames( 'wp-block-coblocks-icon__inner', {
				'has-text-color': iconColor || customIconColor,
				[ textClass ]: textClass,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customIconColor,
				fill: textClass ? undefined : customIconColor,
				height,
				width,
				borderRadius: borderRadius ? borderRadius + 'px' : undefined,
				padding: padding ? padding + 'px' : undefined,
			};

			return (
				<div className={ className } style={ { textAlign: contentAlign ? contentAlign : undefined } }>
					<div className={ classes } style={ styles }>
						{ href
							? ( <a href={ href } target={ linkTarget } rel={ rel }>
								{ icon && svgs[ iconStyle ][ icon ] && svgs[ iconStyle ][ icon ].icon }
							</a> )
							: icon && svgs[ iconStyle ][ icon ] && svgs[ iconStyle ][ icon ].icon
						}
					</div>
				</div>
			);
		},
	},
	// SVG Focusable
	{
		attributes: {
			...metadata.attributes,
			...oldLinkAttributes,
		},
		save: ( { attributes, className } ) => {
			const {
				icon,
				backgroundColor,
				customBackgroundColor,
				customIconColor,
				contentAlign,
				iconColor,
				height,
				width,
				borderRadius,
				padding,
				href,
				linkTarget,
				rel,
			} = attributes;

			let iconStyle = 'outlined';

			if ( attributes.className ) {
				if ( attributes.className.includes( 'is-style-filled' ) ) {
					iconStyle = 'filled';
				}
			}

			const textClass = getColorClassName( 'color', iconColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			const classes = classnames( className, {
				[ `has-text-align-${ contentAlign }` ]: contentAlign,
			} );

			const innerClasses = classnames( 'wp-block-coblocks-icon__inner', {
				'has-text-color': iconColor || customIconColor,
				[ textClass ]: textClass,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customIconColor,
				fill: textClass ? undefined : customIconColor,
				height,
				width,
				borderRadius: borderRadius ? borderRadius + 'px' : undefined,
				padding: padding ? padding + 'px' : undefined,
			};

			return (
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						{ href
							? ( <a href={ href } target={ linkTarget } rel={ rel }>
								{ icon && deprecatedSvgsFocusable[ iconStyle ][ icon ] && deprecatedSvgsFocusable[ iconStyle ][ icon ].icon }
							</a> )
							: icon && deprecatedSvgsFocusable[ iconStyle ][ icon ] && deprecatedSvgsFocusable[ iconStyle ][ icon ].icon
						}
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
