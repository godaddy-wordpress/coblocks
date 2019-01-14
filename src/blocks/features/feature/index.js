/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses, BackgroundImageTransforms } from '../../../components/background';

import Edit from './components/edit';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { RichText, InnerBlocks, getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'feature';

const title = __( 'Feature' );

const icon = icons.feature;

const keywords = [
	__( 'columns' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	image: {
		type: 'boolean',
		default: false,
	},
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'Add up to four columns of features.' ),

	keywords: keywords,

	attributes: blockAttributes,

	parent: [ 'coblocks/features' ],

	supports: {
		inserter: false,
	},

	edit: Edit,

	save() {

		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, title, icon, settings };
