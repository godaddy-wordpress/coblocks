/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { BlockControls, AlignmentToolbar } = wp.editor;

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			align,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
