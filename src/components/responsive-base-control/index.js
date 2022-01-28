/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { DesktopIcon, MobileIcon, TabletIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withInstanceId } from '@wordpress/compose';
import { BaseControl, TabPanel } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

class ResponsiveBaseControl extends Component {
	constructor() {
		super( ...arguments );

		this.saveMeta = this.saveMeta.bind( this );
	}

	saveMeta() {
		const { attributes, clientId, name, type } = this.props;

		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		const block = wp.data.select( 'core/block-editor' ).getBlock( clientId );
		let dimensions = {};

		if ( typeof attributes.coblocks !== 'undefined' && typeof attributes.coblocks.id !== 'undefined' ) {
			const id = name.split( '/' ).join( '-' ) + '-' + attributes.coblocks.id;
			const height = {
				height: block.attributes[ type ],
				heightMobile: block.attributes[ type + 'Mobile' ],
				heightTablet: block.attributes[ type + 'Tablet' ],
			};

			if ( typeof meta._coblocks_responsive_height === 'undefined' || ( typeof meta._coblocks_responsive_height !== 'undefined' && meta._coblocks_responsive_height === '' ) ) {
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_responsive_height );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ type ] = {};
			} else if ( typeof dimensions[ id ][ type ] === 'undefined' ) {
				dimensions[ id ][ type ] = {};
			}

			dimensions[ id ][ type ] = height;

			// Save values to metadata.
			wp.data.dispatch( 'core/editor' ).editPost( {
				meta: {
					_coblocks_responsive_height: JSON.stringify( dimensions ),
				},
			} );
		}
	}

	render() {
		const {
			label = __( 'Height', 'coblocks' ),
			height,
			heightTablet,
			heightMobile,
			onChange,
			onChangeTablet,
			onChangeMobile,
			min = 10,
			max = 1000,
			step = 1,
			type,
		} = this.props;

		const onSelect = ( tabName ) => {
			let selected = 'desktop';

			switch ( tabName ) {
				case 'desktop':
					selected = 'tablet';
					break;
				case 'tablet':
					selected = 'mobile';
					break;
				case 'mobile':
					selected = 'desktop';
					break;
				default:
					break;
			}

			//Reset z-index
			const buttons = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item--${ type }` );

			for ( let i = 0; i < buttons.length; i++ ) {
				buttons[ i ].style.display = 'none';
			}
			if ( tabName === 'default' ) {
				const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ type }--tablet` );
				button[ 0 ].click();
			} else {
				const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ type }--${ selected }` );
				button[ 0 ].style.display = 'block';
			}
		};

		const classes = classnames(
			'components-base-control',
			'components-coblocks-dimensions-control',
			'components-coblocks-responsive-base-control', {
			}
		);

		return (
			<Fragment>
				<div className={ classes }>
					<Fragment>
						<span className="components-base-control__label">{ label }</span>
						<TabPanel
							activeClass="is-active"
							className="components-coblocks-dimensions-control__mobile-controls"
							initialTabName="default"
							onSelect={ onSelect }
							tabs={ [
								{
									className: `is-secondary components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default components-coblocks-dimensions-control__mobile-controls-item--default components-coblocks-dimensions-control__mobile-controls-item-${ type }--default`,
									name: 'default',
									title: DesktopIcon,
								},
								{
									className: `is-secondary components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default components-coblocks-dimensions-control__mobile-controls-item--desktop components-coblocks-dimensions-control__mobile-controls-item-${ type }--desktop`,
									name: 'desktop',
									title: DesktopIcon,
								},
								{
									className: `is-secondary components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default components-coblocks-dimensions-control__mobile-controls-item--tablet components-coblocks-dimensions-control__mobile-controls-item-${ type }--tablet`,
									name: 'tablet',
									title: TabletIcon,
								},
								{
									className: `is-secondary components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default components-coblocks-dimensions-control__mobile-controls-item--mobile components-coblocks-dimensions-control__mobile-controls-item-${ type }--mobile`,
									name: 'mobile',
									title: MobileIcon,
								},
							] }>
							{
								( tab ) => {
									if ( 'mobile' === tab.name ) {
										return (
											<Fragment>
												<div className="components-coblocks-dimensions-control__inputs component-coblocks-is-mobile">
													<BaseControl>
														<input
															max={ max }
															min={ min }
															onChange={ ( newValue ) => {
																onChangeMobile( newValue );
																this.saveMeta();
															} }
															step={ step }
															type="number"
															value={ heightMobile ? heightMobile : '' }
														/>
													</BaseControl>
												</div>
											</Fragment>
										);
									} else if ( 'tablet' === tab.name ) {
										return (
											<Fragment>
												<div className="components-coblocks-dimensions-control__inputs component-coblocks-is-tablet">
													<BaseControl>
														<input
															max={ max }
															min={ min }
															onChange={ ( newValue ) => {
																onChangeTablet( newValue );
																this.saveMeta();
															} }
															step={ step }
															type="number"
															value={ heightTablet ? heightTablet : '' }
														/>
													</BaseControl>
												</div>
											</Fragment>
										);
									}
									return (
										<Fragment>
											<div className="components-coblocks-dimensions-control__inputs component-coblocks-is-desktop">
												<BaseControl>
													<input
														max={ max }
														min={ min }
														onChange={ ( newValue ) => {
															onChange( newValue );
															this.saveMeta();
														} }
														step={ step }
														type="number"
														value={ height ? height : '' }
													/>
												</BaseControl>
											</div>
										</Fragment>
									);
								}
							}
						</TabPanel>
					</Fragment>
				</div>
			</Fragment>
		);
	}
}

export default withInstanceId( ResponsiveBaseControl );

ResponsiveBaseControl.propTypes = {
	height: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	heightMobile: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	heightTablet: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	label: PropTypes.string.isRequired,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	onChangeMobile: PropTypes.func,
	onChangeTablet: PropTypes.func,
	step: PropTypes.number.isRequired,
};

ResponsiveBaseControl.defaultProps = {
	label: __( 'Height', 'coblocks' ),
	max: 1000,
	min: 10,
	step: 1,
};
