/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RangeControl, TabPanel } = wp.components;

/**
 * Gutter Controls Component
 */
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
			label = __( 'Gutter' ),
			max = 50,
			min = 0,
			onChange = this.setGutterTo,
			onChangeMobile = this.setGutterMobileTo,
			setAttributes,
			step = 5,
			value = this.props.attributes.gutter,
			valueMobile = this.props.attributes.gutterMobile,
		} = this.props;

		return (
			<Fragment>
				<TabPanel
					className="components-base-control components-blockgallery-inspector__tabs"
					activeClass="is-active"
					initialTabName="desk"
					tabs={ [
						{
							name: 'desk',
							title: icons.desktopChrome,
							className: 'components-blockgallery-inspector__tabs-item components-blockgallery-inspector__tabs-item--desktop',
						},
						{
							name: 'mobile',
							title: icons.mobile,
							className: 'components-blockgallery-inspector__tabs-item components-blockgallery-inspector__tabs-item--mobile',
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
