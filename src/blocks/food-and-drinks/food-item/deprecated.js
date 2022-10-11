/**
 * Internal dependencies
 */
import { default as currentBlock } from './block.json';
import deprecatedIcons from './deprecated/deprecatedIcons';
import deprecatedIconsToBackgroundImage from './deprecated/deprecatedIconsToBackgroundImage';
import migrateToColumnUtilityClasses from './deprecated/migrateToColumnUtilityClasses';
import migrateToAccessibleIcons from './deprecated/migrateToAccessibleIcons';
import migrateHeadingLevel from './deprecated/migrateHeadingLevel';

const deprecated = [
	{
		attributes: currentBlock.attributes,
		save: deprecatedIcons,
	},
	{
		attributes: currentBlock.attributes,
		save: deprecatedIconsToBackgroundImage,
	},
	{
		attributes: currentBlock.attributes,
		save: migrateToColumnUtilityClasses,
	},
	{
		attributes: currentBlock.attributes,
		save: migrateToAccessibleIcons,
	},
	{
		attributes: currentBlock.attributes,
		save: migrateHeadingLevel,
	},
];

export default deprecated;
