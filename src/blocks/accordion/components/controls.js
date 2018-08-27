/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
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

		const { open, textAlign } = attributes;

		const customControls = [
			{
				icon: icons.open,
				title: __( 'Display open' ),
				onClick: () => setAttributes( {  open: ! open } ),
				isActive: open === true,
			}
		];

		return (
			<Fragment>
				<BlockControls>
					<Toolbar className="components-toolbar__coblocks-accordion" controls={ customControls } />
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}
