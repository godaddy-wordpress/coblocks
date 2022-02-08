/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TimerIcon } from '@godaddy-wordpress/coblocks-icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	DateTimePicker,
	Icon,
	Placeholder,
} from '@wordpress/components';

const Edit = ( { attributes, setAttributes } ) => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ <Icon icon={ TimerIcon } /> }
				instructions={ __( 'Enter the date and time for when the timer should expire.', 'coblocks' ) }
				key="placeholder"
				label="Countdown Timer"
			>

				<div>
					<DateTimePicker
						currentDate={ attributes.eventTime }
						onChange={ ( date ) => setAttributes( { eventTime: Date.parse( date ) } ) }
					/>
				</div>

				<div>You can adjust the time zone under <a href={ '/wp-admin/options-general.php' }>Site Settings</a></div>

			</Placeholder>
		</div>
	);
};

export default Edit;
