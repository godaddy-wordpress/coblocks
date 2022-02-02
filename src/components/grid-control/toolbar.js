/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CSSGridControl from './';

/**
 * WordPress dependencies
 */
import { DOWN } from '@wordpress/keycodes';
import { Dropdown, NavigableMenu, ToolbarButton } from '@wordpress/components';

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
			renderContent={ () => {
				return (
					<NavigableMenu
						aria-label={ menuLabel }
						className="components-coblocks-grid-dropdown"
						role="menu"
					>
						<CSSGridControl { ...props }
							tooltip={ false }
						/>
					</NavigableMenu>
				);
			} }
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
						aria-expanded={ isOpen }
						aria-haspopup="true"
						icon={ icon }
						label={ label }
						onClick={ onToggle }
						onKeyDown={ openOnArrowDown }
						showTooltip
					/>
				);
			} }
		/>
	);
}

export default CSSGridToolbar;

CSSGridToolbar.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.string.isRequired,
	label: PropTypes.string,
	menuLabel: PropTypes.string,
	props: PropTypes.object,
};

CSSGridToolbar.defaultProps = {
	icon: 'menu',
};
