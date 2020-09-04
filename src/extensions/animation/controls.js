/**
 * Internal
 */
import { animationTypes } from './animation-types';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { AnimationIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import {
	ToolbarButton,
	Dropdown,
	ToolbarGroup,
	NavigableMenu,
	MenuItem,
} from '@wordpress/components';
import { DOWN } from '@wordpress/keycodes';
import { Icon } from '@wordpress/icons';

class Controls extends Component {
	onAnimationClick = ( onClose, animationClass = null ) => {
		const { setAttributes } = this.props;

		return () => {
			if ( !! animationClass ) {
				setAttributes( { animation: animationClass } );
			}

			onClose();
		};
	};

	render() {
		const {
			attributes: { animation },
		} = this.props;

		return (
			<BlockControls>
				<Dropdown
					position="bottom right"
					className={ classnames( 'components-dropdown-menu', 'components-coblocks-animation-dropdown' ) }
					contentClassName="components-dropdown-menu__popover components-coblocks-animation-dropdown"
					renderToggle={ ( { onToggle, isOpen } ) => {
						const openOnArrowDown = ( event ) => {
							if ( ! isOpen && event.keyCode === DOWN ) {
								event.preventDefault();
								event.stopPropagation();
								onToggle();
							}
						};

						return (
							<ToolbarGroup>
								<ToolbarButton
									onClick={ onToggle }
									aria-haspopup="true"
									aria-expanded={ isOpen }
									onKeyDown={ openOnArrowDown }
									label={ __( 'Add animation', 'coblocks' ) }
									icon={ <Icon icon={ AnimationIcon } size={ 48 } /> }
									showTooltip
								/>
							</ToolbarGroup>
						);
					} }
					renderContent={ ( { onClose } ) => (
						<NavigableMenu
							orientation="horizontal"
							className="coblocks-animation-menu__wrapper">
							<MenuItem
								role="menuitemradio"
								label={ __( 'No animation', 'coblocks' ) }
								onClick={ this.onAnimationClick( onClose ) }
								isSelected={ ! animation } >
								<div className="animation-block__inner">
									{ __( 'None', 'coblocks' ) }
								</div>
							</MenuItem>
							{
								animationTypes.map( ( animationItem ) => (
									<MenuItem
										role="menuitemradio"
										label={ animationItem.label }
										onClick={ this.onAnimationClick( onClose, animationItem.className ) }
										isSelected={ animation === animationItem.className }
										key={ `coblocks-animation-${ animationItem.className }` }>
										<div className={ classnames( 'animation-block__inner coblocks-animate animate-loop', animationItem.className ) } />
									</MenuItem>
								) )
							}
						</NavigableMenu>
					) }
				/>
			</BlockControls>
		);
	}
}

export default Controls;
