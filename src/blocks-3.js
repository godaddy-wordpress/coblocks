import { registerBlock } from './utils/helper';

// Register Blocks
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
import * as fieldCheckbox from './blocks/form/fields/field-checkbox';
import * as fieldDate from './blocks/form/fields/field-date';
import * as fieldEmail from './blocks/form/fields/field-email';
import * as fieldHidden from './blocks/form/fields/field-hidden';
import * as fieldName from './blocks/form/fields/field-name';
import * as fieldRadio from './blocks/form/fields/field-radio';
import * as fieldSelect from './blocks/form/fields/field-select';
import * as fieldSubmitButton from './blocks/form/fields/field-submit-button';
import * as fieldTelephone from './blocks/form/fields/field-phone';
import * as fieldText from './blocks/form/fields/field-text';
import * as fieldTextarea from './blocks/form/fields/field-textarea';
import * as fieldWebsite from './blocks/form/fields/field-website';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	clickToTweet,
	collage,
	fieldDate,
	fieldEmail,
	fieldName,
	fieldRadio,
	fieldTelephone,
	fieldTextarea,
	fieldText,
	fieldSelect,
	fieldSubmitButton,
	fieldCheckbox,
	fieldWebsite,
	fieldHidden,
].forEach( registerBlock );
