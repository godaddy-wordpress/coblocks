/**
 * WordPress dependencies.
 */
import classnames from 'classnames';
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

	const classes = classnames(
		className,
		{
			'has-filter-grayscale' : blackAndWhite,
		}
	);

	if ( ! hasImages ) {
		return (
			null
		);
	}

	var imageChunks = chunk( images, 4 );

	return (
		<div className={ classes }>
			{ Object.keys( imageChunks ).map( keyOuter => {
				return (
					<Logos
						images={ imageChunks }
						imageKey={ keyOuter }
					/>
				);
			} ) }
		</div>
	);
}
