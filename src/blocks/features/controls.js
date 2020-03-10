/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';
import HeadingToolbar from '../../components/heading-toolbar';

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
			onChangeHeadingLevel,
		} = this.props;

		const {
			contentAlign,
			headingLevel,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<HeadingToolbar
						minLevel={ 2 }
						maxLevel={ 6 }
						selectedLevel={ headingLevel }
						onChange={ onChangeHeadingLevel }
					/>
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
