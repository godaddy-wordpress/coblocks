
import materialIcons from './material';

/**
 * Custom icons
 */
const icons = {};

const keywords = {
	heart : 'plus add circle insert',
	add_circle : 'plus add circle insert',
	remove_circle : 'plus add circle insert',
	gesture : 'plus add circle insert',
	flag : 'plus add circle insert',
};

icons.filled = {
	heart : {
		icon: materialIcons.heart,
		keywords : keywords.heart,
	},
	add_circle : {
		icon: materialIcons.add_circle,
		keywords : keywords.add_circle,
	},
	remove_circle : {
		icon: materialIcons.remove_circle,
		keywords : keywords.remove_circle,
	},
	gesture : {
		icon: materialIcons.gesture,
		keywords : keywords.gesture,
	},
	flag : {
		icon: materialIcons.remove_circle,
		keywords : keywords.remove_circle,
	},
}

icons.outlined = {
	heart : {
		icon: materialIcons.heart_outline,
		keywords : keywords.heart_outline,
	},
	add_circle : {
		icon: materialIcons.add_circle_outline,
		keywords : keywords.add_circle_outline,
	},
	remove_circle : {
		icon: materialIcons.remove_circle_outline,
		keywords : keywords.remove_circle_outline,
	},
	gesture : {
		icon: materialIcons.gesture,
		keywords : keywords.gesture,
	},
	flag : {
		icon: materialIcons.remove_circle_outline,
		keywords : keywords.remove_circle_outline,
	},
}

export default icons;
