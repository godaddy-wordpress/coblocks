/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { className, attributes } ) {
	const {
		focalPoint,
		href,
		imageAlt,
		imageUrl,
		linkClass,
		linkTarget,
		rel,
	} = attributes;

	const image = (
		<img
			src={ imageUrl }
			alt={ imageAlt }
			style={ { objectPosition: focalPoint ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined } }
		/>
	);

	const figure = (
		<figure className="wp-block-coblocks-service__figure">
			{ href ? (
				<a
					className={ linkClass }
					href={ href }
					target={ linkTarget }
					rel={ rel ?? undefined }
				>
					{ image }
				</a>
			) : ( image ) }
		</figure>
	);

	return (
		<div className={ className }>
			{ imageUrl && figure }
			<div className="wp-block-coblocks-service__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
