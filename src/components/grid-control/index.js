/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withInstanceId } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { ButtonGroup, Button, Tooltip, ToggleControl } from '@wordpress/components';

class CSSGridControl extends Component {
	render() {
		const {
			attributes,
			clientId,
			setAttributes,
			tooltip = true,
		} = this.props;

		const {
			layout,
			fullscreen,
		} = attributes;

		/**
		 * Set layout options and padding controls for Row Blocks
		 * This will make us of existing block instead of creating new one
		 */
		let layoutOptions = [
			{
				value: 'top-left',
				/* translators: block layout */
				label: __( 'Top Left', 'coblocks' ),
			},
			{
				value: 'top-center',
				/* translators: block layout */
				label: __( 'Top Center', 'coblocks' ),
			},
			{
				value: 'top-right',
				/* translators: block layout */
				label: __( 'Top Right', 'coblocks' ),
			},
			{
				value: 'center-left',
				/* translators: block layout */
				label: __( 'Center Left', 'coblocks' ),
			},
			{
				value: 'center-center',
				/* translators: block layout */
				label: __( 'Center Center', 'coblocks' ),
			},
			{
				value: 'center-right',
				/* translators: block layout */
				label: __( 'Center Right', 'coblocks' ),
			},
			{
				value: 'bottom-left',
				/* translators: block layout */
				label: __( 'Bottom Left', 'coblocks' ),
			},
			{
				value: 'bottom-center',
				/* translators: block layout */
				label: __( 'Bottom Center', 'coblocks' ),
			},
			{
				value: 'bottom-right',
				/* translators: block layout */
				label: __( 'Bottom Right', 'coblocks' ),
			},
		];

		if ( ! fullscreen ) {
			layoutOptions = [
				{
					value: 'center-left',
					/* translators: block layout */
					label: __( 'Center Left', 'coblocks' ),
				},
				{
					value: 'center-center',
					/* translators: block layout */
					label: __( 'Center Center', 'coblocks' ),
				},
				{
					value: 'center-right',
					/* translators: block layout */
					label: __( 'Center Right', 'coblocks' ),
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
					<ButtonGroup aria-label={ __( 'Select Layout', 'coblocks' ) }>
						{ map( layoutOptions, ( { label, value }, index ) => {
							if ( tooltip ) {
								return (
									<Tooltip text={ label } key={ `grid-tooltip-${ index }` }>
										<div className={ ( value === layout ) ? 'is-selected' : null }>
											<Button
												isSmall
												onClick={ () => {
													setAttributes( { layout: value } );
													if ( layoutAttributes[ value ].wrapper ) {
														dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );
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
										isSmall
										onClick={ () => {
											setAttributes( { layout: value } );
											if ( layoutAttributes[ value ].wrapper ) {
												dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );
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
					label={ __( 'Fullscreen', 'coblocks' ) }
					checked={ !! fullscreen }
					onChange={ () => {
						if ( fullscreen ) {
							if ( [ 'bottom-left', 'top-left' ].includes( layout ) ) {
								setAttributes( { layout: 'center-left' } );
							}

							if ( [ 'bottom-center', 'top-center' ].includes( layout ) ) {
								setAttributes( { layout: 'center-center' } );
							}

							if ( [ 'bottom-right', 'top-right' ].includes( layout ) ) {
								setAttributes( { layout: 'center-right' } );
							}
						}
						setAttributes( { fullscreen: ! fullscreen } );
					} }
					help={ !! fullscreen ? __( 'Fullscreen mode is enabled.', 'coblocks' ) : __( 'Toggle to enable fullscreen mode.', 'coblocks' ) }
				/>
			</Fragment>
		);
	}
}

export default withInstanceId( CSSGridControl );
