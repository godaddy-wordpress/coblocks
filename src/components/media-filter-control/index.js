/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import icons from './icons';
import './styles/style.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Toolbar, MenuGroup } = wp.components;

const DEFAULT_CONTROLS = [
	{
		icon: icons.filter,
		title: __( 'Original' ),
		filter: 'none',
	},
	{
		icon: icons.grayscale,
		title: __( 'Grayscale Filter' ),
		filter: 'grayscale',
	},
	{
		icon: icons.sepia,
		title: __( 'Sepia Filter' ),
		filter: 'sepia',
	},
	{
		icon: icons.saturation,
		title: __( 'Saturation Filter' ),
		filter: 'saturation',
	},
	{
		icon: icons.dark,
		title: __( 'Dim Filter' ),
		filter: 'dim',
	},
	{
		icon: icons.vintage,
		title: __( 'Vintage Filter' ),
		filter: 'vintage',
	},
];

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			filter,
		} = attributes;

		const active = find( DEFAULT_CONTROLS, ( control ) => control.filter === filter );

		return (
			<Toolbar
				isCollapsed={ true }
				icon={ active ? active.icon : icons.filter }
				label={ __( 'Apply media filter' ) }
				controls={ DEFAULT_CONTROLS.map( ( control ) => {
					const isActive = ( filter === control.filter );

					return {
						...control,
						isActive,
						onClick: () => setAttributes( { filter: control.filter } ),
					};
				} ) }
			/>
		);
	}
}

export default Controls;
