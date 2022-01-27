/**
 * External dependencies.
 */
import { kebabCase } from 'lodash';
import { SettingsIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	BaseControl,
	Button,
	ButtonGroup,
	Icon,
	PanelRow,
	RangeControl,
	Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Constants
 */
const DEFAULT_OPTIONS = [
	{
		value: 1,
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
	},
	{
		value: 2,
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
	},
	{
		value: 3,
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
	},
	{
		value: 4,
		/* translators: abbreviation for extra large size */
		label: __( 'XL', 'coblocks' ),
		tooltip: __( 'Extra Large', 'coblocks' ),
	},
];

const NONE_OPTION = {
	value: 0,
	label: __( 'None', 'coblocks' ),
	tooltip: __( 'None', 'coblocks' ),
};

const CUSTOM_OPTION = {
	value: 'custom',
	label: <Icon icon={ icon } />,
	tooltip: __( 'Custom', 'coblocks' ),
};

export default class OptionSelectorControl extends Component {
	render() {
		const {
			advancedMaxValue,
			advancedMinValue,
			currentOption,
			label,
			onChange,
			options,
			showAdvancedControls,
			showIcons,
			showNoneOption,
			showCustomOption,
		} = this.props;

		let buttons = options || DEFAULT_OPTIONS;

		if ( showNoneOption ) {
			buttons = [ NONE_OPTION, ...buttons ];
		}

		if ( showCustomOption ) {
			buttons = [ ...buttons, CUSTOM_OPTION ];
		}

		return ( showAdvancedControls && ( advancedMinValue !== false && advancedMaxValue !== false )

			? (
				<RangeControl
					label={ label }
					max={ advancedMaxValue }
					min={ advancedMinValue }
					onChange={ ( value ) => onChange( value ) }
					value={ currentOption }
				/>
			) : (
				<BaseControl
					className={ classnames(
						'coblocks-option-selector-control',
						{
							'is-custom': currentOption === 'custom',
						}
					) }
					id={ `coblocks-option-selector-${ kebabCase( label ) }` }
					label={ label }>
					<PanelRow>
						<ButtonGroup aria-label={ label }>

							{ buttons.map( ( option ) => (
								<Tooltip
									key={ `option-${ option.value }` }
									text={ option.tooltip }>

									<Button
										aria-label={ option.tooltip }
										aria-pressed={ currentOption === option.value }
										isPrimary={ currentOption === option.value }
										isSecondary={ currentOption !== option.value }
										onClick={ () => onChange( option.value ) }>

										{ showIcons ? option.icon : option.label }

									</Button>

								</Tooltip>
							) ) }

						</ButtonGroup>
					</PanelRow>
				</BaseControl>
			)
		);
	}
}

OptionSelectorControl.propTypes = {
	advancedMaxValue: PropTypes.number,
	advancedMinValue: PropTypes.number,
	currentOption: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	label: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
	showAdvancedControls: PropTypes.bool,
	showCustomOption: PropTypes.bool,
	showIcons: PropTypes.bool,
	showNoneOption: PropTypes.bool,
};
