/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {	SelectControl } = wp.components;

import { DEFAULT_ICON_SIZE } from '.';

export default class IconSizeSelect extends Component {
	constructor( ) {
		super( ...arguments );
		this.state = {
			utilitySizes: [
				{
					name: __( 'Small' ),
					size: 40,
					slug: 'small',
				},
				{
					name: __( 'Medium' ),
					size: this.props.padding ? DEFAULT_ICON_SIZE + 28 : DEFAULT_ICON_SIZE,
					slug: 'medium',
				},
				{
					name: __( 'Large' ),
					size: 120,
					slug: 'large',
				}, {
					name: __( 'Huge' ),
					size: 200,
					slug: 'huge',
				},
			] };
		this.getSelectValuesFromUtilitySizes = this.getSelectValuesFromUtilitySizes.bind(
			this
		);
		this.setCurrentSelectValue = this.setCurrentSelectValue.bind( this );
		this.onChangeValue = this.onChangeValue.bind( this );
		this.getSelectOptions = this.getSelectOptions.bind( this );
	}

	getSelectValuesFromUtilitySizes = ( listOfSizes, value ) => {
		let selectedPreset;
		if ( typeof value === 'string' ) {
			selectedPreset = listOfSizes.find( choice => choice.slug === value );
			return selectedPreset ? selectedPreset.slug : 'custom';
		}
	};

	setCurrentSelectValue = iconSize => {
		const { setAttributes } = this.props;
		setAttributes( { iconSize } );
	};

	onChangeValue = event => {
		const selectedUtil = this.state.utilitySizes.find( util => util.slug === event );
		if ( selectedUtil ) {
			this.props.setAttributes( { width: selectedUtil.size, height: selectedUtil.size } );
			this.setCurrentSelectValue(
				this.getSelectValuesFromUtilitySizes( this.state.utilitySizes, selectedUtil.slug )
			);
		}
	};

	getSelectOptions = optionsArray => {
		return [
			...optionsArray.map( option => ( {
				value: option.slug,
				label: option.name,
			} ) ),
		];
	};

	render() {
		const { iconSize } = this.props;
		return (
			<Fragment>
				<SelectControl
					label={ __( 'Choose icon size preset' ) }
					hideLabelFromVision={ true }
					value={ iconSize }
					onChange={ this.onChangeValue }
					options={ this.getSelectOptions( this.state.utilitySizes ) }
				/>
			</Fragment>
		);
	}
}
