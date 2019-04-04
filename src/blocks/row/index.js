/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';
import BackgroundPanel, { BackgroundAttributes, BackgroundClasses, BackgroundTransforms, BackgroundVideo } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { getColorClassName, InnerBlocks } = wp.editor;
const { createBlock } = wp.blocks;

/**
 * Generates a layout based on the :row prefix.
 * The number of :: represents the number of columns to input.
 * We fallback to the standard divided column layouts.
 */
function generateLayout( columns ) {

	let defaultLayout = '50-50';

	if ( columns == 2 ) {
		defaultLayout = '50-50';
	} else if ( columns == 3 ) {
		defaultLayout = '33-33-33';
	} else if ( columns == 4 ) {
		defaultLayout = '25-25-25-25';
	}

	return defaultLayout;
}

/**
 * Block constants
 */
const name = 'row';

const title = __( 'Row' );

const icon = icons.row;

const keywords = [
	__( 'rows' ),
	__( 'columns' ),
	__( 'layouts' ),
];

const blockAttributes = {
	id: {
		type: 'number',
	},
	columns: {
		type: 'number',
	},
	layout: {
		type: 'string',
	},
	gutter: {
		type: 'string',
		default: 'medium',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':row',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			...[ 2, 3, 4 ].map( ( columns ) => ( {
				type: 'prefix',
				prefix: Array( columns + 1 ).join( ':' ) + 'row',
				transform( content, layout ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						columns,
						layout: generateLayout( columns )
					} );
				},
			} ) ),
		]
	},

	edit: Edit,

	getEditWrapperProps( attributes ) {
		const { id, layout, columns, hasAlignmentControls } = attributes;

		// If no layout is seleted, return the following.
		if ( ! layout ) {
			return { 'data-id': id, 'data-columns': columns, 'data-layout': 'none' };
		}

		if ( hasAlignmentControls == false ) {
			return { 'data-align': '' };
		}

		return { 'data-id': id, 'data-columns': columns, 'data-layout': layout };
	},

	save( { attributes, className } ) {

		const {
			coblocks,
			backgroundColor,
			backgroundImg,
			columns,
			customBackgroundColor,
			customTextColor,
			gutter,
			id,
			layout,
			isStackedOnMobile,
			marginBottom,
			marginLeft,
			marginRight,
			marginSize,
			marginSyncUnits,
			marginTop,
			marginUnit,
			paddingBottom,
			paddingLeft,
			paddingRight,
			paddingSize,
			paddingSyncUnits,
			paddingTop,
			paddingUnit,
			textColor,
			focalPoint,
			hasParallax,
			backgroundType,
		} = attributes;

		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( {
				[ `coblocks-row--${ id }` ] : id,
				[ `coblocks-row-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-row__inner',
			...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `has-${ gutter }-gutter` ] : gutter,
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
			'has-margin': marginSize && marginSize != 'no',
			[ `has-${ marginSize }-margin` ] : marginSize && ( marginSize != 'advanced' ),
			'is-stacked-on-mobile': isStackedOnMobile,
		} );

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg && backgroundType == 'image' ? `url(${ backgroundImg })` : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes } data-id={ id } data-columns={ columns } data-layout={ layout } >
				{ BackgroundVideo( attributes ) }
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: [ {
		attributes: {
			isStackedOnMobile: {
				type: 'boolean',
				default: true,
			},
			...blockAttributes,
		},
		save( { attributes, className } ) {

			const {
				coblocks,
				backgroundColor,
				backgroundImg,
				columns,
				customBackgroundColor,
				customTextColor,
				gutter,
				id,
				layout,
				isStackedOnMobile,
				marginBottom,
				marginLeft,
				marginRight,
				marginSize,
				marginSyncUnits,
				marginTop,
				marginUnit,
				paddingBottom,
				paddingLeft,
				paddingRight,
				paddingSize,
				paddingSyncUnits,
				paddingTop,
				paddingUnit,
				textColor,
			} = attributes;

			const textClass = getColorClassName( 'color', textColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			let classlist = {
				[ `coblocks-row--${ id }` ] : id,
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
			};

			if( coblocks && ( typeof coblocks.id != 'undefined' ) ) {
				classlist = Object.assign( classlist, [ `coblocks-row-${ coblocks.id }` ] );
			}

			const classes = classnames( classlist );

			const styles = {
				color: textClass ? undefined : customTextColor,
			};

			const innerClasses = classnames(
				'wp-block-coblocks-row__inner',
				...BackgroundClasses( attributes ), {
				[ `has-${ gutter }-gutter` ] : gutter,
				'has-padding': paddingSize && paddingSize != 'no',
				[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
				'has-margin': marginSize && marginSize != 'no',
				[ `has-${ marginSize }-margin` ] : marginSize && ( marginSize != 'advanced' ),
				'is-stacked-on-mobile': isStackedOnMobile,
			} );

			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			};

			return (
				<div className={ classes } data-id={ id } data-columns={ columns } data-layout={ layout } style={ styles } >
					<div className={ innerClasses } style={ innerStyles }>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	],
};

export { name, title, icon, settings };
