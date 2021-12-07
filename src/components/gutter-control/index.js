/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { getBlockSupport, hasBlockSupport } from '@wordpress/blocks';

addFilter(
	'blocks.registerBlockType',
	'coblocks/GutterControl/attributes',
	addAttributes
);

function addAttributes( settings, name ) {
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
}
