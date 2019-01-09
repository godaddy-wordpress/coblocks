/**
 * Internal dependencies
 */
import './styles/editor.scss';
import icons from './../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RangeControl, TabPanel } = wp.components;

/**
 * Responsive Controls Component
 */
class ResponsiveTabsControl extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			label,
			max = 50,
			min = 0,
			onChange,
			onChangeMobile,
			setAttributes,
			step = 5,
			value,
			valueMobile,
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
										// translators: Control name
										label={ sprintf( __( 'Mobile %s' ), label ) }
										value={ valueMobile }
										onChange={ ( valueMobile ) => onChangeMobile( valueMobile ) }
										min={ min }
										max={ max }
										step={ step }
									/>
								)
							} else {
								return (
									<RangeControl
										label={ label }
										value={ value }
										onChange={ ( value ) => onChange( value ) }
										min={ min }
										max={ max }
										step={ step }
									/>
								)
							}
						}
					}
				</TabPanel>
			</Fragment>
		);
	}
}

export default ResponsiveTabsControl;
