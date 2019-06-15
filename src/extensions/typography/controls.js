
/**
 * Internal dependencies
 */
import TypographyControls, { TypographyAttributes, TypograpyClasses } from './../../components/typography-controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
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

		let hideToolbar = false;
		const allowedBlocks = [ 'core/paragraph', 'core/heading', 'core/cover', 'core/button', 'core/list', 'coblocks/row', 'coblocks/column', 'coblocks/accordion', 'coblocks/accordion-item', 'coblocks/click-to-tweet', 'coblocks/alert', 'coblocks/pricing-table', 'coblocks/highlight', 'coblocks/features' ];

		this.props.attributes.textPanelHideColor = true;
		this.props.attributes.textPanelShowSpacingControls = true;

		// Display on the allowedBlocks only.
		if ( ! allowedBlocks.includes( this.props.name ) ){
			this.props.attributes.textPanelHideSize = true;
		} else {
			this.props.attributes.textPanelHeadingFontSizes = true;
		}

		// Show line height on appropriate blocks.
		if ( ! allowedBlocks.includes( this.props.name ) ) {
			this.props.attributes.textPanelLineHeight = true;
			this.props.attributes.textPanelLetterSpacing = true;
		}

		// Manage options for row and columns
		if ( [ 'coblocks/row', 'coblocks/column' ].includes( this.props.name ) ) {
			this.props.attributes.textPanelShowSpacingControls = false;
		}

		//do not show if there is no layout for row blocks yet
		if ( [ 'coblocks/row' ].includes( this.props.name ) ){
			if( !this.props.attributes.layout ){
				hideToolbar = true;
			}
		}

		if( !hideToolbar ){
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

		return (
			<Fragment>
			</Fragment>
		);
	}
}

export default Controls;