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

		const { title, content, open, textAlign } = attributes;

		const customControls = [
			{
				icon: icons.open,
				title: __( 'Display open' ),
				onClick: () => setAttributes( {  open: ! open } ),
				isActive: open === true,
			}
		];

		return (
			<BlockControls key="controls">
				<Toolbar className="components-toolbar__coblocks-accordion" controls={ customControls } />
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
				/>
			</BlockControls>
		);
	}
}
