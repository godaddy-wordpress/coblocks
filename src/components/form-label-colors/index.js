/**
 * WordPress Dependencies
 */
import { hasBlockSupport } from '@wordpress/blocks';

const applyAttributes = ( settings ) => {
	const { name } = settings;
	if ( ! name.startsWith( 'coblocks/' ) ) {
		return settings;
	}

	if ( ! hasBlockSupport( settings, 'labelColor', false ) ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		customTextColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
	};

	return settings;
};

export { applyAttributes };
