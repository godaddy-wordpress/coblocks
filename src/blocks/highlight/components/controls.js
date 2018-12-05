/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, AlignmentToolbar } = wp.editor;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			align,
		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<BlockControls>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
						/>
					</BlockControls>
				</Fragment>
			)
		);
	}
};

export default Controls;
