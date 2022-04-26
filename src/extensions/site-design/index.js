/* global coblocksLabs */
/**
  External dependencies
 */
import { ColorPaletteStyles } from '@godaddy-wordpress/coblocks-icons';
const icon = ColorPaletteStyles?.outlined;

/**
  WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { lazy, Suspense, useEffect } from '@wordpress/element';
import { registerPlugin, unregisterPlugin } from '@wordpress/plugins';

/**
  Internal dependencies
 */
import { PLUGIN_NAME } from './constant';
const SiteDesignComponent = lazy( () => import( './component' ) );

const RenderSiteDesign = () => {
	const {	isFeatureActive	} = useSelect( ( select ) => select( 'core/edit-post' ), [] );

	useEffect( () => {
		unregisterSiteDesign();
		registerSiteDesign( isFeatureActive );
	}, [ isFeatureActive ] );

	registerSiteDesign();
	return null;
};

const registerSiteDesign = ( isActive ) => {
	registerPlugin( PLUGIN_NAME, {
		icon,
		render: () => {
			if ( isActive ) {
				return null;
			}
			return (
				<Suspense fallback={ null }>
					<SiteDesignComponent />
				</Suspense>
			);
		} } );
};

const unregisterSiteDesign = () => {
	unregisterPlugin( PLUGIN_NAME );
};

/* istanbul ignore next */
const isLabsEnabled = !! coblocksLabs?.isLabsEnabled;
if ( isLabsEnabled ) {
	RenderSiteDesign();
}
