/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			textAlign,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
