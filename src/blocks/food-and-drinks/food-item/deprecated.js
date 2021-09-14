/**
 * Internal dependencies
 */
import { attributes } from './block.json';
import deprecatedIcons from './deprecated/deprecatedIcons';
import deprecatedIconsToBackgroundImage from './deprecated/deprecatedIconsToBackgroundImage';
import migrateToColumnUtilityClasses from './deprecated/migrateToColumnUtilityClasses';
import migrateToAccessibleIcons from './deprecated/migrateToAccessibleIcons';

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
	{
		attributes,
		save: migrateToAccessibleIcons,
	},
];

export default deprecated;
