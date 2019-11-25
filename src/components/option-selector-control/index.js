/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	BaseControl,
	PanelRow,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Constants
 */
const DEFAULT_OPTIONS = [
	{
		value: 1,
		title: __( 'Small', 'coblocks' ),
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
	},
	{
		value: 2,
		title: __( 'Medium', 'coblocks' ),
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
	},
	{
		value: 3,
		title: __( 'Large', 'coblocks' ),
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
	},
	{
		value: 4,
		title: __( 'Extra Large', 'coblocks' ),
		/* translators: abbreviation for extra large size */
		label: __( 'XL', 'coblocks' ),
	},
];

const NONE_OPTION = {
	value: 0,
	title: __( 'None', 'coblocks' ),
	label: __( 'None', 'coblocks' ),
};

export default class OptionSelectorControl extends Component {
	render() {
		const {
			label, options, currentOption,
			showNoneOption,
			onChange,
		} = this.props;

		let buttons = options || DEFAULT_OPTIONS;

		if ( showNoneOption ) {
			buttons = [ NONE_OPTION, ...buttons ];
		}

		return (
			<BaseControl label={ label }>
				<PanelRow>
					<ButtonGroup aria-label={ label }>

						{ buttons.map( option => (
							<Button
								key={ `option-${ option.value }` }
								isDefault
								isPrimary={ currentOption === option.value }
								aria-pressed={ currentOption === option.value }
								onClick={ () => onChange( option.value ) }
								title={ option.title }
							>
								{ option.label }
							</Button>
						) ) }

					</ButtonGroup>
				</PanelRow>
			</BaseControl>
		);
	}
}
