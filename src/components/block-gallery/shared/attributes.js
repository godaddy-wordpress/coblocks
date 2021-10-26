/**
 * Set global attributes that every block uses.
 *
 * @type {Object}
 */
const GalleryAttributes = {
	images: {
		type: 'array',
		default: [],
		source: 'query',
		selector: '.coblocks-gallery--item',
		query: {
			url: {
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			link: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-link',
			},
			imgLink: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-imglink',
			},
			alt: {
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: '',
			},
			id: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-id',
			},
			caption: {
				type: 'array',
				source: 'children',
				selector: 'figcaption',
			},
		},
	},
	linkTo: {
		type: 'string',
		default: 'none',
	},
	target: {
		type: 'string',
	},
	rel: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
	},
	gutter: {
		type: 'number',
		default: 15,
	},
	gutterMobile: {
		type: 'number',
		default: 15,
	},
	radius: {
		type: 'number',
		default: 0,
	},
	shadow: {
		type: 'string',
		default: 'none',
	},
	filter: {
		type: 'string',
		default: 'none',
	},
	captions: {
		type: 'boolean',
		default: false,
	},
	captionStyle: {
		type: 'string',
		default: 'dark',
	},
	captionColor: {
		type: 'string',
	},
	customCaptionColor: {
		type: 'string',
	},
	fontSize: {
		type: 'string',
	},
	customFontSize: {
		type: 'number',
	},
	primaryCaption: {
		type: 'array',
		source: 'children',
		selector: '.coblocks-gallery--primary-caption',
	},
	backgroundRadius: {
		type: 'number',
		default: 0,
	},
	backgroundPadding: {
		type: 'number',
		default: 0,
	},
	backgroundPaddingMobile: {
		type: 'number',
		default: 0,
	},
	lightbox: {
		type: 'boolean',
		default: false,
	},
};

export default GalleryAttributes;
