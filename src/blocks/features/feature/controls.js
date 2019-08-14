/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			contentAlign,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
