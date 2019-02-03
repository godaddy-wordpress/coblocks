/**
 * External dependencies
 */
import Masonry from 'react-masonry-component';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './components/api.js';
import icons from './../../utils/icons';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { SelectControl, Placeholder, Button, Dashicon, Spinner, Modal, withAPIData, TabPanel } = wp.components;
const { Fragment, Component } = wp.element;
const { createBlock } = wp.blocks;
const { registerStore, withSelect, } = wp.data;
const { addQueryArgs } = wp.url;

const masonryOptions = {
	transitionDuration: 0,
};

/**
 * Block constants
 */
const name = 'inserter';

const title = __( 'CoBlocks' );

const icon = icons.templateInserter;

const keywords = [
	__( 'layouts' ),
	__( 'sections' ),
	__( 'templates' ),
];

const settings = {

	title: title,

	description : __( 'Add a saved CoBlocks section or template.' ),

	icon: {
		src: icon,
		background: '#f9f9f9',
		foreground: '#536DFF',
	},

	keywords: keywords,

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':coblocks',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			{
				type: 'prefix',
				prefix: ':section',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			{
				type: 'prefix',
				prefix: ':template',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit:  Edit,

	save( { attributes } ) {

		const { content } = attributes;

		return (
			<div>
				{ content }
			</div>
		);
	},
};

export { name, title, icon, settings };
