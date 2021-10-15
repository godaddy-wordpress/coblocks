/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import { getDividerFromStyle } from './utils';
import metadata from './block.json';
import dividers from './deprecated/dividers';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

const deprecatedSVGs = ( props ) => {
	const { attributes } = props;

	const shapeClass = getColorClassName( 'color', attributes.color );
	const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );

	let classes = classnames(
		props.className, {
			'is-vertically-flipped': attributes.verticalFlip,
			'is-horizontally-flipped': attributes.horizontalFlip,
			[ shapeClass ]: shapeClass,
			[ backgroundClass ]: backgroundClass,
		} );

	const deprecatedGetDividerFromStyle = ( className ) => {
		const angled = includes( className, 'is-style-angled' );
		const hills = includes( className, 'is-style-hills' );
		const pointed = includes( className, 'is-style-pointed' );
		const rounded = includes( className, 'is-style-rounded' );
		const sloped = includes( className, 'is-style-sloped' );
		const triangle = includes( className, 'is-style-triangle' );
		const waves = includes( className, 'is-style-waves' );

		let divider = dividers.wavy;

		if ( angled ) {
			divider = dividers.angled;
		} else if ( sloped ) {
			divider = dividers.sloped;
		} else if ( triangle ) {
			divider = dividers.triangle;
		} else if ( rounded ) {
			divider = dividers.rounded;
		} else if ( waves ) {
			divider = dividers.waves;
		} else if ( pointed ) {
			divider = dividers.pointed;
		} else if ( hills ) {
			divider = dividers.hills;
		}

		return divider;
	};

	if ( attributes.coblocks && ( typeof attributes.coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-shape-divider-${ attributes.coblocks.id }` );
	}

	const styles = {
		backgroundColor: backgroundClass ? undefined : attributes.customBackgroundColor,
		color: shapeClass ? undefined : attributes.customColor,
	};

	return (
		<div className={ classes } style={ styles } aria-hidden="true">
			<div className="wp-block-coblocks-shape-divider__svg-wrapper" style={ { minHeight: attributes.shapeHeight } }>
				{ deprecatedGetDividerFromStyle( attributes.className ) }
			</div>
			<div className="wp-block-coblocks-shape-divider__alt-wrapper" style={ { minHeight: attributes.backgroundHeight } }></div>
		</div>
	);
};

const deprecated = [
	{
		attributes: {
			...metadata.attributes,
		},
		save( props ) {
			const { attributes } = props;

			const shapeClass = getColorClassName( 'color', attributes.color );
			const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );

			const classes = classnames(
				props.className, {
					'is-vertically-flipped': attributes.verticalFlip,
					'is-horizontally-flipped': attributes.horizontalFlip,
					[ shapeClass ]: shapeClass,
					[ backgroundClass ]: backgroundClass,
				} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : attributes.customBackgroundColor,
				color: shapeClass ? undefined : attributes.customColor,
			};

			return (
				<div className={ classes } style={ styles } aria-hidden="true">
					<div className="wp-block-coblocks-shape-divider__svg-wrapper" style={ { height: attributes.shapeHeight } }>
						{ getDividerFromStyle( attributes.className ) }
					</div>
					<div className="wp-block-coblocks-shape-divider__alt-wrapper" style={ { height: attributes.backgroundHeight } }></div>
				</div>
			);
		},
	},
	{
		attributes: {
			...metadata.attributes,
		},
		save: deprecatedSVGs,
	},
	{
		attributes: {
			...metadata.attributes,
			coblocks: { type: 'object' },
			justAdded: { type: 'boolean', default: 'true' },
		},
		save: ( { attributes, className } ) => {
			const {
				backgroundColor,
				backgroundHeight,
				coblocks,
				color,
				customBackgroundColor,
				customColor,
				horizontalFlip,
				shapeHeight,
				verticalFlip,
			} = attributes;

			const shapeClass = getColorClassName( 'color', color );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			let classes = classnames(
				className, {
					'is-vertically-flipped': verticalFlip,
					'is-horizontally-flipped': horizontalFlip,
					[ shapeClass ]: shapeClass,
					[ backgroundClass ]: backgroundClass,
				} );

			if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
				classes = classnames( classes, `coblocks-shape-divider-${ coblocks.id }` );
			}

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: shapeClass ? undefined : customColor,
			};

			return (
				<div className={ classes } style={ styles } aria-hidden="true">
					<div className="wp-block-coblocks-shape-divider__svg-wrapper" style={ { minHeight: shapeHeight } }>
						{ getDividerFromStyle( attributes.className ) }
					</div>
					<div className="wp-block-coblocks-shape-divider__alt-wrapper" style={ { minHeight: backgroundHeight } }></div>
				</div>
			);
		},
	},
];

// Deprecations for Advanced Spacing controls.
[ 'noTopMargin', 'noBottomMargin' ].forEach( ( attr ) => {
	deprecated.push( {
		attributes: {
			...metadata.attributes,
			[ attr ]: false,
		},
		save: deprecatedSVGs,
	} );
} );

export default deprecated;
