const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blocks;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { attributes: { align, textAlign }, setAttributes } = this.props;

		return (
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => this.props.setAttributes( { align: value } ) }
				/>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) => this.props.setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>
		);
	}
}
