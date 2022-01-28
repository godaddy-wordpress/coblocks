/**
 * External dependencies
 */
import PropTypes from 'prop-types';

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
		if ( 0 === value ) {
			this.props.setAttributes( { radius: value } );
		}
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
					activeClass="is-primary"
					className="components-base-control components-coblocks-responsive__tabs"
					initialTabName="desk"
					tabs={ [
						{
							name: 'desk',
							title: icons.desktopChrome,
							className: 'components-coblocks-responsive__tabs-item components-coblocks-responsive__tabs-item--desktop components-button is-button is-default',
						},
						{
							name: 'mobile',
							title: icons.mobile,
							className: 'components-coblocks-responsive__tabs-item components-coblocks-responsive__tabs-item--mobile components-button is-button is-default',
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
										max={ max }
										min={ min }
										onChange={ ( valueMobile ) => onChangeMobile( valueMobile ) }
										step={ step }
										value={ attributes.valueMobile ?? attributes.gutterMobile }
									/>
								);
							}
							return (
								<RangeControl
									label={ label }
									max={ max }
									min={ min }
									onChange={ ( value ) => onChange( value ) }
									step={ step }
									value={ attributes.value ?? attributes.gutter }
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

ResponsiveTabsControl.propTypes = {
	attributes: PropTypes.object,
	label: PropTypes.string.isRequired,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	onChangeMobile: PropTypes.func,
	step: PropTypes.number.isRequired,
};

ResponsiveTabsControl.defaultProps = {
	label: __( 'Gutter', 'coblocks' ),
	max: 50,
	min: 0,
	step: 5,
};
