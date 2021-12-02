import { registerBlock } from './utils/helper';

// Register Blocks
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
import * as fieldCheckbox from './blocks/form/fields/checkbox';
import * as fieldDate from './blocks/form/fields/date';
import * as fieldEmail from './blocks/form/fields/email';
import * as fieldHidden from './blocks/form/fields/hidden';
import * as fieldName from './blocks/form/fields/name';
import * as fieldRadio from './blocks/form/fields/radio';
import * as fieldSelect from './blocks/form/fields/select';
import * as fieldSubmitButton from './blocks/form/fields/submit-button';
import * as fieldTelephone from './blocks/form/fields/phone';
import * as fieldText from './blocks/form/fields/text';
import * as fieldTextarea from './blocks/form/fields/textarea';
import * as fieldWebsite from './blocks/form/fields/website';

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
