/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { RichText, getColorClassName } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-alert__title',
	},
	value: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-alert__text',
		default: [],
	},
	backgroundColor: {
		type: 'string',
	},
	borderColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	customTitleColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customBorderColor: {
		type: 'string',
	},
	titleColor: {
		type: 'string',
	},
	align: {
		type: 'string',
	},
	textAlign: {
		type: 'string',
		default: 'left',
	},
	type: {
		type: 'string',
		default: 'default',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/alert', {

	title: __( 'Alert' ),

	description: __( 'Provide contextual feedback messages.' ),

	icon: {
		src: icons.alert,
	},

	category: 'coblocks',

	keywords: [
		__( 'notice' ),
		__( 'message' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	supports: {
		align: true,
		alignWide: false,
		alignFull: false,
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'coblocks/alert', { value: content } );
				},
			},
			{
				type: 'raw',
				selector: 'div.wp-block-coblocks-alert',
				schema: {
					div: {
						classes: [ 'wp-block-coblocks-alert' ],
					},
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { value } ) => {
					// transforming an empty alert element
					if ( ! value || ! value.length ) {
						return createBlock( 'core/paragraph' );
					}
					// transforming an alert element with content
					return ( value || [] ).map( item => createBlock( 'core/paragraph', {
						content: value,
					} ) );
				},
			},
		],
	},

	edit: Edit,

	save: function( props ) {

		const {
			align,
			backgroundColor,
			borderColor,
			customBackgroundColor,
			customBorderColor,
			customTextColor,
			customTitleColor,
			textAlign,
			textColor,
			title,
			titleColor,
			type,
			value,
		} = props.attributes;

		// Background color class and styles.
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		const borderClass = getColorClassName( 'border-color', borderColor );

		const backgroundClasses = classnames(
			props.className,
			`is-${ type }-alert`,
			`align${ align }`, {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
			[ borderClass ]: borderClass,
		} );

		const backgroundStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			borderColor: borderClass ? undefined : customBorderColor,
			textAlign: textAlign,
		};

		// Title color class and styles.
		const titleClass = getColorClassName( 'color', titleColor );

		const titleClasses = classnames(
			props.className,
			'wp-block-coblocks-alert__title', {
			'has-text-color': titleColor || customTitleColor,
			[ titleClass ]: titleClass,
		} );

		const titleStyles = {
			color: titleClass ? undefined : customTitleColor,
		};

		// Text color class and styles.
		const textClass = getColorClassName( 'color', textColor );

		const textClasses = classnames(
			'wp-block-coblocks-alert__text', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
		} );

		const textStyles = {
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div
				className={ backgroundClasses }
				style={ backgroundStyles }
			>
				{ ! RichText.isEmpty( title ) &&
					<RichText.Content
						tagName="p"
						className={ titleClasses }
						value={ title }
						style={ titleStyles }
					/>
				}
				{ ! RichText.isEmpty( value ) &&
					<RichText.Content
						tagName="p"
						className={ textClasses }
						value={ value }
						style={ textStyles }
						// multiline
					/>
				}
			</div>
		);
	},
} );