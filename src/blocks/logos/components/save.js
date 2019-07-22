/**
 * WordPress dependencies.
 */
import classnames from 'classnames';
import { chunk } from 'lodash';

export default function save( { attributes, className } ) {
	const {
		images,
		blackAndWhite,
	} = attributes;

	const hasImages = !! images.length;

	if ( ! hasImages ) {
		return ( null );
	}

	const classes = classnames(
		className,
		{
			'has-filter-grayscale' : blackAndWhite,
		}
	);

	let imageChunks = chunk( images, 4 );

	return (
		<div className={ classes }>
			{ Object.keys( imageChunks ).map( keyOuter => {

				var images = imageChunks[ keyOuter ];

				return (
					<div className="wrapper">
						{ images.map( ( img, index ) => {
							return (
								<div style={ {
									width: img.width ? img.width : ( ( 100 / images.length ) + '%' ),
								} }>
									<img
										src={ img.url }
										alt={ img.alt }
										data-id={ img.id }
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
