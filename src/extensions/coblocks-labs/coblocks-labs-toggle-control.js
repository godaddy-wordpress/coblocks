/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import CoBlocksLabsModalControl from './coblocks-labs-slot';
import { conditionalHelpMessage, GSEHelpMessage, disabledValue } from './utils';

function CoBlocksLabsToggleControl( {
	label,
	help,
	description,
	imageSrc,
	imageAlt,
	settingsKey,
	showGoHelp,
	conditionalDisable = false,
	conditionalDisableFSE = false,
} ) {
	const [ setting, saveSetting ] = useEntityProp( 'root', 'site', settingsKey );

	// Determine the disabled value using the helper function
	const disabled = disabledValue( conditionalDisable, conditionalDisableFSE );

	const helpCB = ( message ) => conditionalDisableFSE ? GSEHelpMessage( message ) : conditionalHelpMessage( message );

	return (
		<CoBlocksLabsModalControl>
			<section className="coblocks-labs-modal__section">
				<div className="coblocks-labs-modal__section__vertical-group">
					<h2 className="coblocks-labs-modal__section__heading">{ label }</h2>
					{ description && <p className="coblocks-labs-modal__section__description">{ description }</p> }
					<ToggleControl
						checked={ !! setting }
						disabled={ disabled }
						help={ showGoHelp ? helpCB( help ) : '' }
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

