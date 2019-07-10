/**
 * WordPress dependencies.
 */
import { chunk } from 'lodash';

/**
 * Internal dependencies
 */
import Logos from './logos';

export default function save( { attributes, className } ) {
	const {
		images,
		blackAndWhite,
		align,
		fullwidth,
	} = attributes;

	const hasImages = !! images.length;

	if ( ! hasImages ) {

		return (
			null
		);
	}

	var imageChunks = chunk( images, 4 );

	return (
		<div className={ className }>
			{ Object.keys( imageChunks ).map( keyOuter => {
				return (
					<Logos
						images={ imageChunks[ keyOuter ] }
					/>
				);
			} ) }
		</div>
	);
}
