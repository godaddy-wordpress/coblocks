/**
 * Internal dependencies
 */
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.blockEditor;
const { Toolbar, IconButton } = wp.components;

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
				title: __( 'Display meta' ),
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
								label={ __( 'Edit Gist' ) }
								onClick={ () => setState( { preview: false } ) }
								icon="edit"
							/>
						) : (
							<IconButton
								className="components-icon-button components-toolbar__control"
								label={ __( 'View Gist' ) }
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
								aria-label={ __( 'GitHub File' ) }
								className={ `${ className }__file-label` }
								htmlFor={ `${ className }__file` }
							>
								{ icons.file }
							</label>
							<input
								aria-label={ __( 'GitHub File' ) }
								className={ `${ className }__file` }
								id={ `${ className }__file` }
								onChange={ event => setAttributes( { file: event.target.value } ) }
								placeholder={ __( 'File' ) }
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
