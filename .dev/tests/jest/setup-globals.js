// TODO: Utilize the REST API without the global.
// Backbone REST API client
global.wp = {};

global.CSS = {};

// Prevent console messages when running tests.
console = {
	...console,

	/**
	 * Jest tests for deprecated and transforms result in native info console responses.
	 * Deleting the info method of `console` we are able to prevent test failures.
	 *
	 * Alternatively; we could assert with `@wordpress/jest-console` using
	 * `expect( console ).toHaveWarned();` however there are inconsistent results between
	 * various assertions making it difficult to conditionally assert with `jest-console`
	 */
	groupCollapsed: () => { },
	info: () => { },
	warn: () => { },
};

global.coblocksLayoutSelector = {
	categories: [],
	layouts: [],
};

// Mock site design state for tests.
const siteDesignURLBase = 'http://localhost:8889';
// Disable reason: sorting keys for this object is superfluous.
/* eslint-disable sort-keys */
global.siteDesign = {
	availableDesignStyles: {
		traditional: {
			slug: 'traditional',
			label: 'Traditional',
			url: `${ siteDesignURLBase }/wp-content/themes/go/dist/css/design-styles/style-traditional.css`,
			editor_style: 'dist/css/design-styles/style-traditional-editor.css',
			color_schemes: {
				one: {
					label: 'Apricot',
					primary: '#c76919',
					secondary: '#122538',
					tertiary: '#f8f8f8',
					background: '#ffffff',
				},
				two: {
					label: 'Emerald',
					primary: '#165153',
					secondary: '#212121',
					tertiary: '#f3f1f0',
					background: '#ffffff',
				},
				three: {
					label: 'Brick',
					primary: '#87200e',
					secondary: '#242611',
					tertiary: '#f9f2ef',
					background: '#ffffff',
				},
				four: {
					label: 'Bronze',
					primary: '#a88548',
					secondary: '#05212d',
					tertiary: '#f9f4ef',
					background: '#ffffff',
				},
			},
			fonts: {
				'Crimson Text': [
					'400',
					'400i',
					'700',
					'700i',
				],
				'Nunito Sans': [
					'400',
					'400i',
					'600',
					'700',
				],
			},
			font_size: '1.05rem',
			type_ratio: '1.275',
			viewport_basis: '900',
		},
		modern: {
			slug: 'modern',
			label: 'Modern',
			url: `${ siteDesignURLBase }/wp-content/themes/go/dist/css/design-styles/style-modern.css`,
			editor_style: 'dist/css/design-styles/style-modern-editor.css',
			color_schemes: {
				one: {
					label: 'Shade',
					primary: '#000000',
					secondary: '#455a64',
					tertiary: '#eceff1',
					background: '#ffffff',
				},
				two: {
					label: 'Blush',
					primary: '#c2185b',
					secondary: '#ec407a',
					tertiary: '#fce4ec',
					background: '#ffffff',
				},
				three: {
					label: 'Indigo',
					primary: '#303f9f',
					secondary: '#5c6bc0',
					tertiary: '#e8eaf6',
					background: '#ffffff',
				},
				four: {
					label: 'Pacific',
					primary: '#00796b',
					secondary: '#26a69a',
					tertiary: '#e0f2f1',
					background: '#ffffff',
				},
			},
			fonts: {
				Heebo: [
					'800',
					'400',
				],
				'Fira Code': [
					'400',
					'400i',
					'700',
				],
				Montserrat: [
					'400',
					'700',
				],
			},
			font_size: '0.85rem',
			type_ratio: '1.3',
			viewport_basis: '950',
		},
	},
	currentColorScheme: 'one',
	currentColors: {
		background: '#ffffff',
		primary: '#c76919',
		secondary: '#122538',
		tertiary: '#f8f8f8',
	},
	currentDesignStyle: 'traditional',
	currentFonts: {
		Poppins: [
			'600',
		],
		Quicksand: [
			'400',
			'600',
		],
	},
	editorClass: 'editor-styles-wrapper',
	fontSize: '1rem',
	fonts: [
		{
			'Crimson Text': [
				'400',
				'400i',
				'700',
				'700i',
			],
			'Nunito Sans': [
				'400',
				'400i',
				'600',
				'700',
			],
		},
		{
			'Fira Code': [
				'400',
				'400i',
				'700',
			],
			Heebo: [
				'800',
				'400',
			],
			Montserrat: [
				'400',
				'700',
			],
		},
		{
			'Noto Sans': [
				'400',
				'400i',
				'700',
			],
			'Source Code Pro': [
				'400',
				'700',
			],
			Trocchi: [
				'400',
				'600',
			],
		},
		{
			Karla: [
				'400',
				'400i',
				'700',
			],
			'Work Sans': [
				'300',
				'700',
			],
		},
		{
			Poppins: [
				'600',
			],
			Quicksand: [
				'400',
				'600',
			],
		},
		{
			Cardo: [
				'700',
			],
			Roboto: [
				'400',
			],
		},
		{
			Vollkorn: [
				'400',
			],
			'Yeseva One': [
				'400',
			],
		},
		{
			Anton: [
				'400',
			],
			'IBM Plex Sans': [
				'400',
			],
		},
		{
			'IBM Plex Mono_body': [
				'400',
			],
			'IBM Plex Mono_heading': [
				'600',
				'400',
			],
		},
		{
			'Open Sans': [
				'400',
			],
			Recursive: [
				'900',
			],
		},
	],
};

global.coblocksLabs = true;
