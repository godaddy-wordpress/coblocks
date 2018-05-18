/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { BlockControls, BlockAlignmentToolbar } = wp.editor;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
		this.updateAlignment = this.updateAlignment.bind( this );
	}

	updateAlignment( nextAlign ) {
		const extraUpdatedAttributes = [ 'wide', 'full' ].indexOf( nextAlign ) !== -1 ?
			{ width: undefined, height: undefined } :
			{};
		this.props.setAttributes( { ...extraUpdatedAttributes, align: nextAlign } );
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
					onChange={ this.updateAlignment }
				/>
			</BlockControls>
		);
	}
}
