/**
 * Internal
 */
import { animationTypes } from './animation-types';

/**
 * External dependencies
 */
import _ from 'lodash';
import classnames from 'classnames';
import { AnimationIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BlockControls, BlockPreview } from '@wordpress/block-editor';
import {
	ToolbarButton,
	Dropdown,
	ToolbarGroup,
	NavigableMenu,
	MenuItem,
	MenuGroup,
	Popover,
	Tip
} from '@wordpress/components';
import { DOWN } from '@wordpress/keycodes';
import { Icon, check } from '@wordpress/icons';

function PreviewAnimationPopover( { hoveredAnimation, selected } ) {
	if ( ! hoveredAnimation ) return null;

	const block = _.cloneDeep(selected);
	
	block.attributes.animation = hoveredAnimation;
	
	return (
		<div className="block-editor-block-switcher__popover__preview__parent">
			<div className="block-editor-block-switcher__popover__preview__container">
				<Popover
					className="block-editor-block-switcher__preview__popover"
					position="bottom right"
					focusOnMount={ false }
				>
					<div className="block-editor-block-switcher__preview">
						<div className="block-editor-block-switcher__preview-title">
							{ __( 'Preview' ) }
						</div>
						<BlockPreview
							autoHeight
							blocks={ { ...block } }
						/>
						<Tip>
							{ __( 'The animation is applied when this element comes into view as you scroll the page.', 'coblocks' ) }
						</Tip>
					</div>
				</Popover>
			</div>
		</div>
	);
}

class Controls extends Component {
	constructor() {
		super( ...arguments );
		
		this.state = {
			hoveredAnimation: null
		};
	}

	onChangeHoveredAnimation = (animation) => {
		this.setState({
			hoveredAnimation: animation
		});
	}

	onAnimationClick = ( onClose, animationClass = null ) => {
		const { setAttributes } = this.props;

		return () => {
			this.setState( { hoveredAnimation: null } );
			setAttributes( { animation: animationClass } );
			onClose();
		};
	};

	render() {
		const {
			attributes: { animation },
			selected
		} = this.props;

		const { hoveredAnimation } = this.state;

		return (
			<BlockControls>
				<Dropdown
					position="bottom right"
					className={ classnames( 'components-dropdown-menu', 'components-coblocks-animation-dropdown', animation ? 'is-with-animation' : '' ) }
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
						<NavigableMenu className="components-dropdown-menu__menu">
							<MenuGroup>
								<PreviewAnimationPopover hoveredAnimation={ hoveredAnimation } selected={ selected } />
								{
									animationTypes.map( ( animationItem ) => (
										<MenuItem
											role="menuitemradio"
											label={ animationItem.label }
											onClick={ this.onAnimationClick( onClose, animationItem.className ) }
											onMouseEnter={ () => this.onChangeHoveredAnimation( animationItem.className ) }
											onMouseLeave={ () => this.onChangeHoveredAnimation( null ) }
											isSelected={ animation === animationItem.className }
											icon={ animation === animationItem.className ? check : null }
											key={ `coblocks-animation-${ animationItem.className }` }>
											{ animationItem.label }
										</MenuItem>
									) )
								}
							</MenuGroup>
							{ animation && 
								<MenuGroup>
									<MenuItem
										role="menuitemradio"
										label={ __( 'No animation', 'coblocks' ) }
										onClick={ this.onAnimationClick( onClose ) }
										isSelected={ false } >
										{ __( 'Remove animation', 'coblocks' ) }
									</MenuItem>
								</MenuGroup>
							}
						</NavigableMenu>
					) }
				/>
			</BlockControls>
		);
	}
}

export default Controls;
