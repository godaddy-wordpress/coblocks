/**
 * Internal dependencies
 */
import { attributes } from './block.json';
import deprecatedIcons from './deprecated/deprecatedIcons';
import deprecatedIconsToBackgroundImage from './deprecated/deprecatedIconsToBackgroundImage';
import migrateToColumnUtilityClasses from './deprecated/migrateToColumnUtilityClasses';

const deprecated = [
	{
		attributes,
		save: deprecatedIcons,
	},
	{
		attributes,
		save: deprecatedIconsToBackgroundImage,
	},
	{
		attributes,
		save: migrateToColumnUtilityClasses,
	},
];

export default deprecated;
