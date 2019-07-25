/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './components/edit';
import icons from './components/icons';
import dividers from './components/dividers';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { createBlock } = wp.blocks;
const { getColorClassName } = wp.blockEditor;

/**
 * Return the appropriate SVG for the block style.
 *
 * @param {Array} className The class names.
 * @returns {String} The divider.
 */
export function getDividerFromStyle( className ) {
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
}

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.shapeDivider;

const settings = {
	title: __( 'Shape Divider' ),
	description: __( 'Add a shape divider to visually distinquish page sections.' ),
	keywords: [ __( 'hr' ), __( 'separator' ), __( 'svg' ) ],
	attributes: metadata.attributes,
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	styles: [
		{ name: 'wavy', label: _x( 'Wavy', 'block style' ), isDefault: true },
		{ name: 'hills', label: _x( 'Hills', 'block style' ) },
		{ name: 'waves', label: _x( 'Waves', 'block style' ) },
		{ name: 'angled', label: _x( 'Angled', 'block style' ) },
		{ name: 'sloped', label: _x( 'Sloped', 'block style' ) },
		{ name: 'rounded', label: _x( 'Rounded', 'block style' ) },
		{ name: 'triangle', label: _x( 'Triangle', 'block style' ) },
		{ name: 'pointed', label: _x( 'Pointed', 'block style' ) },
	],
	transforms: {
		from: [
			// Default.
			...[ ':divider', ':top-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }` );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						verticalFlip: true,
					} );
				},
			},
			// Waves.
			...[ ':waves-divider', ':waves-angled-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-waves',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-waves-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-waves',
						verticalFlip: true,
					} );
				},
			},
			// Sloped.
			...[ ':sloped-divider', ':top-sloped-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-sloped',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-sloped-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-sloped',
						verticalFlip: true,
					} );
				},
			},
			// Sloped.
			...[ ':rounded-divider', ':top-rounded-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-rounded',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-rounded-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-rounded',
						verticalFlip: true,
					} );
				},
			},
			// Angled.
			...[ ':angled-divider', ':top-angled-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-angled',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-angled-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-angled',
						verticalFlip: true,
					} );
				},
			},
			// Triangle.
			...[ ':triangle-divider', ':top-triangle-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-triangle',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-triangle-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-triangle',
						verticalFlip: true,
					} );
				},
			},
			// Pointed.
			...[ ':pointed-divider', ':top-pointed-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-pointed',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-pointed-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-pointed',
						verticalFlip: true,
					} );
				},
			},
			// Hills.
			...[ ':hills-divider', ':top-hills-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-hills',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-hills-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-hills',
						verticalFlip: true,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
					height: height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'coblocks/dynamic-separator' ],
				transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
					height: height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( `coblocks/${ name }` ),
			},
		],
	},
	edit,
	save( { attributes, className } ) {
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

		const classes = classnames(
			className, {
				[ `coblocks-shape-divider-${ coblocks.id }` ]: coblocks && ( typeof coblocks.id !== 'undefined' ),
				'is-vertically-flipped': verticalFlip,
				'is-horizontally-flipped': horizontalFlip,
				[ shapeClass ]: shapeClass,
				[ backgroundClass ]: backgroundClass,
			} );

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
	deprecated: [
		{
			save( { attributes, className } ) {
				const {
					backgroundColor,
					backgroundHeight,
					color,
					customBackgroundColor,
					customColor,
					horizontalFlip,
					shapeHeight,
					verticalFlip,
				} = attributes;

				const shapeClass = getColorClassName( 'color', color );
				const backgroundClass = getColorClassName( 'background-color', backgroundColor );

				const classes = classnames(
					className, {
						'is-vertically-flipped': verticalFlip,
						'is-horizontally-flipped': horizontalFlip,
						[ shapeClass ]: shapeClass,
						[ backgroundClass ]: backgroundClass,
					} );

				const styles = {
					backgroundColor: backgroundClass ? undefined : customBackgroundColor,
					color: shapeClass ? undefined : customColor,
				};

				return (
					<div className={ classes } style={ styles } aria-hidden="true">
						<div className="wp-block-coblocks-shape-divider__svg-wrapper" style={ { height: shapeHeight } }>
							{ getDividerFromStyle( attributes.className ) }
						</div>
						<div className="wp-block-coblocks-shape-divider__alt-wrapper" style={ { height: backgroundHeight } }></div>
					</div>
				);
			},
		},
	],
};

export { name, icon, settings };

