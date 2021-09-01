/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { closeSmall as icon } from '@wordpress/icons';

export default ( { children = null, isError = false, ...props } ) => {
	const classes = classnames( 'coblocks-form__notice', {
		'is-error': isError,
	} );

	return (
		children && (
			<div className={ classes } { ...props }>
				<Icon icon={ icon } />
				<span>{ children }</span>
			</div>
		)
	);
};
