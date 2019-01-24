
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
const { hasBlockSupport }	= wp.blocks;

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

		this.props.attributes.textPanelHideColor = true;
		this.props.attributes.textPanelShowSpacingControls = true;

		// Display on the allowedBlocks only.
		this.props.attributes.textPanelHeadingFontSizes = true;

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