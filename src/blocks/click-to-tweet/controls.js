/**
 * External dependencies
 */
import { AtIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Icon, Toolbar } from '@wordpress/components';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			textAlign,
			via,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
					<Toolbar>
						<div className="wp-block-coblocks-click-to-tweet__via-wrapper">
							<label
								aria-label={ __( 'Twitter Username', 'coblocks' ) }
								className="wp-block-coblocks-click-to-tweet__via-label"
								htmlFor="wp-block-coblocks-click-to-tweet__via"
							>
								<Icon icon={ icon } />
							</label>
							<input
								aria-label={ __( 'Twitter Username', 'coblocks' ) }
								className="wp-block-coblocks-click-to-tweet__via"
								id="wp-block-coblocks-click-to-tweet__via"
								onChange={ ( event ) => setAttributes( { via: event.target.value } ) }
								placeholder={ __( 'Username', 'coblocks' ) }
								type="text"
								value={ via }
							/>
						</div>
					</Toolbar>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
