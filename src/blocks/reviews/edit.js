/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withNotices } from '@wordpress/components';

const Edit = ( props ) => {
	const { className } = props;
	return (
		<>
			{ /* Block Body (edit state) */ }
			<div className={ className }>
				<p>Coblocks + Yelp</p>
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
