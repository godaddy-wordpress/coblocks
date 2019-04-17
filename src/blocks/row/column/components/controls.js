/**
 * Internal dependencies
 */
import BackgroundPanel, { BackgroundControls } from '../../../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar } = wp.editor;
const { BlockControls, BlockVerticalAlignmentToolbar } = wp.blockEditor;

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
			verticalAlignment,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					<BlockVerticalAlignmentToolbar
						onChange={ ( verticalAlignment ) => setAttributes( { verticalAlignment: verticalAlignment } ) }
						value={ verticalAlignment }
					/>
					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
