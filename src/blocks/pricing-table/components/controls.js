/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
const { Toolbar, IconButton } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const { columns } = attributes;

		const customControls = [
			{
				icon: icons.col_1,
				title: __( 'One Column' ),
				onClick: () => setAttributes( { columns: 1 } ),
				isActive: columns === 1,
			},
			{
				icon: icons.col_2,
				title: __( 'Two Column' ),
				onClick: () => setAttributes( { columns: 2 } ),
				isActive: columns === 2,
			},
		];

		return (
			<BlockControls key="controls">
				<Toolbar controls={ customControls } />
			</BlockControls>
		);
	}
}
