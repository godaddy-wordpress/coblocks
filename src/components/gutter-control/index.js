/**
 * WordPress Dependencies
 */
import { getBlockSupport, hasBlockSupport } from '@wordpress/blocks';

const applyAttributes = ( settings ) => {
	const { name } = settings;
	if ( ! name.startsWith( 'coblocks/' ) ) {
		return settings;
	}

	if ( ! hasBlockSupport( settings, 'gutter', false ) ) {
		return settings;
	}

	const supportOverride = getBlockSupport( settings, 'gutter', false );

	settings.attributes = {
		...settings.attributes,
		gutter: {
			default: supportOverride.default || 'small',
			type: 'string',
		},
		gutterCustom: {
			default: supportOverride.customDefault?.toString() || '3',
			type: 'string',
		},
	};

	return settings;
};

export { applyAttributes };
