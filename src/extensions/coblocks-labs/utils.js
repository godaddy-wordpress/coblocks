/* global coblocksLabs */
const safeCoBlocksLabsData = typeof coblocksLabs !== 'undefined' ? coblocksLabs : {};

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * The Site Design and Layout Selector features depend on the Go theme.
 *
 * If the Go theme isn't active but is installed, this function should return an href to the Go theme details page where
 * they can go to activate it using `goThemeDetailsUri`.
 *
 * If Go is not installed, we should have an href that takes them to install it using `goThemeInstallUri`.
 *
 * if Go theme is active and installed return message that says 'This feature requires the Go Theme.'
 *
 * The object properties we are evaluating from `safeCoBlocksLabsData` are: `isGoThemeActive`, `isGoThemeInstalled`,
 * `goThemeDetailsUri`, `goThemeInstallUri`,
 *
 * @return {string} - Including the href to the Go theme details page or install page when needed.
 */
export const conditionalHelpMessage = ( ) => {
	const {
		isGoThemeActive,
		isGoThemeInstalled,
		goThemeDetailsUri,
		goThemeInstallUri,
	} = safeCoBlocksLabsData;

	if ( isGoThemeActive && isGoThemeInstalled ) {
		return __( 'This feature requires the Go Theme.', 'coblocks' );
	}

	if ( isGoThemeInstalled ) {
		return (
			<> { __( 'This feature requires the Go Theme - ', 'coblocks' ) }
				<a href={ goThemeDetailsUri } rel="noopener noreferrer" target="_blank">
					{ __( 'Activate', 'coblocks' ) }
				</a>
			</> );
	}

	return (
		<> { __( 'This feature requires the Go Theme - ', 'coblocks' ) }
			<a href={ goThemeInstallUri } rel="noopener noreferrer" target="_blank">
				{ __( 'Install now', 'coblocks' ) }
			</a>
		</> );
};

/**
 * The Site Design feature is deprecated with Go FSE and is disabled when Go FSE is active.
 *
 * @return {string} - Conditional string to use the feature or disabled
 */
export const GSEHelpMessage = ( ) => {
	const {
		isGoThemeActive,
		isGoThemeInstalled,
		isGoSiteEditor,
		goThemeDetailsUri,
		goThemeInstallUri,
	} = safeCoBlocksLabsData;

	if ( isGoSiteEditor ) {
		return __( 'This feature is deprecated and replaced with Go Site Editor.', 'coblocks' );
	}

	if ( isGoThemeActive && isGoThemeInstalled ) {
		return __( 'This feature requires the Go Theme.', 'coblocks' );
	}

	if ( isGoThemeInstalled ) {
		return (
			<> { __( 'This feature requires the Go Theme - ', 'coblocks' ) }
				<a href={ goThemeDetailsUri } rel="noopener noreferrer" target="_blank">
					{ __( 'Activate', 'coblocks' ) }
				</a>
			</> );
	}

	// Feature will remain disabled with GSE but still allows user to manage site design through Go.
	return (
		<> { __( 'This feature requires the Go Theme - ', 'coblocks' ) }
			<a href={ goThemeInstallUri } rel="noopener noreferrer" target="_blank">
				{ __( 'Install now', 'coblocks' ) }
			</a>
		</> );
};

/**
 *
 * @return {boolean} Whether or not the Site Design and Layout Selector controls are enabled.
 */
export const controlDisable = ( ) => {
	const {
		isGoThemeActive,
		isGoThemeInstalled,
	} = safeCoBlocksLabsData;

	if ( isGoThemeActive && isGoThemeInstalled ) {
		return false;
	}

	return true;
};

/**
 * Helper function to determine the disabled value based on the given conditions.
 *
 * @param {boolean} conditionalDisable    - Indicates if the control should be disabled based on certain conditions.
 * @param {boolean} conditionalDisableFSE - Indicates if the control should be disabled in Full Site Editor context.
 * @return {boolean} - The final disabled value.
 */
export const disabledValue = ( conditionalDisable, conditionalDisableFSE ) => {
	if ( conditionalDisableFSE && !! safeCoBlocksLabsData?.isGoSiteEditor ) {
		return true;
	}
	if ( conditionalDisable ) {
		return controlDisable();
	}
	return false;
};
