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
				minLevel={ 2 }
				maxLevel={ 5 }
				selectedLevel={ headingLevel }
				onChange={ onChangeHeadingLevel }
			/>
		</BlockControls>
	);
};

export default Controls;
