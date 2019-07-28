/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, BlockAlignmentToolbar } = wp.blockEditor;
const { Toolbar, IconButton } = wp.components;

class Controls extends Component {
	constructor() {
		super( ...arguments );
		this.updateAlignment = this.updateAlignment.bind( this );
	}

	updateAlignment( nextAlign ) {
		const extraUpdatedAttributes = [ 'wide', 'full' ].indexOf( nextAlign ) !== -1 ?
			{ width: undefined, height: undefined } :
			{};
		this.props.setAttributes( { ...extraUpdatedAttributes, align: nextAlign } );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			align,
			url,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ this.updateAlignment }
					/>
					<Toolbar>
						{ url &&
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Remove gif' ) }
								icon="trash"
								onClick={ () => setAttributes( { url: '', width: '', height: '' } ) }
							/>
						}
					</Toolbar>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
