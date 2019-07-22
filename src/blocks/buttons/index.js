/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import deprecated from './components/deprecated';
import metadata from './block.json';
import edit from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

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

const settings = {

	title: title,

	description: __( 'Prompt visitors to take action with multiple buttons, side by side.' ),

	keywords: keywords,

	attributes: metadata.attributes,

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

	edit,

	save( { attributes, className } ) {
		const {
			contentAlign,
			isStackedOnMobile,
		} = attributes;

		const innerClasses = classnames(
			'wp-block-coblocks-buttons__inner',{
				[ `flex-align-${ contentAlign }` ] : contentAlign,
				'is-stacked-on-mobile': isStackedOnMobile,
			}
		);

		return (
			<div className={ className }>
				<div className={ innerClasses }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
	deprecated,
};

export { name, title, icon, settings };
