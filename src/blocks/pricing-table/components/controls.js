/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
const { Toolbar } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			columns,
			contentAlign,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						className="coblocks__toolbar--numeral"
						controls={ '12'.split( '' ).map( ( count ) => ( {
							icon: icons.blank,
							// translators: %s: columns count e.g: "1", "2", "3"
							title: sprintf( __( '%s Columns' ), count ),
							isActive: columns == count,
							subscript: count,
							onClick: () =>
								setAttributes( {
									columns: count
								} )
						} ) ) }
					/>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}
