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
			setAttributes,
			isSelected,
		} = this.props;

		const { textAlign } = attributes;

		return (
			isSelected && (
				<Fragment>
					<BlockControls>
						<AlignmentToolbar
							value={ textAlign }
							onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
						/>
					</BlockControls>
				</Fragment>
			)
		);
	}
};

export default Controls;