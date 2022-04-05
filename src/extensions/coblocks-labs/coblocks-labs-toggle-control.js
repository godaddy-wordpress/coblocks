/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoBlocksLabsModalControl from './coblocks-labs-slot';

function CoBlocksLabsToggleControl( { label, help, description, imageSrc, imageAlt } ) {
	return (
		<CoBlocksLabsModalControl>
			<section className="coblocks-labs-modal__section">
				<div className="coblocks-labs-modal__section__vertical-group">
					<h2 className="coblocks-labs-modal__section__heading">{ label }</h2>
					{ description && <p className="coblocks-labs-modal__section__description">{ description }</p> }
					<ToggleControl checked={ true } help={ help } />
				</div>

				<figure>
					<img alt={ imageAlt } src={ imageSrc } />
				</figure>

			</section>
			<hr />
		</CoBlocksLabsModalControl>
	);
}

export default CoBlocksLabsToggleControl;

