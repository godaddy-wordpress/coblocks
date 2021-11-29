/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TimerIcon } from '@godaddy-wordpress/coblocks-icons';
import { useBlockProps } from '@wordpress/block-editor';
import { Icon, Placeholder } from '@wordpress/components';

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'asdf',
		style: { color: 'blue' },
	} );
	//return <div { ...blockProps }>This is the Edit countdown</div>;

	return (
		<>
			<Placeholder
				icon={ <Icon icon={ TimerIcon } /> }
				instructions={ __( 'todo', 'coblocks' ) }
				key="placeholder"
				label="Countdown Timer"
				{ ...blockProps }
			>

			</Placeholder>
		</>
	);
};

export default Edit;
