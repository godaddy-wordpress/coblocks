/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { InnerBlocks, getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'features';

const title = __( 'Features' );

const icon = icons.feature;

const keywords = [
	__( 'icons' ),
	__( 'services' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	gutter: {
		type: 'string',
		default: 'large',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'Add up to three columns of small notes for your product or service.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksBlockSpacing: true,
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':feature',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						columns: 1
					} );
				},
			},
			{
				type: 'prefix',
				prefix: ':features',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			...[ 2, 3 ].map( ( columns ) => ( {
				type: 'prefix',
				prefix: Array( columns + 1 ).join( ':' ) + 'features',
				transform( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						columns,
					} );
				},
			} ) ),
		]
	},

	edit: Edit,

	getEditWrapperProps( attributes ) {
		const { id, layout, columns } = attributes;

		// If no layout is seleted, return the following.
		if ( ! layout ) {
			return { 'data-id': id, 'data-columns': columns, };
		}

		return { 'data-id': id, 'data-columns': columns };
	},

	save( { attributes, className } ) {

		const {
			coblocks,
			backgroundColor,
			backgroundImg,
			columns,
			contentAlign,
			customBackgroundColor,
			customTextColor,
			textColor,
			gutter,
			marginSize,
			paddingSize,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames(
			className, {
				[ `coblocks-features-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-features__inner',
			...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
			'has-margin': marginSize && marginSize != 'no',
			[ `has-${ marginSize }-margin` ] : marginSize && ( marginSize != 'advanced' ),
			[ `has-${ gutter }-gutter` ] : gutter,
			[ `has-${ contentAlign }-content` ]: contentAlign,
		} );

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes } data-columns={ columns } >
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
