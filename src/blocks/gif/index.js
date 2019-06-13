/**
 * External dependencies
 */
import classnames from 'classnames';

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
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;

/**
 * Block constants
 */
const name = 'gif';

const title = __( 'Gif' );

const icon = icons.gif;

const keywords = [
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
		default: '',
	},
	caption: {
		type: 'string',
		source: 'html',
		selector: 'figcaption',
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
			caption,
		} = attributes;

		const classes = classnames( {
			[ `align${ align }` ]: align,
			'is-resized': width || height,
		} );

		const image = (
			<img
				src={ url }
				alt={ alt }
				width={ width }
				height={ height }
			/>
		);

		const figure = (
			<Fragment>
				{ image }
				{ ! RichText.isEmpty( caption ) && <RichText.Content tagName="figcaption" value={ caption } /> }
			</Fragment>
		);

		if ( 'left' === align || 'right' === align || 'center' === align ) {
			return (
				<div className={ 'wp-block-image' }>
					<figure className={ classes }>
						{ figure }
					</figure>
				</div>
			);
		}

		return (
			<figure className={ classes }>
				{ figure }
			</figure>
		);
	},
};

export { name, title, icon, settings };

