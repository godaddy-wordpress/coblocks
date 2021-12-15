/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Suspense } from '@wordpress/element';
import { PanelBody, Spinner } from '@wordpress/components';

export function InspectorLoadingFallback() {
	return (
		<PanelBody
			initialOpen={ false }
			title={ <span className="coblocks-ellipsis-loading">{ __( 'Loading Inspector', 'coblocks' ) }</span> }
		>
			<Spinner />
		</PanelBody>
	);
}

export default function InspectorLoader( { children } ) {
	return (
		<InspectorControls>
			<Suspense fallback={ <InspectorLoadingFallback /> }>
				{ children }
			</Suspense>
		</InspectorControls>
	);
}
