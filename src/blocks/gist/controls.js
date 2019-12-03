/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

class Controls extends Component {
	render() {
		const {
			preview,
			setState,
		} = this.props;

		const editControl = [
			{
				icon: 'edit',
				title: preview ?
					sprintf(
						/* translators: %s: "Gist", the name of a code sharing platform */
						__( 'Return to %s', 'coblocks' ),
						'Gist'
					) :
					sprintf(
						/* translators: %s: "Gist", the name of a code sharing platform */
						__( 'Edit %s URL', 'coblocks' ),
						'Gist'
					),
				onClick: () => setState( { preview: ! preview } ),
				isActive: ! preview,
			},
		];

		return (
			<BlockControls>
				<Toolbar controls={ editControl } />
			</BlockControls>
		);
	}
}

export default Controls;
