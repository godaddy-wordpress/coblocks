/**
 * External dependencies.
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { Icon, plus } from '@wordpress/icons';

const CustomAppender = ( { onClick = noop } ) => {
	return (
		<div className="coblocks-block-appender">
			<Tooltip text={ __( 'Add a review with your own rating, message, and author', 'coblocks' ) }>
				<Button
					className="block-editor-button-block-appender"
					label={ __( 'Add custom review', 'coblocks' ) }
					onClick={ onClick }
				>
					<Icon icon={ plus } />
				</Button>
			</Tooltip>
		</div>
	);
};

export default CustomAppender;
