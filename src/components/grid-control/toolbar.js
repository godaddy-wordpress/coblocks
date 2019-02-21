/**
 * External dependencies
 */
import classnames from 'classnames';
import flatMap from 'lodash/flatMap';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import CSSGridControl from './';

/**
 * WordPress dependencies
 */
const { DOWN } = wp.keycodes;
const { Button, IconButton, Dropdown, NavigableMenu } = wp.components;

function CSSGridToolbar( {
	icon = 'menu',
	label,
	test,
	menuLabel,
	className,
	props,
} ) {

	return (
		<Dropdown
			className={ classnames( 'components-dropdown-menu', 'components-coblocks-visual-dropdown', className ) }
			contentClassName="components-dropdown-menu__popover components-coblocks-visual-dropdown__popover"
			renderToggle={ ( { isOpen, onToggle } ) => {
				const openOnArrowDown = ( event ) => {
					if ( ! isOpen && event.keyCode === DOWN ) {
						event.preventDefault();
						event.stopPropagation();
						onToggle();
					}
				};
				return (
					<IconButton
						className="components-dropdown-menu__toggle"
						icon={ icon }
						onClick={ onToggle }
						onKeyDown={ openOnArrowDown }
						aria-haspopup="true"
						aria-expanded={ isOpen }
						label={ label }
						tooltip={ label }
					>
						<span className="components-dropdown-menu__indicator" />
					</IconButton>
				);
			} }
			renderContent={ ( { onClose } ) => {
				return (
					<NavigableMenu
						className="components-coblocks-visual-dropdown components-coblocks-grid-dropdown"
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