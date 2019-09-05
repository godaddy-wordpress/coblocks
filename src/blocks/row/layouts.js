/**
 * Internal dependencies
 */
import rowIcons from './icons';

export const layoutOptions = {
	2: [
		{ key: '50-50', name: 'Equal Split', icon: rowIcons.layout5050, smallIcon: rowIcons.smallLayout5050 },
		{ key: '66-33', name: 'Two Thirds / One Third', icon: rowIcons.layout6633, smallIcon: rowIcons.smallLayout6633 },
		{ key: '33-66', name: 'One Third / Two Thirds', icon: rowIcons.layout3366, smallIcon: rowIcons.smallLayout3366 },
		{ key: '75-25', name: 'Three Quarters / Quarter', icon: rowIcons.layout7525, smallIcon: rowIcons.smallLayout7525 },
		{ key: '25-75', name: 'Quarter / Three Quarters', icon: rowIcons.layout2575, smallIcon: rowIcons.smallLayout2575 },
	],
	3: [
		{ key: '33-33-33', name: 'Thirds', icon: rowIcons.layout333333, smallIcon: rowIcons.smallLayout333333 },
		{ key: '50-25-25', name: 'Half / Quarter / Quarter', icon: rowIcons.layout502525, smallIcon: rowIcons.smallLayout502525 },
		{ key: '25-25-50', name: 'Quarter / Quarter/ Half', icon: rowIcons.layout252550, smallIcon: rowIcons.smallLayout252550 },
		{ key: '25-50-25', name: 'Quarter / Half / Quarter', icon: rowIcons.layout255025, smallIcon: rowIcons.smallLayout255025 },
		{ key: '20-60-20', name: 'One Fifth/ Three Fifths / One Fifth', icon: rowIcons.layout206020, smallIcon: rowIcons.smallLayout206020 },
	],
	4: [
		{ key: '25-25-25-25', name: 'Quarters', icon: rowIcons.layout25252525, smallIcon: rowIcons.smallLayout25252525 },
		{ key: '40-20-20-20', name: 'Two Fifths / Fifth / Fifth / Fifth', icon: rowIcons.layout40202020, smallIcon: rowIcons.smallLayout40202020 },
		{ key: '20-20-20-40', name: 'Fifth / Fifth / Fifth / Two Fifths', icon: rowIcons.layout20202040, smallIcon: rowIcons.smallLayout20202040 },
	],
};
