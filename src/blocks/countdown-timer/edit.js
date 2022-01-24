/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TimerIcon } from '@godaddy-wordpress/coblocks-icons';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Icon, Placeholder } from '@wordpress/components';
import { useState } from '@wordpress/element';

const Edit = ( { attributes, setAttributes } ) => {
	const blockProps = useBlockProps();

	const [ value, setValue ] = useState( -1 );

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ <Icon icon={ TimerIcon } /> }
				instructions={ __( 'Enter the date and time for when the timer should expire.', 'coblocks' ) }
				key="placeholder"
				label="Countdown Timer"
			>
				End date
				<input type={ 'date' } />
				End time
				<input type={ 'time' } />
				<div>TODO : Show Current Time Zone</div>
				You can adjust the time zone under <a href={ '/wp-admin/options-general.php' }>Site Settings</a>
				<input type={ 'number' } value={ attributes.eventTime } onChange={ ( nextAddress ) =>
					setValue( parseInt( nextAddress.target.value ) )
				} />
				<Button variant="primary" onClick={ () => {
					setAttributes( { eventTime: value } );
				} }>
					Create Timer
				</Button>
			</Placeholder>
		</div>
	);
};

export default Edit;
