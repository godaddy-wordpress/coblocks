/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { ColorPicker, Tooltip, Dropdown, Button } = wp.components;

export default function InlineColorPicker( { disableCustomColors = false, value, onChange, className } ) {
	function applyOrUnset( color ) {
		return () => onChange( value === color ? undefined : color );
	}
	const customColorPickerLabel = __( 'Custom color picker' );
	const classes = classnames( 'components-color-palette', 'components-coblocks-inline-color-picker', className );
	return (
		<div className={ classes }>
			<div className="components-color-palette__custom-clear-wrapper">
				{ ! disableCustomColors &&
					<Dropdown
						className="components-color-palette__custom-color"
						contentClassName="components-color-palette__picker"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Tooltip
								text={ customColorPickerLabel }>
								<Button
									aria-expanded={ isOpen }
									onClick={ onToggle }
									aria-label={ customColorPickerLabel }
									isLink
								>
									<span class="components-color-palette__custom-color-gradient"></span>
								</Button>
							</Tooltip>
						) }
						renderContent={ () => (
							<ColorPicker
								color={ value }
								onChangeComplete={ ( color ) => onChange( color.hex ) }
								disableAlpha
							/>
						) }
					/>
				}
			</div>
		</div>
	);
}