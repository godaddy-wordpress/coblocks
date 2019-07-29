/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { BackgroundStyles, BackgroundAttributes, BackgroundClasses, BackgroundVideo } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import Edit from './components/edit';
import icons from './components/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { InnerBlocks, getColorClassName } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Features' );

const icon = icons.features;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: title,

	description: __( 'Add up to three columns of small notes for your product or service.' ),

	keywords: [ __( 'services' ), __( 'coblocks' ) ],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':feature',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						columns: 1,
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
			...[ 2, 3 ].map( columns => ( {
				type: 'prefix',
				prefix: Array( columns + 1 ).join( ':' ) + 'features',
				transform( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						columns,
					} );
				},
			} ) ),
		],
	},

	edit: Edit,

	getEditWrapperProps( attributes ) {
		const { id, layout, columns } = attributes;

		// If no layout is seleted, return the following.
		if ( ! layout ) {
			return { 'data-id': id, 'data-columns': columns };
		}

		return { 'data-id': id, 'data-columns': columns };
	},

	save( { attributes, className } ) {
		const {
			coblocks,
			columns,
			contentAlign,
			customTextColor,
			textColor,
			gutter,
			marginSize,
			paddingSize,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', textColor );

		const classes = classnames(
			className, {
				[ `coblocks-features-${ coblocks.id }` ]: coblocks && ( typeof coblocks.id !== 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-features__inner',
			...BackgroundClasses( attributes ), {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
				[ `has-${ gutter }-gutter` ]: gutter,
				[ `has-${ contentAlign }-content` ]: contentAlign,
			} );

		const innerStyles = {
			...BackgroundStyles( attributes ),
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes } data-columns={ columns }>
				<div className={ innerClasses } style={ innerStyles }>
					{ BackgroundVideo( attributes ) }
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
