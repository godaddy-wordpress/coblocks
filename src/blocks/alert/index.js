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
const { createBlock } = wp.blocks;
const { RichText, getColorClassName } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'alert';

const title = __( 'Alert' );

const icon = icons.alert;

const keywords = [
	__( 'notice' ),
	__( 'message' ),
	__( 'coblocks' ),
];

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
	titleColor: {
		type: 'string',
	},
	textAlign: {
		type: 'string',
	},
	type: {
		type: 'string',
		default: 'default',
	},
	borderColor: {
		type: 'string',
	},
	customBorderColor: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Provide contextual feedback messages.' ),

	keywords: keywords,

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
					return createBlock( `coblocks/${ name }`, { value: content } );
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
			{
				type: 'prefix',
				prefix: ':alert',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
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

	save( { attributes, className } ) {

		const {
			backgroundColor,
			customBackgroundColor,
			customTextColor,
			textAlign,
			textColor,
			title,
			type,
			value,
		} = attributes;

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		const textClass = getColorClassName( 'color', textColor );

		const classes = classnames( `is-${ type }-alert`, {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			textAlign: textAlign ? textAlign : null,
		};

		return (
			<div
				className={ classes }
				style={ styles }
			>
				{ ! RichText.isEmpty( title ) &&
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-alert__title"
						value={ title }
					/>
				}
				{ ! RichText.isEmpty( value ) &&
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-alert__text"
						value={ value }
					/>
				}
			</div>
		);
	},

	deprecated: [
		{
			attributes: {
				...blockAttributes,
				borderColor: {
					type: 'string',
				},
				customBorderColor: {
					type: 'string',
				},
			},

			save( { attributes, className } ) {

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
				} = attributes;

				// Background color class and styles.
				const backgroundClass = getColorClassName( 'background-color', backgroundColor );
				const borderClass = getColorClassName( 'border-color', borderColor );

				const backgroundClasses = classnames(
					className,
					`is-${ type }-alert`,
					`align${ align }`, {
					'has-background': backgroundColor || customBackgroundColor,
					[ backgroundClass ]: backgroundClass,
					[ borderClass ]: borderClass,
				} );

				const backgroundStyles = {
					backgroundColor: backgroundClass ? undefined : customBackgroundColor,
					borderColor: customBorderColor,
					textAlign: textAlign,
				};

				// Title color class and styles.
				const titleClass = getColorClassName( 'color', titleColor );

				const titleClasses = classnames(
					className,
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
							/>
						}
					</div>
				);
			},
		}
	],
};

export { name, title, icon, settings };
