/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { BlockControls, AlignmentToolbar } = wp.blockEditor;

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			contentAlign,
			hasContentAlign,
		} = attributes;

		return (
			<Fragment>
				{ hasContentAlign && (
					<BlockControls>
						<AlignmentToolbar
							value={ contentAlign }
							onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
						/>
					</BlockControls>
				) }
			</Fragment>
		);
	}
}

export default Controls;
