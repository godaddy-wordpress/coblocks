/**
 * WordPress dependencies.
 */
import { chunk } from 'lodash';

export default function save( { attributes, className } ) {
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
}
