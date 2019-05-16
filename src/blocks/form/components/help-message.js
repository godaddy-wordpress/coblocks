/**
 * External dependencies
 */
import classnames from 'classnames';

const helpIcon = <svg class="gridicon gridicons-notice-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 13h-2v2h2v-2zm-2-2h2l.5-6h-3l.5 6z"></path></g></svg>;

export default ( { children = null, isError = false, ...props } ) => {
	const classes = classnames( 'coblocks-help-message', {
		'is-error': isError,
	} );

	return (
		children && (
			<div className={ classes } { ...props }>
				{ isError && helpIcon }
				<span>{ children }</span>
			</div>
		)
	);
};
