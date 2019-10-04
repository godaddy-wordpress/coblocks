/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
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
			{ value: 'top-left', label: _x( 'Top Left', 'block layout' ) },
			{ value: 'top-center', label: _x( 'Top Center', 'block layout' ) },
			{ value: 'top-right', label: _x( 'Top Right', 'block layout' ) },
			{ value: 'center-left', label: _x( 'Center Left', 'block layout' ) },
			{ value: 'center-center', label: _x( 'Center Center', 'block layout' ) },
			{ value: 'center-right', label: _x( 'Center Right', 'block layout' ) },
			{ value: 'bottom-left', label: _x( 'Bottom Left', 'block layout' ) },
			{ value: 'bottom-center', label: _x( 'Bottom Center', 'block layout' ) },
			{ value: 'bottom-right', label: _x( 'Bottom Right', 'block layout' ) },
		];

		if ( ! fullscreen ) {
			layoutOptions = [
				{ value: 'center-left', label: _x( 'Center Left', 'block layout' ) },
				{ value: 'center-center', label: _x( 'Center Center', 'block layout' ) },
				{ value: 'center-right', label: _x( 'Center Right', 'block layout' ) },
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
					<p className="components-base-control__label">{ __( 'Layout' ) }</p>
					<ButtonGroup aria-label={ __( 'Select Layout' ) }>
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
					label={ __( 'Fullscreen' ) }
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
					help={ !! fullscreen ? __( 'Fullscreen mode is enabled.' ) : __( 'Toggle to enable fullscreen mode.' ) }
				/>
			</Fragment>
		);
	}
}

export default withInstanceId( CSSGridControl );
