/**
 * Internal dependencies
 */
import formatIcons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';

/**
 * Block constants
 */
const name = 'coblocks/uppercase';

const settings = {
	title: __( 'Uppercase', 'coblocks' ),
	tagName: 'span',
	className: 'uppercase',
	edit: ( { isActive, value, onChange } ) => {
		const onToggle = () => onChange( toggleFormat( value, { type: name } ) );

		return (
			<Fragment>
				<RichTextShortcut
					type="access"
					character="u"
					onUse={ onToggle }
				/>
				<RichTextToolbarButton
					icon={ formatIcons.uppercase }
					title={ __( 'Uppercase', 'coblocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
					shortcutType="access"
					shortcutCharacter="u"
				/>
			</Fragment>
		);
	},
};

export { name, settings };
