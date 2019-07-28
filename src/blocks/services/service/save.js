/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { className, attributes } ) {
	return (
		<div className={ className }>
			{ attributes.imageUrl && (
				<figure className="wp-block-coblocks-service__figure">
					<img
						src={ attributes.imageUrl }
						alt={ attributes.imageAlt }
						style={ { objectPosition: attributes.focalPoint ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined } }
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-service__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
