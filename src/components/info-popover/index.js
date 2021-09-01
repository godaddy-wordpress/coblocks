/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import {
	Button,
	Popover,
} from '@wordpress/components';
import { info } from '@wordpress/icons';

import './styles/editor.scss';

export const InfoPopover = ( { title, children, popoverProps } ) => {
	const [ isVisible, setIsVisible ] = useState( false );
	return (
		<Button
			className="coblocks-info-popover__trigger"
			icon={ info }
			onClick={ () => setIsVisible( ! isVisible ) }
			onMouseEnter={ () => setIsVisible( true ) }
			onMouseLeave={ () => setIsVisible( false ) }
		>
			{ isVisible && (
				<Popover
					className="coblocks-info-popover"
					headerTitle={ title }
					focusOnMount={ false }
					noArrow={ false }
					{ ...popoverProps }
				>
					<h4 className="coblocks-info-popover__title">
						{ title }
					</h4>
					<div className="coblocks-info-popover__content">
						{ children }
					</div>
				</Popover>
			) }
		</Button>
	);
};
