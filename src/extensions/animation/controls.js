/**
 * Internal
 */
import { animationTypes } from './animation-types';

/**
 * External dependencies
 */
import _ from 'lodash';
import { AnimationIcon } from '@godaddy-wordpress/coblocks-icons';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';
import { useEntityProp } from '@wordpress/core-data';
import { BlockControls, BlockPreview } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { compose, ifCondition } from '@wordpress/compose';
import {
	DropdownMenu,
	MenuGroup,
	MenuItem,
	Popover,
	Tip,
	ToolbarGroup,
} from '@wordpress/components';

function PreviewAnimationPopover( { hoveredAnimation, selected } ) {
	if ( ! hoveredAnimation ) {
		return null;
	}

	const block = _.cloneDeep( selected );

	block.attributes.animation = hoveredAnimation;

	return (
		<div className="block-editor-block-switcher__popover__preview__parent">
			<div className="block-editor-block-switcher__popover__preview__container">
				<Popover
					className="block-editor-block-switcher__preview__popover"
					focusOnMount={ false }
					position="bottom right"
				>
					<div className="block-editor-block-switcher__preview coblocks__preview">
						<div className="block-editor-block-switcher__preview-title">
							{ __( 'Preview animation', 'coblocks' ) }
						</div>
						<BlockPreview
							autoHeight
							blocks={ { ...block } }
						/>
						<Tip>
							{ __( 'Animations occur as a visitor scrolls this block into view.', 'coblocks' ) }
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
			hoveredAnimation: null,
		};
	}

	onChangeHoveredAnimation = ( animation ) => {
		this.setState( {
			hoveredAnimation: animation,
		} );
	};

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
			selected,
		} = this.props;

		const { hoveredAnimation } = this.state;

		const POPOVER_PROPS = {
			className: 'components-coblocks-animation-dropdown',
		};

		return (
			<BlockControls>
				<ToolbarGroup>
					<DropdownMenu
						className={ classnames( 'components-coblocks-animation-toggle', animation ? 'has-animation' : '' ) }
						icon={ AnimationIcon }
						label={ __( 'Add animation', 'coblocks' ) }
						noIcons
						popoverProps={ POPOVER_PROPS }
					>
						{ ( { onClose } ) => (
							<Fragment>
								<MenuGroup>
									<PreviewAnimationPopover hoveredAnimation={ hoveredAnimation } selected={ selected } />
									{
										animationTypes.map( ( animationItem ) => (
											<MenuItem
												icon={ animation === animationItem.className ? check : animationItem.icon }
												isSelected={ animation === animationItem.className }
												key={ `coblocks-animation-${ animationItem.className }` }
												label={ animationItem.label }
												onClick={ this.onAnimationClick( onClose, animationItem.className ) }
												onMouseEnter={ () => this.onChangeHoveredAnimation( animationItem.className ) }
												onMouseLeave={ () => this.onChangeHoveredAnimation( null ) }
												role="menuitemradio">
												{ animationItem.label }
											</MenuItem>
										) )
									}
								</MenuGroup>
								{ animation &&
									<MenuGroup>
										<MenuItem
											isSelected={ false }
											label={ __( 'Remove animation', 'coblocks' ) }
											onClick={ this.onAnimationClick( onClose ) }
											role="menuitemradio" >
											{ __( 'Remove animation', 'coblocks' ) }
										</MenuItem>
									</MenuGroup>
								}
							</Fragment>
						) }
					</DropdownMenu>
				</ToolbarGroup>
			</BlockControls>
		);
	}
}

export default compose( [
	ifCondition( () => {
		const [ animationEnabled ] = useEntityProp( 'root', 'site', 'coblocks_animation_controls_enabled' );
		return animationEnabled;
	} ),
] )( Controls );
