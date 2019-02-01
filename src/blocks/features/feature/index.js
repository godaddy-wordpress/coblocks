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

const blockAttributes = {
	contentAlign: {
		type: 'string',
	},
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'A singular column within a parent Features block.' ),

	attributes: blockAttributes,

	parent: [ 'coblocks/features' ],

	supports: {
		inserter: false,
	},

	edit: Edit,

	save( { attributes, className } ) {

		const {
			contentAlign,
		} = attributes;

		const classes = classnames(
			className, {
			[ `has-${ contentAlign }-content` ]: contentAlign,
		} );

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, title, icon, settings };
