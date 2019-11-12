/**
 * WordPress dependencies.
 */
import classnames from 'classnames';
import { chunk } from 'lodash';

export default function save( { attributes, className } ) {
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
			{ Object.keys( imageChunks ).map( keyOuter => {
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
