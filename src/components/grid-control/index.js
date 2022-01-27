/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, withInstanceId } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { Button, ButtonGroup, ToggleControl, Tooltip } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { buttonsBlockDeprecated } from '../../js/deprecations/deprecate-coblocks-buttons';

class CSSGridControl extends Component {
	render() {
		const {
			attributes,
			clientId,
			setAttributes,
			tooltip = true,
			updateBlockAttributes,
			innerBlocks,
		} = this.props;

		const {
			layout,
			fullscreen,
		} = attributes;

		const updateButtonsAttributes = ( newAttribute ) => {
			const isDeprecated = buttonsBlockDeprecated();
			const blockName = isDeprecated ? 'core/buttons' : 'coblocks/buttons';
			const blockAttribute = isDeprecated ? 'align' : 'contentAlign';

			innerBlocks.forEach( ( item ) => {
				if ( item.name === blockName ) {
					updateBlockAttributes(
						item.clientId,
						{ [ blockAttribute ]: newAttribute }
					);
				}
			} );
		};

		/**
		 * Set layout options and padding controls for Row Blocks
		 * This will make us of existing block instead of creating new one
		 */
		let layoutOptions = [
			{
				value: 'top-left',
				/* translators: block layout */
				label: __( 'Top left', 'coblocks' ),
			},
			{
				value: 'top-center',
				/* translators: block layout */
				label: __( 'Top center', 'coblocks' ),
			},
			{
				value: 'top-right',
				/* translators: block layout */
				label: __( 'Top right', 'coblocks' ),
			},
			{
				value: 'center-left',
				/* translators: block layout */
				label: __( 'Center left', 'coblocks' ),
			},
			{
				value: 'center-center',
				/* translators: block layout */
				label: __( 'Center center', 'coblocks' ),
			},
			{
				value: 'center-right',
				/* translators: block layout */
				label: __( 'Center right', 'coblocks' ),
			},
			{
				value: 'bottom-left',
				/* translators: block layout */
				label: __( 'Bottom left', 'coblocks' ),
			},
			{
				value: 'bottom-center',
				/* translators: block layout */
				label: __( 'Bottom center', 'coblocks' ),
			},
			{
				value: 'bottom-right',
				/* translators: block layout */
				label: __( 'Bottom right', 'coblocks' ),
			},
		];

		if ( ! fullscreen ) {
			layoutOptions = [
				{
					value: 'center-left',
					/* translators: block layout */
					label: __( 'Center left', 'coblocks' ),
				},
				{
					value: 'center-center',
					/* translators: block layout */
					label: __( 'Center center', 'coblocks' ),
				},
				{
					value: 'center-right',
					/* translators: block layout */
					label: __( 'Center right', 'coblocks' ),
				},
			];
		}

		const layoutAttributes = {};

		//top
		layoutAttributes[ 'top-left' ] = {
			wrapper: {
				contentAlign: 'left',
			},
		};

		layoutAttributes[ 'top-center' ] = {
			wrapper: {
				contentAlign: 'center',
			},
		};

		layoutAttributes[ 'top-right' ] = {
			wrapper: {
				contentAlign: 'right',
			},
		};

		//center
		layoutAttributes[ 'center-left' ] = {
			wrapper: {
				contentAlign: 'left',
			},
		};

		layoutAttributes[ 'center-center' ] = {
			wrapper: {
				contentAlign: 'center',
			},
		};

		layoutAttributes[ 'center-right' ] = {
			wrapper: {
				contentAlign: 'right',
			},
		};

		//bottom
		layoutAttributes[ 'bottom-left' ] = {
			wrapper: {
				contentAlign: 'left',
			},
		};

		layoutAttributes[ 'bottom-center' ] = {
			wrapper: {
				contentAlign: 'center',
			},
		};

		layoutAttributes[ 'bottom-right' ] = {
			wrapper: {
				contentAlign: 'right',
			},
		};

		const classes = classnames(
			'components-base-control',
			'components-coblocks-css-grid-selector', {
				'is-fullscreen': fullscreen,
			}
		);

		return (
			<Fragment>
				<div className={ classes }>
					<p className="components-base-control__label">{ __( 'Layout', 'coblocks' ) }</p>
					<ButtonGroup aria-label={ __( 'Select layout', 'coblocks' ) }>
						{ map( layoutOptions, ( { label, value }, index ) => {
							if ( tooltip ) {
								return (
									<Tooltip key={ `grid-tooltip-${ index }` } text={ label }>
										<div className={ ( value === layout ) ? 'is-selected' : null }>
											<Button
												isPrimary={ value === layout }
												isSecondary={ value !== layout }
												isSmall
												onClick={ () => {
													setAttributes( { layout: value } );
													updateButtonsAttributes( value.split( '-' )[ 1 ] );
													if ( layoutAttributes[ value ].wrapper ) {
														updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );
													}
												} }
											>
											</Button>
										</div>
									</Tooltip>
								);
							}
							return (
								<div className={ ( value === layout ) ? 'is-selected' : null }>
									<Button
										isPrimary={ value === layout }
										isSecondary={ value !== layout }
										isSmall
										onClick={ () => {
											setAttributes( { layout: value } );
											if ( layoutAttributes[ value ].wrapper ) {
												updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );
												updateButtonsAttributes( value.split( '-' )[ 1 ] );
											}
										} }
									>
									</Button>
								</div>
							);
						} ) }
					</ButtonGroup>
				</div>
				<ToggleControl
					checked={ !! fullscreen }
					help={ !! fullscreen ? __( 'Fullscreen mode is enabled.', 'coblocks' ) : __( 'Toggle to enable fullscreen mode.', 'coblocks' ) }
					label={ __( 'Fullscreen', 'coblocks' ) }
					onChange={ () => {
						if ( fullscreen ) {
							if ( [ 'bottom-left', 'top-left' ].includes( layout ) ) {
								setAttributes( { layout: 'center-left' } );
								updateButtonsAttributes( 'left' );
							}

							if ( [ 'bottom-center', 'top-center' ].includes( layout ) ) {
								setAttributes( { layout: 'center-center' } );
								updateButtonsAttributes( 'center' );
							}

							if ( [ 'bottom-right', 'top-right' ].includes( layout ) ) {
								setAttributes( { layout: 'center-right' } );
								updateButtonsAttributes( 'right' );
							}
						}
						setAttributes( { fullscreen: ! fullscreen } );
					} }
				/>
			</Fragment>
		);
	}
}

export default withInstanceId( compose( [
	withDispatch( ( dispatch ) => {
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );

		return {
			updateBlockAttributes,
		};
	} ),

	withSelect( ( select, props ) => {
		const { getBlocks } = select( 'core/block-editor' );
		const innerBlocks = getBlocks( props.clientId );

		return {
			innerBlocks,
		};
	} ),
] )( CSSGridControl ) );

CSSGridControl.propTypes = {
	clientId: PropTypes.number,
	innerBlocks: PropTypes.array,
	setAttributes: PropTypes.func,
	tooltip: PropTypes.bool.isRequired,
	updateBlockAttributes: PropTypes.func,
};

CSSGridControl.defaultProps = {
	tooltip: false,
};
