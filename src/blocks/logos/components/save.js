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

	return (
		<div className={ classes }>
			<Logos
				images={ images }
			/>
		</div>
	);
}
