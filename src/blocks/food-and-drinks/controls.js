/**
 * Internal dependencies
 */
import HeadingToolbar from '../../components/heading-toolbar';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';

class Controls extends Component {
	render() {
		const {
			attributes,
			onChangeHeadingLevel,
		} = this.props;

		const {
			headingLevel,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<HeadingToolbar
						minLevel={ 2 }
						maxLevel={ 5 }
						selectedLevel={ headingLevel }
						onChange={ onChangeHeadingLevel }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
