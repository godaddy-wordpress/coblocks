/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';
import BackgroundImagePanel, { BackgroundImageToolbarControls } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
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
			contentAlign,
			columns,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					{ BackgroundImageToolbarControls( this.props ) }
					<Toolbar
						className="components-coblocks__toolbar-control--numerals"
						controls={ '1234'.split( '' ).map( ( count ) => ( {
							icon: icons.blank,
							// translators: %s: columns count e.g: "1", "2", "3", "4"
							title: sprintf( __( '%s Columns' ), count ),
							isActive: columns == parseInt( count ),
							subscript: count,
							onClick: () =>
								setAttributes( {
									columns: parseInt( count ),
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
