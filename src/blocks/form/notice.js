/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './icons';

export default ( { children = null, isError = false, ...props } ) => {
	const classes = classnames( 'coblocks-form__notice', {
		'is-error': isError,
	} );

	return (
		children && (
			<div className={ classes } { ...props }>
				{ isError && icons.error }
				<span>{ children }</span>
			</div>
		)
	);
};
