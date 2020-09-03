/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { hasBlockSupport } from '@wordpress/blocks';

addFilter(
	'blocks.registerBlockType',
	'coblocks/LabelColors/attributes',
	addAttributes
);

function addAttributes( settings, name ) {
	if ( ! name.startsWith( 'coblocks/' ) ) {
		return settings;
	}

	if ( ! hasBlockSupport( settings, 'labelColor', false ) ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		textColor: {
			type: 'string',
		},
		customTextColor: {
			type: 'string',
		},
	};

	return settings;
}
