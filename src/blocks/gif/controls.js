/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
import { Toolbar, IconButton } from '@wordpress/components';

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
								label={ __( 'Remove gif', 'coblocks' ) }
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
