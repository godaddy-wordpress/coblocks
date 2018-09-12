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
						className="coblocks__toolbar--numeral"
						controls={ '123'.split( '' ).map( ( number ) => ( {
							icon: icons.blank,
							// translators: %s: tables count e.g: "1", "2", "3"
							title: sprintf( __( '%s Tables' ), number ),
							isActive: count == number,
							subscript: number,
							onClick: () =>
								setAttributes( {
									count: number,
									align: number == 1 ? undefined : number == 2 ? 'wide' : number >= 3 ? 'full' : undefined,
								} )
							} )
						) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}
