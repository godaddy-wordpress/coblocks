/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;


/**
 * Block constants
 */
const name = 'buttons';

const title = __( 'Buttons' );

const icon = icons.buttons;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	gutter: {
		type: 'string',
		default: 'medium',
	},
	items: {
		type: 'number',
		default: 2,
	},
	stacked: {
		type: 'boolean',
		default: false,
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
};

const settings = {

	title: title,

	description: __( 'Prompt visitors to take action with multiple buttons, side by side.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		stackedOnMobile: true
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: '::buttons',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit: Edit,

	save( { attributes, className } ) {
		const {
			gutter,
			items,
			stacked,
			contentAlign,
			isStackedOnMobile,
		} = attributes;

		const classes = classnames(
			className, {

			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-buttons__inner',{
				[ `flex-align-${ contentAlign }` ] : contentAlign,
				[ `has-${ gutter }-gutter` ] : gutter,
				'is-stacked': stacked,
				'is-stacked-on-mobile': isStackedOnMobile,
			}
		);

		const innerStyles = {
			
		};

		return (
			<div className={ classes }>
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
