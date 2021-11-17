/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Icon, Placeholder } from '@wordpress/components';
// import { TimerIcon } from '@godaddy-wordpress/coblocks-icons';

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'asdf',
		style: { color: 'blue' },
	} );
	//return <div { ...blockProps }>This is the Edit countdown</div>;

	return (
		<>
			<Placeholder
				instructions={ __( 'todo', 'coblocks' ) }
				key="placeholder"
				label="Countdown Timer"
				// icon={ <Icon icon={ TimerIcon } /> }
				{ ...blockProps }
			>

			</Placeholder>
		</>
	);
};

export default Edit;
