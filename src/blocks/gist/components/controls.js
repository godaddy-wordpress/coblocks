/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { BlockControls } = wp.editor;
const { Toolbar, IconButton } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			preview,
			setAttributes,
			setState,
		} = this.props;

		const { meta } = attributes;

		const customControls = [
			{
				icon: 'info',
				title: __( 'Display gist meta' ),
				onClick: () => setAttributes( {  meta: ! meta } ),
				isActive: meta === true,
			}
		];

		return [
			<BlockControls key="controls">
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

				{ preview &&
					<Toolbar controls={ customControls } />
				}

			</BlockControls>
		];
	}
}
