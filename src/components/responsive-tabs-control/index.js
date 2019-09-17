/**
 * Internal dependencies
 */
import './styles/editor.scss';
import icons from './icons';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { RangeControl, TabPanel } from '@wordpress/components';

class ResponsiveTabsControl extends Component {
	constructor() {
		super( ...arguments );
		this.setGutterTo = this.setGutterTo.bind( this );
		this.setGutterMobileTo = this.setGutterMobileTo.bind( this );
	}

	setGutterTo( value ) {
		this.props.setAttributes( { gutter: value } );
	}

	setGutterMobileTo( value ) {
		this.props.setAttributes( { gutterMobile: value } );
	}

	render() {
		const {
			label = __( 'Gutter' ),
			max = 50,
			min = 0,
			onChange = this.setGutterTo,
			onChangeMobile = this.setGutterMobileTo,
			step = 5,
			value = this.props.attributes.gutter,
			valueMobile = this.props.attributes.gutterMobile,
		} = this.props;

		return (
			<Fragment>
				<TabPanel
					className="components-base-control components-coblocks-responsive__tabs"
					activeClass="is-active"
					initialTabName="desk"
					tabs={ [
						{
							name: 'desk',
							title: icons.desktopChrome,
							className: 'components-coblocks-responsive__tabs-item components-coblocks-responsive__tabs-item--desktop',
						},
						{
							name: 'mobile',
							title: icons.mobile,
							className: 'components-coblocks-responsive__tabs-item components-coblocks-responsive__tabs-item--mobile',
						},
					] }>
					{
						( tab ) => {
							if ( 'mobile' === tab.name ) {
								return (
									<RangeControl
										/* translators: %s:  values associated with CSS syntax, 'Width', 'Gutter', 'Height in pixels', 'Width' */
										label={ sprintf( __( 'Mobile %s' ), label ) }
										value={ valueMobile }
										onChange={ ( valueMobile ) => onChangeMobile( valueMobile ) }
										min={ min }
										max={ max }
										step={ step }
									/>
								);
							}
							return (
								<RangeControl
									label={ label }
									value={ value }
									onChange={ ( value ) => onChange( value ) }
									min={ min }
									max={ max }
									step={ step }
								/>
							);
						}
					}
				</TabPanel>
			</Fragment>
		);
	}
}

export default ResponsiveTabsControl;
