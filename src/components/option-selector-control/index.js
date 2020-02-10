/**
 * External dependencies.
 */
import { kebabCase } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	BaseControl,
	Button,
	ButtonGroup,
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
		} = this.props;

		let buttons = options || DEFAULT_OPTIONS;

		if ( showNoneOption ) {
			buttons = [ NONE_OPTION, ...buttons ];
		}

		return ( showAdvancedControls && ( advancedMinValue !== false && advancedMaxValue !== false ) ?

			<RangeControl
				label={ label }
				value={ currentOption }
				onChange={ ( value ) => onChange( value ) }
				min={ advancedMinValue }
				max={ advancedMaxValue }
			/> :

			<BaseControl id={ `coblocks-option-selector-${ kebabCase( label ) }` } label={ label }>
				<PanelRow>
					<ButtonGroup aria-label={ label }>

						{ buttons.map( ( option ) => (
							<Tooltip
								key={ `option-${ option.value }` }
								text={ option.tooltip }>

								<Button
									isLarge
									isSecondary={ currentOption !== option.value }
									isPrimary={ currentOption === option.value }
									aria-pressed={ currentOption === option.value }
									onClick={ () => onChange( option.value ) }
									aria-label={ option.tooltip }>

									{ showIcons ? option.icon : option.label }

								</Button>

							</Tooltip>
						) ) }

					</ButtonGroup>
				</PanelRow>
			</BaseControl>
		);
	}
}
