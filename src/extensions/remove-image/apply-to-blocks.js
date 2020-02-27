
import { ToolbarGroup, Button } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent, ifCondition, compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Fragment, Component } from '@wordpress/element';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';

class ApplyToBlocks extends Component {
	render() {
		console.log( this.props );

		const renderControls = createHigherOrderComponent( ( BlockEdit ) => {
			return ( props ) => {
				const { selectedBlock } = props;
				console.log( props );
				return (
					<Fragment>
						<BlockEdit { ...props } />
						<BlockControls>
							<ToolbarGroup className="replace-image-button">
								<Button
									onClick={ () => console.log( 'console.log this was clickked.' ) }
								>
									{ __( 'Replace Image', 'coblocks' ) }
								</Button>
							</ToolbarGroup>
						</BlockControls>
					</Fragment>
				);
			};
		}, 'renderControls' );

			addFilter( 'editor.BlockEdit', 'coblocks/replace-image-button', renderControls );
		
// const applyWithSelect = withSelect( ( select ) => {
// 	const { getSelectedBlock } = select( 'core/editor' );
// 	console.log( getSelectedBlock );
// 	return {
// 		selectedBlock: getSelectedBlock(),
// 	};
// } );

// export default compose( applyWithSelect )( ApplyToBlocks );
