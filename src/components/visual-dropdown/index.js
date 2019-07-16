/**
 * External dependencies
 */
import classnames from 'classnames';
import flatMap from 'lodash/flatMap';

/**
 * Internal dependencies
 */
import './styles/editor.scss';

/**
 * WordPress dependencies
 */
const { DOWN } = wp.keycodes;
const { Button, IconButton, Dropdown, NavigableMenu } = wp.components;

function VisualDropdown( {
	icon = 'menu',
	label,
	menuLabel,
	controls,
	className,
} ) {
	if ( ! controls || ! controls.length ) {
		return null;
	}

	// Normalize controls to nested array of objects (sets of controls)
	let controlSets = controls;
	if ( ! Array.isArray( controlSets[ 0 ] ) ) {
		controlSets = [ controlSets ];
	}

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
						className="components-coblocks-visual-dropdown"
						role="menu"
						aria-label={ menuLabel }
					>
						<div className="components-button-group">
							{ flatMap( controlSets, ( controlSet, indexOfSet ) => (
								controlSet.map( ( control, indexOfControl ) => (
									<div key={ `visual-dropdown-${ indexOfControl }` } className={ ( control.key === control.value ) ? 'components-coblocks-visual-dropdown__button-wrapper is-selected' : 'components-coblocks-visual-dropdown__button-wrapper' }>
										<Button
											key={ [ indexOfSet, indexOfControl ].join() }
											onClick={ ( event ) => {
												event.stopPropagation();
												onClose();
												if ( control.onClick ) {
													control.onClick();
												}
											} }
											className={ classnames(
												'is-default',
												'components-coblocks-visual-dropdown__button', {
													'components-coblocks-visual-dropdown__button--selected': control.isActive,
													[ `components-button--${ control.key }` ]: control.key,
												},
											) }
											role="menuitem"
											disabled={ control.isDisabled }
										>
											{ control.icon &&
control.icon
											}

										</Button>
										{ control.label &&
										<div className="editor-block-styles__item-label">
											{ control.label }
										</div>
										}
									</div>
								) )
							) ) }
						</div>
					</NavigableMenu>
				);
			} }
		/>
	);
}

export default VisualDropdown;
