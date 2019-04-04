/**
 * External dependencies
 */
import classnames from 'classnames';
import omit from 'lodash/omit';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './components/icons';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import dividers from './components/dividers';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { getColorClassName } = wp.editor;

/**
 * Return the appropriate SVG for the block style.
 */
export function getDividerFromStyle( className ) {

	const angled = includes( className, 'is-style-angled' );
	const hills = includes( className, 'is-style-hills' );
	const pointed = includes( className, 'is-style-pointed' );
	const rounded = includes( className, 'is-style-rounded' );
	const sloped = includes( className, 'is-style-sloped' );
	const triangle = includes( className, 'is-style-triangle' );
	const waves = includes( className, 'is-style-waves' );
	const wavy = includes( className, 'is-style-wavy' );

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
const name = 'shape-divider';

const title = __( 'Shape Divider' );

const icon = icons.shapeDivider;

const keywords = [
	__( 'hr' ),
	__( 'separator' ),
	__( 'svg' ),
];

const blockAttributes = {
	align: {
		type: 'string',
		default: 'full',
	},
	height: {
		type: 'number',
		default: 100,
	},
	shapeHeight: {
		type: 'number',
		default: 100,
	},
	shapeHeightMobile: {
		type: 'number',
	},
	shapeHeightTablet: {
		type: 'number',
	},
	backgroundHeight: {
		type: 'number',
		default: 50,
	},
	backgroundHeightMobile: {
		type: 'number',
	},
	backgroundHeightTablet: {
		type: 'number',
	},
	syncHeightAlt: {
		type: 'boolean',
		default: true,
	},
	verticalFlip: {
		type: 'boolean',
		default: false,
	},
	horizontalFlip: {
		type: 'boolean',
		default: false,
	},
	color: {
		type: 'string',
	},
	customColor: {
		type: 'string',
		default: '#111',
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	noBottomMargin: {
		type: 'boolean',
		default: true,
	},
	noTopMargin: {
		type: 'boolean',
		default: true,
	},
	justAdded: {
		type: 'boolean',
		default: true,
	},
	...ResponsiveBaseControlAttributes,
};

const settings = {

	title: title,

	description: __( 'Add a shape divider to visually distinquish page sections.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	styles: [
		{ name: 'wavy', label: __( 'Wavy' ), isDefault: true },
		{ name: 'hills', label: __( 'Hills' ) },
		{ name: 'waves', label: __( 'Waves' ) },
		{ name: 'angled', label: __( 'Angled' ) },
		{ name: 'sloped', label: __( 'Sloped' ) },
		{ name: 'rounded', label: __( 'Rounded' ) },
		{ name: 'triangle', label: __( 'Triangle' ) },
		{ name: 'pointed', label: __( 'Pointed' ) },
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

	edit: Edit,

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
			[ `coblocks-shape-divider-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			'is-vertically-flipped' : verticalFlip,
			'is-horizontally-flipped' : horizontalFlip,
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
			attributes: {
				...blockAttributes,
			},
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
					'is-vertically-flipped' : verticalFlip,
					'is-horizontally-flipped' : horizontalFlip,
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
		}
	],
};

export { name, title, icon, settings };

