/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import {
	FilterDarkIcon,
	FilterGrayscaleIcon,
	FilterNoneIcon,
	FilterSaturationIcon,
	FilterSepiaIcon,
	FilterVintageIcon,
	FilterMainIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * Block user interface icons
 */
const icons = {};

icons.filter = <Icon icon={ FilterMainIcon } />;
icons.vintage = <Icon icon={ FilterVintageIcon } />;
icons.grayscale = <Icon icon={ FilterGrayscaleIcon } />;
icons.saturation = <Icon icon={ FilterSaturationIcon } />;
icons.dark = <Icon icon={ FilterDarkIcon } />;
icons.sepia = <Icon icon={ FilterSepiaIcon } />;
icons.none = <Icon icon={ FilterNoneIcon } />;

export default icons;
