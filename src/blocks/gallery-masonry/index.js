/**
 * External dependencies
 */
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { Icon, Spinner } from '@wordpress/components';
import { lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
const Edit = lazy( () => import( './edit' ) );
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	attributes,
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	deprecated,
	edit: ( props ) => (
		<Suspense fallback={ <Spinner /> }>
			<Edit { ...props } />
		</Suspense>
	),
	icon: <Icon icon={ icon } />,
	save,
	transforms,
};

export { name, category, metadata, settings };
