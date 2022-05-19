/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';

export default function CoBlocksMenuIcon( props ) {
	const {
		icon,
		label,
		slug,
	} = props;

	return (
		<span
			className="coblocks-menu-icon"
			id={ `coblocks-menu-icon-${ slug }` }>
			<Icon className="coblocks-menu-icon__icon" icon={ icon } />
			<span className="coblocks-menu-icon__label">
				{ label }
			</span>
		</span>
	);
}
