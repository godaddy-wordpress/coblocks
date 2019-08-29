/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import icon from './icon';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const settings = {
	title: __( 'Click to Tweet' ),
	description: __( 'Add a quote for readers to tweet via Twitter.' ),
	icon,
	keywords: [ __( 'share' ), __( 'twitter' ), 'coblocks' ],
	attributes,
	transforms,
	edit,
	save,
};

export { name, settings };
