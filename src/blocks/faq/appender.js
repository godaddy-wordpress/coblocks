/**
 * External dependencies.
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Icon, plus } from '@wordpress/icons';

const CustomAppender = ( { onAddNewItem = noop, onAddNewHeading = noop } ) => {
	return (
		<div className="coblocks-block-appender">
			<Button
				className="block-editor-button-block-appender"
				label={ __( 'Add Question', 'coblocks' ) }
				onClick={ onAddNewItem }
			>
				<Icon icon={ plus } /> { __( 'Add Question', 'coblocks' ) }
			</Button>

			<Button
				className="block-editor-button-block-appender"
				label={ __( 'Category Title', 'coblocks' ) }
				onClick={ onAddNewHeading }
			>
				<Icon icon={ plus } /> { __( 'Category Title', 'coblocks' ) }
			</Button>
		</div>
	);
};

export default CustomAppender;
