/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar, Path, SVG } = wp.components;

const DEFAULT_ALIGNMENT_CONTROLS = [
	{
		icon: <SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><Path d="m16 17v-14h-12v14z" fill="currentColor" /></SVG>,
		title: __( 'One Pricing Table' ),
		count: 1,
	},
	{
		icon: <SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><Path d="m17 17v-14h-6v14zm-8 0v-14h-6v14z" fill="currentColor" /></SVG>,
		title: __( 'Two Pricing Tables' ),
		count: 2,
	},
	{
		icon: <SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><Path d="m18 16v-12h-4v12zm-6 0v-12h-4v12zm-6 0v-12h-4v12z" fill="currentColor" /></SVG>,
		title: __( 'Three Pricing Tables' ),
		count: 3,
	},
	{
		icon: <SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><Path d="m17 17v-6h-6v6zm0-8v-6h-6v6zm-8 0v-6h-6v6zm0 8v-6h-6v6z" fill="currentColor" /></SVG>,
		title: __( 'Four Pricing Tables' ),
		count: 4,
	},

];

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			count,
			contentAlign,
		} = attributes;

		const activeCount = find( DEFAULT_ALIGNMENT_CONTROLS, ( control ) => control.count === count );

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					<Toolbar
						isCollapsed={ true }
						icon={ activeCount.icon }
						label={ __( 'Change pricing table count' ) }
						controls={ DEFAULT_ALIGNMENT_CONTROLS.map( ( control ) => {
							const isActive = ( count === parseInt( control.count ) );

							return {
								...control,
								isActive,
								onClick: () => setAttributes( { count: parseInt( control.count ) } ),
							};
						} ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
