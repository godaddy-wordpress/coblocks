/**
 * Internal dependencies
 */
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
			attributes,
			label = __( 'Gutter', 'coblocks' ),
			max = 50,
			min = 0,
			onChange = this.setGutterTo,
			onChangeMobile = this.setGutterMobileTo,
			step = 5,
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
										label={ sprintf(
											/* translators: %s: values associated with CSS syntax, 'Width', 'Gutter', 'Height in pixels', 'Width' */
											__( 'Mobile %s', 'coblocks' ),
											label
										) }
										value={ attributes.valueMobile }
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
									value={ attributes.value }
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
