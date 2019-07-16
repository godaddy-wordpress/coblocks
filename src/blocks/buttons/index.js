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
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.blockEditor;


/**
 * Block constants
 */
const name = 'buttons';

const title = __( 'Buttons' );

const icon = icons.buttons;

const keywords = [
	__( 'link' ),
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
		default: 'left',
	},
	isStackedOnMobile: {
		type: 'boolean',
		default: false,
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
			...[ 1, 2, 3, 4 ].map( ( items ) => ( {
				type: 'prefix',
				prefix: Array( items + 1 ).join( ':' ) + 'buttons',
				transform( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						items,
					} );
				},
			} ) ),
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

		return (
			<div className={ classes }>
				<div className={ innerClasses }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
