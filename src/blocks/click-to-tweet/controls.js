/**
 * External dependencies
 */
import { AtIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, Toolbar } from '@wordpress/components';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		textAlign,
		via,
	} = attributes;

	return (
		<BlockControls>
			<AlignmentToolbar
				value={ textAlign }
				onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
			/>
			<Toolbar label={ __( 'Click to Tweet controls', 'coblocks' ) }>
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
	);
};

export default Controls;
