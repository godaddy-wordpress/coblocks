/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'gif';

const title = __( 'Gif' );

const icon = icons.gif;

const keywords = [
	__( 'image' ),
	__( 'animated' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	url: {
		attribute: 'src',
		selector: 'img',
		source: 'attribute',
		type: 'string',
	},
	alt: {
		attribute: 'alt',
		selector: 'img',
		source: 'attribute',
		type: 'string',
	},
	align: {
		type: 'string',
	},
	width: {
		type: 'number',
	},
	height: {
		type: 'number',
	},
};

const settings = {

	title: title,

	description: __( 'Pick a gif, any gif.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		customClassName: false,
		html: false,
	},

	getEditWrapperProps( attributes ) {
		const { align, width } = attributes;
		if ( 'left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
	},

	edit: Edit,

	save( { attributes } ) {

		const {
			url,
			alt,
			align,
			width,
			height,
		} = attributes;

		const image = (
			<img
				src={ url }
				alt={ alt }
				width={ width }
				height={ height }
			/>
		);

		if ( url ) {
			return (
				<figure className={ align ? `align${ align }` : null }>
					{ image }
				</figure>
			);
		}

		return null;
	},
};

export { name, title, icon, settings };

