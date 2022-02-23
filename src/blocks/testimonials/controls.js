/**
 * Internal dependencies
 */
import HeadingToolbar from '../../components/heading-toolbar';

/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		onChangeHeadingLevel,
	} = props;

	const {
		headingLevel,
	} = attributes;

	return (
		<BlockControls>
			<HeadingToolbar
				maxLevel={ 5 }
				minLevel={ 2 }
				onChange={ onChangeHeadingLevel }
				selectedLevel={ headingLevel }
			/>
		</BlockControls>
	);
};

export default Controls;
