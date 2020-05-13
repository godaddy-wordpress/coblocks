/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const aboutLayouts = [];

export const contactLayouts = [];

export const homeLayouts = [
	{
		slug: 'home-one',
		label: __( 'Homepage', 'coblocks' ),
		blocks: [
			[
				"core/spacer",
				{
					"height": 60,
				},
				[]
			],
			[
				"core/heading",
				{
					"align": "center",
					"content": __( 'Where the hustle slows, the rhythm is heard, and the beans are fantastic', 'coblocks' ),
					"level": 2,
					"fontWeight": "",
					"textTransform": "",
					"noBottomSpacing": false,
					"noTopSpacing": false
				},
				[]
			],
			[
				"core/spacer",
				{
					"height": 20,
				},
				[]
			],
			[
				"core/image",
				{
					"align": "wide",
					"url": "https://user-images.githubusercontent.com/1813435/76585612-2e7ca400-64b5-11ea-8ce7-936d4fe9180b.jpg",
					"alt": "Image description",
					"caption": "",
					"id": 1,
					"sizeSlug": "full",
					"linkDestination": "none",
					"className": "is-style-default",
					"noBottomMargin": false,
					"noTopMargin": false,
					"cropX": 0,
					"cropY": 0,
					"cropWidth": 100,
					"cropHeight": 100,
					"cropRotation": 0
				},
				[]
			],
			[
				"core/columns",
				{
					"align": "wide"
				},
				[
					[
						"core/column",
						{
							"width": 20
						},
						[]
					],
					[
						"core/column",
						{
							"width": 60
						},
						[
							[
								"core/heading",
								{
									"align": "center",
									"content": "Enjoy Live Music + the Best Coffee You've Ever Had",
									"level": 3,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/paragraph",
								{
									"align": "center",
									"content": "Connecting audience + artist in our lush, speakeasy-style listening room. Only 50 seats available for this sought-after scene.",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							]
						]
					],
					[
						"core/column",
						{
							"width": 20
						},
						[]
					]
				]
			],
			[
				"coblocks/services",
				{
					"columns": 2,
					"gutter": "huge",
					"align": "wide",
					"headingLevel": 4,
					"buttons": false,
					"className": "alignwide is-style-threebyfour"
				},
				[
					[
						"coblocks/service",
						{
							"headingLevel": 4,
							"showCta": false,
							"imageUrl": "https://user-images.githubusercontent.com/1813435/76585533-fffec900-64b4-11ea-9ba4-fb771f6d7622.jpg",
							"imageAlt": "Image description",
							"alignment": "none"
						},
						[
							[
								"core/heading",
								{
									"content": "A social house",
									"level": 4,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/paragraph",
								{
									"content": "With our guides' experience, we will not only get you to where the fish are - but we'll get you hooked on them too. Our crew is knowledgeable and friendly - ready to take you on the trip of your dreams.",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							]
						]
					],
					[
						"coblocks/service",
						{
							"headingLevel": 4,
							"showCta": false,
							"imageUrl": "https://user-images.githubusercontent.com/1813435/76585544-04c37d00-64b5-11ea-93a2-e287301b67f0.jpg",
							"imageAlt": "Image description",
							"alignment": "none"
						},
						[
							[
								"core/heading",
								{
									"content": "A listening room",
									"level": 4,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/paragraph",
								{
									"content": "Folks have fought some monster bluefin tuna on standup gear with our offshore fishing packager, which is an incredible challenge for sure! Stick to the shoreline and test your strength pulling in some biggies!",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							]
						]
					]
				]
			]
		]
	},

	{
		slug: 'home-two',
		label: __( 'Homepage', 'coblocks' ),
		blocks: [
			[
				"core/image",
				{
					"align": "full",
					"url": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-1.jpg",
					"alt": "Image description",
					"caption": "",
					"id": 0,
					"sizeSlug": "full",
					"linkDestination": "none",
					"noBottomMargin": false,
					"noTopMargin": false,
					"cropX": 0,
					"cropY": 0,
					"cropWidth": 100,
					"cropHeight": 100,
					"cropRotation": 0
				},
				[]
			],
			[
				"core/heading",
				{
					"align": "center",
					"content": "Our approach reflects the people we serve. We are diverse, yet the same.",
					"level": 2,
					"fontWeight": "",
					"textTransform": "",
					"noBottomSpacing": false,
					"noTopSpacing": false
				},
				[]
			],
			[
				"core/button",
				{
					"url": "https://godaddy.com",
					"text": "Learn More",
					"align": "center",
					"className": "is-style-default",
					"fontWeight": "",
					"textTransform": "",
					"noBottomSpacing": false,
					"noTopSpacing": false,
					"isFullwidth": false
				},
				[]
			],
			[
				"core/gallery",
				{
					"images": [
						{
							"url": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-2.jpg",
							"alt": "Image description",
							"id": "1",
							"link": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-2.jpg",
							"caption": []
						},
						{
							"url": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-3.jpg",
							"alt": "Image description",
							"id": "2",
							"link": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-3.jpg",
							"caption": []
						}
					],
					"ids": [
						1,
						2
					],
					"imageCrop": true,
					"linkTo": "none",
					"sizeSlug": "large",
					"align": "wide",
					"noBottomMargin": false,
					"noTopMargin": false
				},
				[]
			],
			[
				"core/columns",
				{
					"align": "wide"
				},
				[
					[
						"core/column",
						{
							"width": 40
						},
						[
							[
								"core/quote",
								{
									"value": "<p>We are 100% committed to quality. From the coffee we source, to the love with which it is roasted by.</p>",
									"citation": "Jenna Stone, Founder",
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							]
						]
					],
					[
						"core/column",
						{
							"width": 60
						},
						[
							[
								"core/paragraph",
								{
									"content": "When we set up shop with an espresso machine up front and a roaster in the back, we hoped to some day be a part of New York's rich tradition of service and culinary achievement. Everyday this aspiration drives us.",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/paragraph",
								{
									"content": "The city's energy binds us together. It drives us to be the best.",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/paragraph",
								{
									"content": "This fairly new coffee shop, conveniently located in downtown Scottsdale, is one of the best coffee shops I've ever been to, and trust me when I say, I've been to many. The owners and the staff will make you feel like an old friend or even family.",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/button",
								{
									"url": "https://godaddy.com",
									"text": "Grab a cup",
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false,
									"isFullwidth": false
								},
								[]
							]
						]
					]
				]
			],
			[
				"core/image",
				{
					"align": "full",
					"url": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-4.jpg",
					"alt": "Image description",
					"caption": "",
					"id": 3,
					"sizeSlug": "full",
					"linkDestination": "none",
					"noBottomMargin": false,
					"noTopMargin": false,
					"cropX": 0,
					"cropY": 0,
					"cropWidth": 100,
					"cropHeight": 100,
					"cropRotation": 0
				},
				[]
			]
		]
	},
];

export const portfolioLayouts = [
	{
		slug: 'portfolio-one',
		label: __( 'Portfolio', 'coblocks' ),
		blocks: [
			[
				"core/spacer",
				{
					"height": 10,
				},
				[]
			],
			[
				"core/columns",
				{
					"align": "wide"
				},
				[
					[
						"core/column",
						{
							"width": 20
						},
						[]
					],
					[
						"core/column",
						{
							"width": 60
						},
						[
							[
								"core/heading",
								{
									"align": "center",
									"content": "Gallery",
									"level": 3,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							],
							[
								"core/paragraph",
								{
									"align": "center",
									"content": "Connecting audience + artist in our lush, speakeasy-style listening room. Only 50 seats available for this sought-after scene.",
									"dropCap": false,
									"fontWeight": "",
									"textTransform": "",
									"noBottomSpacing": false,
									"noTopSpacing": false
								},
								[]
							]
						]
					],
					[
						"core/column",
						{
							"width": 20
						},
						[]
					]
				]
			],
			[
				"core/image",
				{
					"align": "wide",
					"url": "https://user-images.githubusercontent.com/1813435/76585533-fffec900-64b4-11ea-9ba4-fb771f6d7622.jpg",
					"alt": "Image description",
					"caption": "",
					"id": 3,
					"sizeSlug": "full",
					"linkDestination": "none",
					"noBottomMargin": false,
					"noTopMargin": false,
					"cropX": 0,
					"cropY": 0,
					"cropWidth": 100,
					"cropHeight": 100,
					"cropRotation": 0
				},
				[]
			],
			[
				"core/gallery",
				{
					"images": [
						{
							"url": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-2.jpg",
							"alt": "Image description",
							"id": "1",
							"link": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-2.jpg",
							"caption": []
						},
						{
							"url": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-3.jpg",
							"alt": "Image description",
							"id": "2",
							"link": "https://wpnux.godaddy.com/v2/wp-content/mu-plugins/wpnux/starter-content/templates/barista/attachments/home-image-3.jpg",
							"caption": []
						}
					],
					"ids": [
						1,
						2
					],
					"imageCrop": true,
					"linkTo": "none",
					"sizeSlug": "full",
					"align": "wide",
					"noBottomMargin": true,
					"noTopMargin": true
				},
				[]
			],
			[
				"core/image",
				{
					"align": "wide",
					"url": "https://user-images.githubusercontent.com/1813435/76585544-04c37d00-64b5-11ea-93a2-e287301b67f0.jpg",
					"alt": "Image description",
					"caption": "",
					"id": 3,
					"sizeSlug": "full",
					"linkDestination": "none",
					"noBottomMargin": true,
					"noTopMargin": true,
					"cropX": 0,
					"cropY": 0,
					"cropWidth": 100,
					"cropHeight": 100,
					"cropRotation": 0
				},
				[]
			]
		]
	},
];

export const templateCategories = [
	{ label: __( 'About', 'coblocks' ), layouts: aboutLayouts },
	{ label: __( 'Contact', 'coblocks' ), layouts: contactLayouts },
	{ label: __( 'Home', 'coblocks' ), layouts: homeLayouts },
	{ label: __( 'Portfolio', 'coblocks' ), layouts: portfolioLayouts },
];
