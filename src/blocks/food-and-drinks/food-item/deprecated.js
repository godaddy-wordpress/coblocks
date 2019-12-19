/**
 * Internal dependencies
 */
import { attributes } from './block.json';
import deprecatedIcons from './deprecated/deprecatedIcons';
import deprecatedIconsToBackgroundImage from './deprecated/deprecatedIconsToBackgroundImage';

const deprecated = [
	{
		attributes,
		save: deprecatedIcons,
	},
	{
		attributes,
		save: deprecatedIconsToBackgroundImage,
	},
];

export default deprecated;
