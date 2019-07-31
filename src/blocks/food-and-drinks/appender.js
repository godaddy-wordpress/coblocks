/**
 * External dependencies.
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { IconButton } = wp.components;

const CustomAppender = ( { onClick = noop } ) => {
	return (
		<div className="coblocks-list-appender">
			<IconButton
				icon="insert"
				label={ __( 'Add Menu Section' ) }
				labelPosition="bottom"
				className="coblocks-list-appender__toggle"
				onClick={ onClick }
			>
				{ __( 'Add Menu Section' ) }
			</IconButton>
		</div>
	);
};

export default CustomAppender;
