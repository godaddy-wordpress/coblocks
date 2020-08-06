/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CSSGridControl from './';

/**
 * WordPress dependencies
 */
import { DOWN } from '@wordpress/keycodes';
import { ToolbarButton, ToolbarGroup, Dropdown, NavigableMenu } from '@wordpress/components';

function CSSGridToolbar( {
	icon = 'menu',
	label,
	menuLabel,
	className,
	props,
} ) {
	return (
		<Dropdown
			className={ classnames( 'components-dropdown-menu', className ) }
			contentClassName="components-dropdown-menu__popover"
			renderToggle={ ( { isOpen, onToggle } ) => {
				const openOnArrowDown = ( event ) => {
					if ( ! isOpen && event.keyCode === DOWN ) {
						event.preventDefault();
						event.stopPropagation();
						onToggle();
					}
				};
				return (
					<ToolbarButton
						onClick={ onToggle }
						aria-haspopup="true"
						aria-expanded={ isOpen }
						onKeyDown={ openOnArrowDown }
						label={ label }
						icon={ icon }
						showTooltip
					/>
				);
			} }
			renderContent={ () => {
				return (
					<NavigableMenu
						className="components-coblocks-grid-dropdown"
						role="menu"
						aria-label={ menuLabel }
					>
						<CSSGridControl { ...props }
							tooltip={ false }
						/>
					</NavigableMenu>
				);
			} }
		/>
	);
}

export default CSSGridToolbar;
