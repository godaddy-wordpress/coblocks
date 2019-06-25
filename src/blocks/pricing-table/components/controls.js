/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar } = wp.components;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			count,
			contentAlign,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					<Toolbar
						className="components-toolbar-coblocks-numeral-controls"
						controls={ '123'.split( '' ).map( ( number ) => ( {
							icon: icons.blank,
							/* translators: %s: number of tables */
							title: sprintf( __( '%s Tables' ), number ),
							isActive: count == number,
							subscript: number,
							onClick: () =>
								setAttributes( {
									count: parseInt( number ),
								} )
							} )
						) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
};

export default Controls;
