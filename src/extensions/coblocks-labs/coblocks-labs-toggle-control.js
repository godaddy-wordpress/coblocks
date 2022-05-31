/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import CoBlocksLabsModalControl from './coblocks-labs-slot';
import { conditionalHelpMessage, controlDisable } from './utils';

function CoBlocksLabsToggleControl( {
	label,
	help,
	description,
	imageSrc,
	imageAlt,
	settingsKey,
	showGoHelp,
	conditionalDisable = false,
} ) {
	const [ setting, saveSetting ] = useEntityProp( 'root', 'site', settingsKey );

	return (
		<CoBlocksLabsModalControl>
			<section className="coblocks-labs-modal__section">
				<div className="coblocks-labs-modal__section__vertical-group">
					<h2 className="coblocks-labs-modal__section__heading">{ label }</h2>
					{ description && <p className="coblocks-labs-modal__section__description">{ description }</p> }
					<ToggleControl
						checked={ !! setting }
						disabled={ conditionalDisable ? controlDisable() : false }
						help={ showGoHelp ? conditionalHelpMessage( help ) : '' }
						onChange={ saveSetting } />
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

