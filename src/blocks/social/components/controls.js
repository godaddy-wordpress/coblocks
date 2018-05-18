/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { BlockControls, BlockAlignmentToolbar } = wp.editor;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const { align } = attributes;

		return (
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
					controls={ [ 'left', 'center', 'right' ] }
				/>
			</BlockControls>
		);
	}
}
