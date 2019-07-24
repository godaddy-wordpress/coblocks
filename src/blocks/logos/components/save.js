/**
 * WordPress dependencies.
 */
import classnames from 'classnames';
import { chunk } from 'lodash';

export default function save( { attributes, className } ) {
	const { images, grayscale } = attributes;

	const hasImages = !! images.length;

	if ( ! hasImages ) {
		return null;
	}

	const classes = classnames( className, {
		'has-filter-grayscale': grayscale,
	} );

	const imageChunks = chunk( images, 4 );

	return (
		<div className={ classes }>
			{ Object.keys( imageChunks ).map( keyOuter => {
				const images = imageChunks[ keyOuter ];
				return (
					<div className="wrapper" key={ 'wrapper-' + keyOuter }>
						{ images.map( ( img, index ) => {
							return (
								<img
									key={ 'img-' + index }
									src={ img.url }
									alt={ img.alt }
									data-id={ img.id }
									width={ img.width || ( 100 / images.length ) + '%' }
								/>
							);
						} ) }
					</div>
				);
			} ) }
		</div>
	);
}
