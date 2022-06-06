import { registerBlock } from './utils/helper';

import * as column from './blocks/row/column';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as eventItem from './blocks/events/event-item';
import * as events from './blocks/events';
import * as faq from './blocks/faq';
import * as faqItem from './blocks/faq/faq-item';
import * as features from './blocks/features';

[
	column,
	dynamicSeparator,
	events,
	eventItem,
	faq,
	faqItem,
	features,
].forEach( registerBlock );
