/**
 * External dependencies
 */
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Button, Modal } = wp.components;
const { PluginMoreMenuItem } = wp.editPost;
const { withSelect } = wp.data;

/**
 * Render plugin
 */
class ModalSettings extends Component {

	constructor( props ) {
		super( ...arguments );
		this.state   = {
			isOpen: false,
		}
	}

	render() {
		return (
			<Fragment>
				<PluginMoreMenuItem
					onClick={ () => {
						this.setState( { isOpen: true } );
					} }
				>
					{ __( 'CoBlocks' ) }
				</PluginMoreMenuItem>
				{ this.state.isOpen ?
					<Modal
						title="This is my modal"
						onRequestClose={ () => this.setState( { isOpen: false } ) }>
						<Button isDefault onClick={ () => this.setState( { isOpen: false } ) }>
							My custom close button
						</Button>
					</Modal>
				: null }
			</Fragment>
		);
	}
};

export default ModalSettings;