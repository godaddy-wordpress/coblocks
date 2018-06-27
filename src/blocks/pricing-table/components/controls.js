/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
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

		const { columns } = attributes;

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
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
				</BlockControls>
			</Fragment>
		);
	}
}
