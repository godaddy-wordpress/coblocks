/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blocks;

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

		return (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
				/>
			</BlockControls>
		);
	}
}
