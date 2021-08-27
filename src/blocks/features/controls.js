/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';
import HeadingToolbar from '../../components/heading-toolbar';

/**
 * WordPress dependencies
 */
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
		onChangeHeadingLevel,
	} = props;

	const {
		contentAlign,
		headingLevel,
	} = attributes;

	return (
		<>
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
				{ BackgroundControls( props ) }
			</BlockControls>
		</>
	);
};

export default Controls;
