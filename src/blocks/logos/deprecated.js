/**
 * External dependencies
 */
import classnames from 'classnames';
import { chunk } from 'lodash';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const deprecated = [
	{
		isEligible: ( attributes ) => attributes.className && attributes.className.indexOf( 'has-filter-grayscale' ) !== -1,
		attributes: {
			...metadata.attributes,
			grayscale: {
				type: 'boolean',
				default: false,
			},
		},
		migrate: ( attributes ) => {
			return {
				...attributes,
				className: attributes.className?.replace( 'has-filter-grayscale', 'is-style-black-and-white' ),
			};
		},
		save: ( { attributes, className } ) => {
			const { images, grayscale, align } = attributes;

			const hasImages = !! images.length;

			if ( ! hasImages ) {
				return null;
			}

			const classes = classnames( className, {
				'has-filter-grayscale': grayscale,
			} );

			let count;

			switch ( align ) {
				case 'wide':
					count = 4;
					break;
				case 'full':
					count = 5;
					break;
				default:
					count = 3;
					break;
			}

			const imageChunks = chunk( images, count );

			return (
				<div className={ classes }>
					{ Object.keys( imageChunks ).map( ( keyOuter ) => (
						<div className="wp-block-coblocks-logos__row" key={ 'wrapper-' + keyOuter }>
							{ imageChunks[ keyOuter ].map( ( img, index ) => {
								return (
									<div style={ { width: img.width || ( 100 / images.length ) + '%' } } key={ 'logo-' + keyOuter }>
										<img
											key={ 'img-' + index }
											src={ img.url }
											alt={ img.alt }
											data-id={ img.id }
											data-width={ img.width || ( 100 / images.length ) + '%' }
										/>
									</div>
								);
							} ) }
						</div>
					) ) }
				</div>
			);
		},
	}, {
		attributes: {
			...metadata.attributes,
		},
		save: ( { attributes, className } ) => {
			const { align } = attributes;

			const hasImages = !! attributes.images.length;

			if ( ! hasImages ) {
				return null;
			}

			let count;

			switch ( align ) {
				case 'wide':
					count = 4;
					break;
				case 'full':
					count = 5;
					break;
				default:
					count = 3;
					break;
			}

			const imageChunks = chunk( attributes.images, count );

			return (
				<div className={ className }>
					{ Object.keys( imageChunks ).map( ( keyOuter ) => {
						const images = imageChunks[ keyOuter ];

						return (
							<div className="wp-block-coblocks-logos__row" key={ 'wrapper-' + keyOuter }>
								{ images.map( ( img, index ) => {
									return (
										<div style={ { width: img.width || ( 100 / images.length ) + '%' } } key={ 'logo-' + keyOuter }>
											<img
												key={ 'img-' + index }
												src={ img.url }
												alt={ img.alt }
												data-id={ img.id }
												data-width={ img.width || ( 100 / images.length ) + '%' }
											/>
										</div>
									);
								} ) }
							</div>
						);
					} ) }
				</div>
			);
		},
	},
];

export default deprecated;
