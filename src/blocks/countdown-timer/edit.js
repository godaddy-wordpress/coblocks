/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TimerIcon } from '@godaddy-wordpress/coblocks-icons';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Icon, Placeholder } from '@wordpress/components';

const Edit = () => {
	const blockProps = useBlockProps();

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
				<Button variant="primary">
					Create Timer
				</Button>
			</Placeholder>
		</div>
	);
};

export default Edit;
