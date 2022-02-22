/**
 * Deprecated.
 *
 * These block attributes should no longer be globally assigned in favor of block.json defined attributes.
 *
 * @type {Object}
 */
const GalleryAttributes = {
	align: {
		type: 'string',
	},
	backgroundPadding: {
		default: 0,
		type: 'number',
	},
	backgroundPaddingMobile: {
		default: 0,
		type: 'number',
	},
	backgroundRadius: {
		default: 0,

		type: 'number',
	},
	captionColor: {
		type: 'string',
	},
	captionStyle: {
		default: 'dark',
		type: 'string',
	},
	captions: {
		default: false,
		type: 'boolean',
	},
	customCaptionColor: {
		type: 'string',
	},
	customFontSize: {
		type: 'number',
	},
	filter: {
		default: 'none',
		type: 'string',
	},

	fontSize: {
		type: 'string',
	},
	gutter: {
		default: 15,
		type: 'number',
	},
	gutterMobile: {
		default: 15,
		type: 'number',
	},
	images: {
		default: [],
		query: {
			alt: {
				attribute: 'alt',
				default: '',
				selector: 'img',
				source: 'attribute',
			},
			caption: {
				selector: 'figcaption',
				source: 'children',
				type: 'array',
			},
			id: {
				attribute: 'data-id',
				selector: 'img',
				source: 'attribute',
			},
			imgLink: {
				attribute: 'data-imglink',
				selector: 'img',
				source: 'attribute',
			},
			link: {
				attribute: 'data-link',
				selector: 'img',
				source: 'attribute',
			},
			url: {
				attribute: 'src',
				selector: 'img',
				source: 'attribute',
			},
		},
		selector: '.coblocks-gallery--item',
		source: 'query',
		type: 'array',
	},
	lightbox: {
		default: false,
		type: 'boolean',
	},
	linkTo: {
		default: 'none',
		type: 'string',
	},
	primaryCaption: {
		selector: '.coblocks-gallery--primary-caption',
		source: 'children',
		type: 'array',
	},
	radius: {
		default: 0,
		type: 'number',
	},
	rel: {
		default: '',
		type: 'string',
	},
	shadow: {
		default: 'none',
		type: 'string',
	},
	target: {
		type: 'string',
	},
};

export default GalleryAttributes;
