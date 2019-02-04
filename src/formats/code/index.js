/**
 * Internal dependencies
 */
import formatIcons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { toggleFormat } = wp.richText;
const { RichTextToolbarButton, RichTextShortcut } = wp.editor;

/**
 * Block constants
 */
const name = 'coblocks/code';

export const code = {
	name,
	title: __( 'Code' ),
	tagName: 'code',
	className: 'font-mono',
	edit( { isActive, value, onChange } ) {
		const onToggle = () => onChange( toggleFormat( value, { type: name } ) );

		return (
			<Fragment>
				<RichTextShortcut
					type="access"
					character="u"
					onUse={ onToggle }
				/>
				<RichTextToolbarButton
					icon={ formatIcons.code }
					title={ __( 'code' ) }
					onClick={ onToggle }
					isActive={ isActive }
					shortcutType="access"
					shortcutCharacter="x"
				/>
			</Fragment>
		);

	},
};
