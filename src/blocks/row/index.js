/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import { Deprecation, DeprecationVideo } from './components/deprecations';
import Edit from './components/edit';
import icons from './../../utils/icons';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import Save from './components/save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;

/**
 * Generates a layout based on the :row prefix.
 * The number of :: represents the number of columns to input.
 * We fallback to the standard divided column layouts.
 *
 * @param {int} columns The number of columns.
 * @return {String} defaultLayout
 */
function generateLayout( columns ) {
	let defaultLayout;

	switch ( columns ) {
		default:
		case 2:
			defaultLayout = '50-50';
			break;
		case 3:
			defaultLayout = '33-33-33';
			break;
		case 4:
			defaultLayout = '25-25-25-25';
			break;
	}

	return defaultLayout;
}

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Row' );

const icon = icons.row;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.' ),

	keywords: [	__( 'rows' ), __( 'columns' ), __( 'layouts' )	],

	attributes,

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
				transform( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						columns,
						layout: generateLayout( columns ),
					} );
				},
			} ) ),
		],
	},

	edit: Edit,

	getEditWrapperProps( attributes ) {
		const { id, layout, columns, hasAlignmentControls } = attributes;

		// If no layout is seleted, return the following.
		if ( ! layout ) {
			return { 'data-id': id, 'data-columns': columns, 'data-layout': 'none' };
		}

		if ( hasAlignmentControls === false ) {
			return { 'data-align': '' };
		}

		return { 'data-id': id, 'data-columns': columns, 'data-layout': layout };
	},

	save: Save,

	deprecated: [
		{
			attributes,
			save: DeprecationVideo,
		},
		{
			attributes: {
				isStackedOnMobile: {
					type: 'boolean',
					default: true,
				},
				...attributes,
			},
			save: Deprecation,
		},
	],
};

export { name, title, icon, settings };
