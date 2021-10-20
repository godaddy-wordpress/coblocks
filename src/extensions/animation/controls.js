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
import { Component, Fragment } from '@wordpress/element';
import { BlockControls, BlockPreview } from '@wordpress/block-editor';
import {
	DropdownMenu,
	MenuItem,
	MenuGroup,
	Popover,
	Toolbar,
	Tip,
} from '@wordpress/components';
import { check } from '@wordpress/icons';
import { compose, ifCondition } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';

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
					position="bottom right"
					focusOnMount={ false }
				>
					<div className="block-editor-block-switcher__preview coblocks__preview">
						<div className="block-editor-block-switcher__preview-title">
							{ __( 'Preview animation' ) }
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
			selected,
		} = this.props;

		const { hoveredAnimation } = this.state;

		const POPOVER_PROPS = {
			className: 'components-coblocks-animation-dropdown',
		};

		return (
			<BlockControls>
				<Toolbar label={ __( 'Animation controls', 'coblocks' ) }>
					<DropdownMenu
						icon={ AnimationIcon }
						label={ __( 'Add animation', 'coblocks' ) }
						popoverProps={ POPOVER_PROPS }
						className={ classnames( 'components-coblocks-animation-toggle', animation ? 'has-animation' : '' ) }
						noIcons
					>
						{ ( { onClose } ) => (
							<Fragment>
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
												icon={ animation === animationItem.className ? check : animationItem.icon }
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
											label={ __( 'Remove animation', 'coblocks' ) }
											onClick={ this.onAnimationClick( onClose ) }
											isSelected={ false } >
											{ __( 'Remove animation', 'coblocks' ) }
										</MenuItem>
									</MenuGroup>
								}
							</Fragment>
						) }
					</DropdownMenu>
				</Toolbar>
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
