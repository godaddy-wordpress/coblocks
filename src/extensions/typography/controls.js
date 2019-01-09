
/**
 * Internal dependencies
 */
import TypographyControls, { TypographyAttributes, TypograpyClasses } from './../../components/typography-controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
const { Toolbar } = wp.components;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const allowedBlocks = [ 'core/paragraph', 'core/heading', 'core/cover', 'core/button' ];

		// Display on the allowedBlocks only.
		if ( ! allowedBlocks.includes( this.props.name ) ){
			this.props.attributes.textPanelHideSize = true;
		} else {
			this.props.attributes.textPanelHeadingFontSizes = true;
		}

		// Show line height on appropriate blocks.
		if ( ! [ 'core/heading', 'core/paragraph', 'core/cover', 'core/button' ].includes( this.props.name ) ) {
			this.props.attributes.textPanelLineHeight = true;
			this.props.attributes.textPanelLetterSpacing = true;
		}

		this.props.attributes.textPanelHideColor = true;
		this.props.attributes.textPanelShowSpacingControls = true;


		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<TypographyControls { ...this.props } />
					</Toolbar>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;