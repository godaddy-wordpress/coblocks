/**
 * Internal dependencies
 */
import './styles/editor.scss';
import Edit from './components/edit';
import Save from './components/save';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;

/**
 * Block constants
 */
const name = 'map';

const title = __( 'Map' );

const icon = icons.googleMap;

const keywords = [
	__( 'address' ),
	__( 'maps' ),
	__( 'google' ),
];

const blockAttributes = {
	address: {
		type: 'string',
	},
	lat: {
		type: 'string',
	},
	lng: {
		type: 'string',
	},
	hasApiKey: {
		type: 'boolean',
		default: false,
	},
	pinned: {
		type: 'boolean',
		default: false,
	},
	height: {
		type: 'number',
		default: 400,
	},
	skin: {
		type: 'string',
		default: 'standard',
	},
	zoom: {
		type: 'number',
		default: 12,
	},
	iconSize: {
		type: 'number',
		default: 36,
	},
	mapTypeControl: {
		type: 'boolean',
		default: true,
	},
	zoomControl: {
		type: 'boolean',
		default: true,
	},
	streetViewControl: {
		type: 'boolean',
		default: true,
	},
	fullscreenControl: {
		type: 'boolean',
		default: true,
	},
	controls: {
		type: 'boolean',
		default: true,
	},
	hasError: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Add an address and drop a pin on a Google map.' ),

	keywords: keywords,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	attributes: blockAttributes,

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':map',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit: Edit,

	save: Save,

	deprecated: [
		{
			attributes: blockAttributes,
			save( { attributes } ) {
				const {
					address,
					height,
					lat,
					lng,
					skin,
					zoom,
					iconSize,
					mapTypeControl,
					zoomControl,
					streetViewControl,
					fullscreenControl,
				} = attributes;

				const backgroundStyles = {
					minHeight: height ? height + 'px' : undefined,
				};

				const mapAttributes = {
					address,
					lat,
					lng,
					skin,
					zoom,
					iconSize,
					mapTypeControl,
					zoomControl,
					streetViewControl,
					fullscreenControl,
				};

				const attr = Object
					.keys( mapAttributes )
					.map( key => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
					.join( '||' );

				const dataMap = { 'data-map-attr': attr };

				return (
					<div style={ backgroundStyles } { ...dataMap } />
				);
			},
		},
	],
};

export { name, title, icon, settings };
