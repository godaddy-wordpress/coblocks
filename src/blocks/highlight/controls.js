/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

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
