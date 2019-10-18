/**
 * Internal dependencies
 */
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, IconButton } from '@wordpress/components';

class Controls extends Component {
	render() {
		const {
			className,
			attributes,
			preview,
			setAttributes,
			setState,
		} = this.props;

		const { file, meta } = attributes;

		const customControls = [
			{
				icon: 'info',
				title: __( 'Display meta', 'coblocks' ),
				onClick: () => setAttributes( { meta: ! meta } ),
				isActive: meta === true,
			},
		];

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						{ preview ? (
							<IconButton
								className="components-icon-button components-toolbar__control"
								label={ __( 'Edit Gist', 'coblocks' ) }
								onClick={ () => setState( { preview: false } ) }
								icon="edit"
							/>
						) : (
							<IconButton
								className="components-icon-button components-toolbar__control"
								label={ __( 'View Gist', 'coblocks' ) }
								onClick={ () => setState( { preview: true } ) }
								icon="welcome-view-site"
							/>
						) }
					</Toolbar>

					{ preview ? (
						<Toolbar controls={ customControls } />
					) : (
						<Toolbar>
							<label
								aria-label={ __( 'GitHub File', 'coblocks' ) }
								className={ `${ className }__file-label` }
								htmlFor={ `${ className }__file` }
							>
								{ icons.file }
							</label>
							<input
								aria-label={ __( 'GitHub File', 'coblocks' ) }
								className={ `${ className }__file` }
								id={ `${ className }__file` }
								onChange={ event => setAttributes( { file: event.target.value } ) }
								placeholder={ __( 'File', 'coblocks' ) }
								type="text"
								value={ file }
							/>
						</Toolbar>
					) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
