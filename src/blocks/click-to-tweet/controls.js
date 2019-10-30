/**
 * Internal dependencies
 */
import icons from '../../utils/icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

class Controls extends Component {
	render() {
		const {
			className,
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
						<div className={ `${ className }__via-wrapper` }>
							<label
								aria-label={ __( 'Twitter Username', 'coblocks' ) }
								className={ `${ className }__via-label` }
								htmlFor={ `${ className }__via` }
							>
								{ icons.at }
							</label>
							<input
								aria-label={ __( 'Twitter Username', 'coblocks' ) }
								className={ `${ className }__via` }
								id={ `${ className }__via` }
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
