/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const svgs = {
	outlined: {},
	filled: {},
};

const icons = {
	coblocks: {
		/* translators: icon label */
		label: __( 'CoBlocks', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'block', 'coblocks' ),
			/* translators: icon keyword */
			__( 'blocks', 'coblocks' ),
			/* translators: icon keyword */
			__( 'build', 'coblocks' ),
			/* translators: icon keyword */
			__( 'design', 'coblocks' ),
			/* translators: icon keyword */
			__( 'gutenberg', 'coblocks' ),
		],
		// eslint-disable-next-line react/no-unknown-property
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewbox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m5.17346763.00163164 9.55661877-.00163126c1.8075616-.00030854 2.4639368.18821016 3.1264625.54230616.6625258.35409601 1.183646.8737945 1.5402492 1.53604705.3566032.66225256.5479761 1.31916921.5567132 3.13082116l.0461929 9.57824455c.0087371 1.811652-.1762994 2.4686329-.5265143 3.1310061s-.8663216 1.1822487-1.5254309 1.5365703c-.6591092.3543216-1.313665.5430641-3.1212266.5433727l-9.55661876.0016312c-1.80756159.0003086-2.46393681-.1882101-3.12646255-.5423061-.66252575-.354096-1.18364596-.8737945-1.54024916-1.5360471-.3566032-.6622525-.54797616-1.3191692-.5567132-3.1308212l-.04619294-9.57824454c-.00873705-1.81165196.17629938-2.46863286.52651432-3.13100606.35021493-.6623732.8663216-1.18224875 1.52543086-1.53657035s1.31366506-.54306407 3.12122666-.54337261zm-.72902319 3.33170169c-.61364972 0-1.11111111.49746139-1.11111111 1.11111111v11.11111116c0 .6136497.49746139 1.1111111 1.11111111 1.1111111h3.33333334c.61364972 0 1.11111111-.4974614 1.11111111-1.1111111v-11.11111116c0-.61364972-.49746139-1.11111111-1.11111111-1.11111111zm7.77777776 7.77777777c-.6136497 0-1.1111111.4974614-1.1111111 1.1111111v3.3333334c0 .6136497.4974614 1.1111111 1.1111111 1.1111111h3.3333334c.6136497 0 1.1111111-.4974614 1.1111111-1.1111111v-3.3333334c0-.6136497-.4974614-1.1111111-1.1111111-1.1111111zm0-7.77777777c-.6136497 0-1.1111111.49746139-1.1111111 1.11111111v3.33333334c0 .61364972.4974614 1.11111111 1.1111111 1.11111111h3.3333334c.6136497 0 1.1111111-.49746139 1.1111111-1.11111111v-3.33333334c0-.61364972-.4974614-1.11111111-1.1111111-1.11111111z" fillRule="evenodd" /></svg>,
	},
	audiotrack: {
		/* translators: icon label */
		label: __( 'Audio', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'audio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
			/* translators: icon keyword */
			__( 'music', 'coblocks' ),
			/* translators: icon keyword */
			__( 'podcast', 'coblocks' ),
			/* translators: icon keyword */
			__( 'song', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 14 20" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m10 0v11.7222222c-.65555556-.3777778-1.41111111-.6111111-2.22222222-.6111111-2.45555556 0-4.44444445 1.9888889-4.44444445 4.4444445 0 2.4555555 1.98888889 4.4444444 4.44444445 4.4444444 2.45555552 0 4.44444442-1.9888889 4.44444442-4.4444444v-11.11111116h4.4444445v-4.44444444z" transform="translate(-3)" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 14 20" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m10 0v11.7222222c-.65555556-.3777778-1.41111111-.6111111-2.22222222-.6111111-2.45555556 0-4.44444445 1.9888889-4.44444445 4.4444445 0 2.4555555 1.98888889 4.4444444 4.44444445 4.4444444 2.45555552 0 4.44444442-1.9888889 4.44444442-4.4444444v-11.11111116h4.4444445v-4.44444444zm-2.22222222 17.7777778c-1.22222222 0-2.22222222-1-2.22222222-2.2222222 0-1.2222223 1-2.2222223 2.22222222-2.2222223s2.22222222 1 2.22222222 2.2222223c0 1.2222222-1 2.2222222-2.22222222 2.2222222z" transform="translate(-3)" /></svg>,
	},
	album: {
		/* translators: icon label */
		label: __( 'Album', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'audio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
			/* translators: icon keyword */
			__( 'music', 'coblocks' ),
			/* translators: icon keyword */
			__( 'song', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.2895508.29378255c-5.52000002 0-10.00000002 4.48-10.00000002 10.00000005 0 5.52 4.48 10 10.00000002 10 5.52 0 10-4.48 10-10 0-5.52000005-4.48-10.00000005-10-10.00000005zm0 18.00000005c-4.41000002 0-8.00000002-3.59-8.00000002-8 0-4.41000005 3.59-8.00000005 8.00000002-8.00000005 4.41 0 8 3.59 8 8.00000005 0 4.41-3.59 8-8 8zm0-12.50000005c-2.49000002 0-4.50000002 2.01-4.50000002 4.50000005 0 2.49 2.01 4.5 4.50000002 4.5 2.49 0 4.5-2.01 4.5-4.5 0-2.49000005-2.01-4.50000005-4.5-4.50000005zm0 5.50000005c-.55000002 0-1.00000002-.45-1.00000002-1 0-.55000005.45-1.00000005 1.00000002-1.00000005.55 0 1 .45 1 1.00000005 0 .55-.45 1-1 1z" transform="translate(-.289551 -.293783)" /></svg>,
	},
	headset: {
		/* translators: icon label */
		label: __( 'Headset', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'audio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'beats', 'coblocks' ),
			/* translators: icon keyword */
			__( 'bose', 'coblocks' ),
			/* translators: icon keyword */
			__( 'headphones', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.0384629.01236979c-5.23157899 0-9.47368425 4.24210526-9.47368425 9.47368421v7.3684211c0 1.7473684 1.41052631 3.1578947 3.15789473 3.1578947h3.15789474v-8.4210526h-4.21052632v-2.1052632c0-4.07368421 3.29473685-7.36842105 7.3684211-7.36842105 4.0736842 0 7.368421 3.29473684 7.368421 7.36842105v2.1052632h-4.2105263v8.4210526h3.1578947c1.7473685 0 3.1578948-1.4105263 3.1578948-3.1578947v-7.3684211c0-5.23157895-4.2421053-9.47368421-9.4736842-9.47368421z" fillRule="evenodd" /></svg>,
	},
	volume: {
		/* translators: icon label */
		label: __( 'Volume', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'audio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
			/* translators: icon keyword */
			__( 'music', 'coblocks' ),
			/* translators: icon keyword */
			__( 'song', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m0 6.66666667v6.66666663h4.44444444l5.55555556 5.5555556v-17.77777779l-5.55555556 5.55555556zm15 3.33333333c0-1.96666667-1.1333333-3.65555556-2.7777778-4.47777778v8.94444448c1.6444445-.8111111 2.7777778-2.5 2.7777778-4.4666667zm-2.7777778-9.74444444v2.28888888c3.2111111.95555556 5.5555556 3.93333334 5.5555556 7.45555556 0 3.5222222-2.3444445 6.5-5.5555556 7.4555556v2.2888888c4.4555556-1.0111111 7.7777778-4.9888888 7.7777778-9.7444444 0-4.75555556-3.3222222-8.73333333-7.7777778-9.74444444z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m.99267578 6.72328559v6.66666671h4.44444445l5.55555557 5.5555555v-17.77777777l-5.55555557 5.55555556zm7.77777778-.18888889v7.0444444l-2.41111111-2.4111111h-3.14444445v-2.22222219h3.14444445zm7.22222224 3.5222222c0-1.96666664-1.1333334-3.65555553-2.7777778-4.47777775v8.94444445c1.6444444-.8111111 2.7777778-2.5 2.7777778-4.4666667zm-2.7777778-9.74444442v2.28888889c3.2111111.95555555 5.5555556 3.93333333 5.5555556 7.45555553s-2.3444445 6.5-5.5555556 7.4555556v2.2888889c4.4555556-1.0111111 7.7777778-4.9888889 7.7777778-9.7444445 0-4.75555553-3.3222222-8.73333331-7.7777778-9.74444442z" transform="translate(-1)" /></svg>,
	},
	keyboard_voice: {
		/* translators: icon label */
		label: __( 'Voice', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'audio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'computer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
			/* translators: icon keyword */
			__( 'music', 'coblocks' ),
			/* translators: icon keyword */
			__( 'podcast', 'coblocks' ),
			/* translators: icon keyword */
			__( 'song', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="nonzero"><path d="m10 12.6315789c1.7473684 0 3.1473684-1.4105263 3.1473684-3.15789469l.0105263-6.31578947c0-1.74736842-1.4105263-3.15789474-3.1578947-3.15789474-1.74736842 0-3.15789474 1.41052632-3.15789474 3.15789474v6.31578947c0 1.74736839 1.41052632 3.15789469 3.15789474 3.15789469zm-1.26315789-9.57894732c0-.69473684.56842105-1.2631579 1.26315789-1.2631579.6947368 0 1.2631579.56842106 1.2631579 1.2631579l-.0105263 6.52631579c0 .69473683-.5578948 1.26315793-1.2526316 1.26315793-.69473684 0-1.26315789-.5684211-1.26315789-1.26315793zm6.84210529 6.42105263c0 3.15789469-2.6736842 5.36842109-5.5789474 5.36842109-2.90526316 0-5.57894737-2.2105264-5.57894737-5.36842109h-1.78947368c0 3.58947369 2.86315789 6.55789469 6.31578947 7.07368419v3.4526316h2.10526318v-3.4526316c3.4526316-.5052631 6.3157895-3.4736842 6.3157895-7.07368419z" /><path d="m10 12.6315789c1.7473684 0 3.1473684-1.4105263 3.1473684-3.15789469l.0105263-6.31578947c0-1.74736842-1.4105263-3.15789474-3.1578947-3.15789474-1.74736842 0-3.15789474 1.41052632-3.15789474 3.15789474v6.31578947c0 1.74736839 1.41052632 3.15789469 3.15789474 3.15789469zm5.5789474-3.15789469c0 3.15789469-2.6736842 5.36842109-5.5789474 5.36842109-2.90526316 0-5.57894737-2.2105264-5.57894737-5.36842109h-1.78947368c0 3.58947369 2.86315789 6.55789469 6.31578947 7.07368419v3.4526316h2.10526318v-3.4526316c3.4526316-.5052631 6.3157895-3.4736842 6.3157895-7.07368419z" /></g></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 12.6315789c1.7473684 0 3.1473684-1.4105263 3.1473684-3.15789469l.0105263-6.31578947c0-1.74736842-1.4105263-3.15789474-3.1578947-3.15789474-1.74736842 0-3.15789474 1.41052632-3.15789474 3.15789474v6.31578947c0 1.74736839 1.41052632 3.15789469 3.15789474 3.15789469zm-1.26315789-9.57894732c0-.69473684.56842105-1.2631579 1.26315789-1.2631579.6947368 0 1.2631579.56842106 1.2631579 1.2631579l-.0105263 6.52631579c0 .69473683-.5578948 1.26315793-1.2526316 1.26315793-.69473684 0-1.26315789-.5684211-1.26315789-1.26315793zm6.84210529 6.42105263c0 3.15789469-2.6736842 5.36842109-5.5789474 5.36842109-2.90526316 0-5.57894737-2.2105264-5.57894737-5.36842109h-1.78947368c0 3.58947369 2.86315789 6.55789469 6.31578947 7.07368419v3.4526316h2.10526318v-3.4526316c3.4526316-.5052631 6.3157895-3.4736842 6.3157895-7.07368419z" /></svg>,
	},
	aperture: {
		/* translators: icon label */
		label: __( 'Aperture', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'camera', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'film', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photo', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photographer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photography', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m7.4 8.5 4.77-8.26c-.7-.15-1.42-.24-2.17-.24-2.4 0-4.6.85-6.32 2.25l3.66 6.35zm12.14-1.5c-.92-2.92-3.15-5.26-6-6.34l-3.66 6.34zm.26 1h-7.49l.29.5 4.76 8.25c1.64-1.78 2.64-4.14 2.64-6.75 0-.69-.07-1.35-.2-2zm-13.26 2-3.9-6.75c-1.63 1.78-2.64 4.14-2.64 6.75 0 .69.07 1.35.2 2h7.49zm-6.08 3c.92 2.92 3.15 5.26 6 6.34l3.66-6.34zm11.27 0-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m12.25.26-.08-.04-.01.02c-.7-.15-1.42-.24-2.16-.24-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10c0-4.75-3.31-8.72-7.75-9.74zm5.16 6.74h-7.99l2.71-4.7c2.4.66 4.35 2.42 5.28 4.7zm-6.31-4.92-2.83 4.92-1.15 2-2.72-4.7c1.44-1.42 3.42-2.3 5.6-2.3.37 0 .74.03 1.1.08zm-7.4 3.01 2.84 4.91 1.15 2h-5.43c-.16-.64-.26-1.31-.26-2 0-1.85.64-3.55 1.7-4.91zm-1.11 7.91h7.98l-2.71 4.7c-2.4-.67-4.34-2.42-5.27-4.7zm6.31 4.91 3.99-6.91 2.72 4.7c-1.45 1.42-3.43 2.3-5.61 2.3-.38 0-.74-.04-1.1-.09zm7.4-3-4-6.91h5.43c.17.64.27 1.31.27 2 0 1.85-.64 3.55-1.7 4.91z" /></svg>,
	},
	camera: {
		/* translators: icon label */
		label: __( 'Camera', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'aperture', 'coblocks' ),
			/* translators: icon keyword */
			__( 'camera', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'film', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photographer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photography', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photo', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m7 1-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18 3h-3.17l-1.83-2h-6l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 14h-16v-12h4.05l1.83-2h4.24l1.83 2h4.05zm-8-11c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" /></svg>,
	},
	gallery: {
		/* translators: icon label */
		label: __( 'Gallery', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'aperture', 'coblocks' ),
			/* translators: icon keyword */
			__( 'camera', 'coblocks' ),
			/* translators: icon keyword */
			__( 'collection', 'coblocks' ),
			/* translators: icon keyword */
			__( 'image', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photos', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photo', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m20 13.8587524v-11.87893062c0-1.08890198-.8909198-1.97982178-1.9798218-1.97982178h-11.87893064c-1.08890198 0-1.97982178.8909198-1.97982178 1.97982178v11.87893062c0 1.088902.8909198 1.9798218 1.97982178 1.9798218h11.87893064c1.088902 0 1.9798218-.8909198 1.9798218-1.9798218zm-10.88901978-3.95964351 2.00951908 2.68265851 2.9400354-3.6725694 3.9596435 4.9495544h-11.87893064zm-9.11098022-5.89910889v14.028125c0 1.088902.8909198 1.9798218 1.97982178 1.9798218l14.02017822-.0079468v-1.9798218l-14.02017822.0079468v-14.028125z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18 2v12h-12v-12zm0-2h-12c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-8.5 9.67 1.69 2.26 2.48-3.1 3.33 4.17h-10zm-9.5-5.67v14c0 1.1.9 2 2 2h14v-2h-14v-14z" /></svg>,
	},
	video: {
		/* translators: icon label */
		label: __( 'Video', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'director', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'producer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'videography', 'coblocks' ),
			/* translators: icon keyword */
			__( 'film', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><path d="m16 2 2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4h-1c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-14z" /><path d="m3.76 8h14.24v8h-16v-11.53zm16.24-6h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4h-1c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2z" fillRule="nonzero" /></g></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m3.76 8h14.24v8h-16v-11.53zm16.24-6h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4h-1c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2z" /></svg>,
	},
	film: {
		/* translators: icon label */
		label: __( 'Film', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'aperture', 'coblocks' ),
			/* translators: icon keyword */
			__( 'camera', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'director', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photographer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photography', 'coblocks' ),
			/* translators: icon keyword */
			__( 'producer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'videography', 'coblocks' ),
			/* translators: icon keyword */
			__( 'video', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.9047619 3.80952381c0-1.04761905-.8571429-1.90476191-1.9047619-1.90476191h-.95238095v-.95238095c0-.52380952-.42857143-.95238095-.95238095-.95238095h-3.80952381c-.52380953 0-.95238096.42857143-.95238096.95238095v.95238095h-.95238095c-1.04761905 0-1.9047619.85714286-1.9047619 1.90476191v14.28571429c0 1.047619.85714285 1.9047619 1.9047619 1.9047619h7.61904762c1.047619 0 1.9047619-.8571429 1.9047619-1.9047619h7.6190476v-14.28571429zm-1.9047619 12.38095239h-1.9047619v-1.9047619h1.9047619zm0-8.57142858h-1.9047619v-1.90476191h1.9047619zm3.8095238 8.57142858h-1.9047619v-1.9047619h1.9047619zm0-8.57142858h-1.9047619v-1.90476191h1.9047619zm3.8095238 8.57142858h-1.9047619v-1.9047619h1.9047619zm0-8.57142858h-1.9047619v-1.90476191h1.9047619z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.9047619 3.80952381c0-1.04761905-.8571429-1.90476191-1.9047619-1.90476191h-.95238095v-.95238095c0-.52380952-.42857143-.95238095-.95238095-.95238095h-3.80952381c-.52380953 0-.95238096.42857143-.95238096.95238095v.95238095h-.95238095c-1.04761905 0-1.9047619.85714286-1.9047619 1.90476191v14.28571429c0 1.047619.85714285 1.9047619 1.9047619 1.9047619h7.61904762c1.047619 0 1.9047619-.8571429 1.9047619-1.9047619h7.6190476v-14.28571429zm5.7142857 12.38095239h-7.6190476v1.9047619h-7.61904762v-14.28571429h2.85714286v-1.90476191h1.9047619v1.90476191h2.85714286v1.9047619h7.6190476zm-10.47619046-2.8571429h1.90476191v1.9047619h-1.90476191zm0-6.66666663h1.90476191v1.9047619h-1.90476191zm3.80952386 6.66666663h1.9047619v1.9047619h-1.9047619zm0-6.66666663h1.9047619v1.9047619h-1.9047619zm3.8095238 6.66666663h1.9047619v1.9047619h-1.9047619zm0-6.66666663h1.9047619v1.9047619h-1.9047619z" /></svg>,
	},
	color_lens: {
		/* translators: icon label */
		label: __( 'Color Lens', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'colors', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'design', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'paint', 'coblocks' ),
			/* translators: icon keyword */
			__( 'palette', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-5.52222222 0-10 4.47777778-10 10 0 5.5222222 4.47777778 10 10 10 .9222222 0 1.6666667-.7444444 1.6666667-1.6666667 0-.4333333-.1666667-.8222222-.4333334-1.1222222-.2555555-.2888889-.4222222-.6777778-.4222222-1.1 0-.9222222.7444445-1.6666667 1.6666667-1.6666667h1.9666666c3.0666667 0 5.5555556-2.4888888 5.5555556-5.55555551 0-4.91111111-4.4777778-8.88888889-10-8.88888889zm-6.11111111 10c-.92222222 0-1.66666667-.74444444-1.66666667-1.66666667 0-.92222222.74444445-1.66666666 1.66666667-1.66666666s1.66666667.74444444 1.66666667 1.66666666c0 .92222223-.74444445 1.66666667-1.66666667 1.66666667zm3.33333333-4.44444444c-.92222222 0-1.66666666-.74444445-1.66666666-1.66666667s.74444444-1.66666667 1.66666666-1.66666667 1.66666667.74444445 1.66666667 1.66666667-.74444445 1.66666667-1.66666667 1.66666667zm5.55555558 0c-.9222222 0-1.6666667-.74444445-1.6666667-1.66666667s.7444445-1.66666667 1.6666667-1.66666667 1.6666666.74444445 1.6666666 1.66666667-.7444444 1.66666667-1.6666666 1.66666667zm3.3333333 4.44444444c-.9222222 0-1.6666667-.74444444-1.6666667-1.66666667 0-.92222222.7444445-1.66666666 1.6666667-1.66666666s1.6666667.74444444 1.6666667 1.66666666c0 .92222223-.7444445 1.66666667-1.6666667 1.66666667z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fillRule="evenodd"><path d="m10 20c-5.51 0-10-4.49-10-10s4.49-10 10-10 10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5h1.77c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" fillRule="nonzero" /><circle cx="4.5" cy="9.5" r="1.5" /><circle cx="7.5" cy="5.5" r="1.5" /><circle cx="12.5" cy="5.5" r="1.5" /><circle cx="15.5" cy="9.5" r="1.5" /></g></svg>,
	},
	color_picker: {
		/* translators: icon label */
		label: __( 'Color Picker', 'coblocks' ),
		keywords: /* translators: tags. */ /* translators: icon label */ __( 'palette design colors artist paint creative media', 'coblocks' ),
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.6750451 2.92459381-2.5996389-2.59963894c-.4332732-.43327316-1.133176-.43327316-1.5664491 0l-3.4661853 3.46618525-2.14414661-2.12192751-1.5664491 1.5664491 1.57755867 1.57755868-9.90973476 9.90973471v5.2770449h5.27704485l9.90973475-9.9097348 1.5775587 1.5775587 1.5664491-1.5664491-2.1330371-2.13303707 3.4661853-3.46618525c.4443827-.44438273.4443827-1.14428552.0111095-1.57755867zm-15.3200944 14.85349259-2.13303708-2.1330371 8.95431188-8.9543119 2.1330371 2.13303708z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m16.2866269 2.68018331 1.0220802 1.02208026-2.9884738 2.98847383-1.0220803-1.02208027zm.0111095-2.67740592c-.2888487 0-.5665879.11109568-.7887793.32217748l-3.4661853 3.46618525-2.14414661-2.12192751-1.5664491 1.5664491 1.57755867 1.57755868-9.90973476 9.90973471v5.2770449h5.27704485l9.90973475-9.9097348 1.5775587 1.5775587 1.5664491-1.5664491-2.1330371-2.13303707 3.4661853-3.46618525c.4443827-.44438273.4443827-1.14428552.0111095-1.57755867l-2.5996389-2.59963894c-.2221914-.2110818-.4999306-.32217748-.7776698-.32217748zm-11.9427857 17.77530901-2.13303708-2.1330371 8.95431188-8.9543119 2.1330371 2.13303708z" /></svg>,
	},
	paint: {
		/* translators: icon label */
		label: __( 'Paint', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'colors', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'design', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'palette', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.4389323 2.01845703v-.99840495c0-.54912272-.4492822-.99840494-.998405-.99840494h-11.98085933c-.54912272 0-.99840495.44928222-.99840495.99840494v3.99361979c0 .54912273.44928223.99840495.99840495.99840495h11.98085933c.5491228 0 .998405-.44928222.998405-.99840495v-.99840494h.9984049v3.99361979h-9.98404944v10.98245438c0 .5491228.44928223.998405.99840495.998405h1.99680989c.54912273 0 .99840495-.4492822.99840495-.998405v-8.9856445h7.98723955v-7.98723957z" transform="translate(1)" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.4389323 2.01845703v-.99840495c0-.54912272-.4492822-.99840494-.998405-.99840494h-11.98085933c-.54912272 0-.99840495.44928222-.99840495.99840494v3.99361979c0 .54912273.44928223.99840495.99840495.99840495h11.98085933c.5491228 0 .998405-.44928222.998405-.99840495v-.99840494h.9984049v3.99361979h-9.98404944v10.98245438c0 .5491228.44928223.998405.99840495.998405h1.99680989c.54912273 0 .99840495-.4492822.99840495-.998405v-8.9856445h7.98723955v-7.98723957zm-1.9968099 1.9968099h-9.98404948v-1.9968099h9.98404948z" transform="translate(1)" /></svg>,
	},
	brush: {
		/* translators: icon label */
		label: __( 'Brush', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'colors', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'design', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'paint', 'coblocks' ),
			/* translators: icon keyword */
			__( 'paintbrush', 'coblocks' ),
			/* translators: icon keyword */
			__( 'palette', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m17.5215122.06508061c-.2732809 0-.5360511.10510805-.7462672.30481335l-9.41768139 9.41768143 2.89047139 2.89047141 9.4176815-9.41768142c.4099214-.4099214.4099214-1.07210213 0-1.48202353l-1.4084479-1.40844789c-.2102161-.2102161-.4729863-.30481335-.7357564-.30481335zm-12.26610962 11.56188569c-1.74479366 0-3.15324155 1.4084479-3.15324155 3.1532415 0 1.3769155-1.2192534 2.1021611-2.10216103 2.1021611.96699408 1.2823182 2.61719049 2.102161 4.20432206 2.102161 2.32288795 0 4.20432207-1.8814341 4.20432207-4.2043221 0-1.7447936-1.40844789-3.1532415-3.15324155-3.1532415z" transform="translate(0 .5)" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m5.25540258 13.7291273c.57809428 0 1.05108052.4729863 1.05108052 1.0510805 0 1.1561886-.94597247 2.1021611-2.10216104 2.1021611-.17868368 0-.34685657-.0210216-.52554025-.0525541.32583496-.5780942.52554025-1.2718074.52554025-2.049607 0-.5780942.47298624-1.0510805 1.05108052-1.0510805zm12.26610962-13.66404669c-.2732809 0-.5360511.10510805-.7462672.30481335l-9.41768139 9.41768143 2.89047139 2.89047141 9.4176815-9.41768142c.4099214-.4099214.4099214-1.07210213 0-1.48202353l-1.4084479-1.40844789c-.2102161-.2102161-.4729863-.30481335-.7357564-.30481335zm-12.26610962 11.56188569c-1.74479366 0-3.15324155 1.4084479-3.15324155 3.1532415 0 1.3769155-1.2192534 2.1021611-2.10216103 2.1021611.96699408 1.2823182 2.61719049 2.102161 4.20432206 2.102161 2.32288795 0 4.20432207-1.8814341 4.20432207-4.2043221 0-1.7447936-1.40844789-3.1532415-3.15324155-3.1532415z" transform="translate(0 .5)" /></svg>,
	},
	circle_add: {
		/* translators: icon label */
		label: __( 'Add Circle', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'add', 'coblocks' ),
			/* translators: icon keyword */
			__( 'circle', 'coblocks' ),
			/* translators: icon keyword */
			__( 'insert', 'coblocks' ),
			/* translators: icon keyword */
			__( 'math', 'coblocks' ),
			/* translators: icon keyword */
			__( 'minus', 'coblocks' ),
			/* translators: icon keyword */
			__( 'plus', 'coblocks' ),
			/* translators: icon keyword */
			__( 'round', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm5 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11 5h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-1-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>,
	},
	circle_remove: {
		/* translators: icon label */
		label: __( 'Minus Circle', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'add', 'coblocks' ),
			/* translators: icon keyword */
			__( 'circle', 'coblocks' ),
			/* translators: icon keyword */
			__( 'insert', 'coblocks' ),
			/* translators: icon keyword */
			__( 'math', 'coblocks' ),
			/* translators: icon keyword */
			__( 'minus', 'coblocks' ),
			/* translators: icon keyword */
			__( 'plus', 'coblocks' ),
			/* translators: icon keyword */
			__( 'round', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm5 11h-10v-2h10z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m5 9v2h10v-2zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>,
	},
	data_usage: {
		/* translators: icon label */
		label: __( 'Pie Chart', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'chart', 'coblocks' ),
			/* translators: icon keyword */
			__( 'circle', 'coblocks' ),
			/* translators: icon keyword */
			__( 'graph', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pie', 'coblocks' ),
			/* translators: icon keyword */
			__( 'round', 'coblocks' ),
			/* translators: icon keyword */
			__( 'stats', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11 0v3.03759398c3.39.49122808 6 3.39849625 6 6.93734336 0 .90225566-.18 1.75438596-.48 2.54636596l2.6 1.5338345c.56-1.2431077.88-2.6265664.88-4.08020046 0-5.19298245-3.95-9.47368421-9-9.97493734zm-1 16.9924812c-3.87 0-7-3.1378446-7-7.01754386 0-3.53884711 2.61-6.44611528 6-6.93734336v-3.03759398c-5.06.50125313-9 4.77192982-9 9.97493734 0 5.53383456 4.47 10.02506266 9.99 10.02506266 3.31 0 6.24-1.6140351 8.06-4.1002506l-2.6-1.5338346c-1.28 1.60401-3.24 2.6265664-5.45 2.6265664z" /></svg>,
	},
	scatter_plot: {
		/* translators: icon label */
		label: __( 'Scatter Plot', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'chart', 'coblocks' ),
			/* translators: icon keyword */
			__( 'circle', 'coblocks' ),
			/* translators: icon keyword */
			__( 'data', 'coblocks' ),
			/* translators: icon keyword */
			__( 'dots', 'coblocks' ),
			/* translators: icon keyword */
			__( 'graph', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pie', 'coblocks' ),
			/* translators: icon keyword */
			__( 'round', 'coblocks' ),
			/* translators: icon keyword */
			__( 'stats', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m4.08163265 16.3265306c-2.25510204 0-4.08163265-1.8265306-4.08163265-4.0816326 0-2.25510208 1.82653061-4.08163269 4.08163265-4.08163269s4.08163266 1.82653061 4.08163266 4.08163269c0 2.255102-1.82653062 4.0816326-4.08163266 4.0816326zm7.08163265-8.16326529c-2.25510203 0-4.08163265-1.82653062-4.08163265-4.08163266s1.82653062-4.08163265 4.08163265-4.08163265c2.255102 0 4.0816327 1.82653061 4.0816327 4.08163265s-1.8265307 4.08163266-4.0816327 4.08163266zm4.7142857 11.83673469c-2.255102 0-4.0816326-1.8265306-4.0816326-4.0816327 0-2.255102 1.8265306-4.0816326 4.0816326-4.0816326 2.2551021 0 4.0816327 1.8265306 4.0816327 4.0816326 0 2.2551021-1.8265306 4.0816327-4.0816327 4.0816327z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m4.08163265 16.3265306c-2.25510204 0-4.08163265-1.8265306-4.08163265-4.0816326 0-2.25510208 1.82653061-4.08163269 4.08163265-4.08163269s4.08163266 1.82653061 4.08163266 4.08163269c0 2.255102-1.82653062 4.0816326-4.08163266 4.0816326zm0-6.122449c-1.12244898 0-2.04081632.9183674-2.04081632 2.0408164 0 1.1224489.91836734 2.0408163 2.04081632 2.0408163s2.04081633-.9183674 2.04081633-2.0408163c0-1.122449-.91836735-2.0408164-2.04081633-2.0408164zm7.08163265-2.04081629c-2.25510203 0-4.08163265-1.82653062-4.08163265-4.08163266s1.82653062-4.08163265 4.08163265-4.08163265c2.255102 0 4.0816327 1.82653061 4.0816327 4.08163265s-1.8265307 4.08163266-4.0816327 4.08163266zm0-6.12244898c-1.122449 0-2.04081632.91836734-2.04081632 2.04081632s.91836732 2.04081633 2.04081632 2.04081633 2.0408163-.91836735 2.0408163-2.04081633-.9183673-2.04081632-2.0408163-2.04081632zm4.7142857 17.95918367c-2.255102 0-4.0816326-1.8265306-4.0816326-4.0816327 0-2.255102 1.8265306-4.0816326 4.0816326-4.0816326 2.2551021 0 4.0816327 1.8265306 4.0816327 4.0816326 0 2.2551021-1.8265306 4.0816327-4.0816327 4.0816327zm0-6.122449c-1.122449 0-2.0408163.9183674-2.0408163 2.0408163 0 1.122449.9183673 2.0408164 2.0408163 2.0408164s2.0408163-.9183674 2.0408163-2.0408164c0-1.1224489-.9183673-2.0408163-2.0408163-2.0408163z" /></svg>,
	},
	poll: {
		/* translators: icon label */
		label: __( 'Poll', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'chart', 'coblocks' ),
			/* translators: icon keyword */
			__( 'data', 'coblocks' ),
			/* translators: icon keyword */
			__( 'graph', 'coblocks' ),
			/* translators: icon keyword */
			__( 'graph', 'coblocks' ),
			/* translators: icon keyword */
			__( 'stats', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.5806749.77408854h-15.55555554c-1.22222222 0-2.22222222 1-2.22222222 2.22222222v15.55555554c0 1.2222222 1 2.2222222 2.22222222 2.2222222h15.55555554c1.2222222 0 2.2222222-1 2.2222222-2.2222222v-15.55555554c0-1.22222222-1-2.22222222-2.2222222-2.22222222zm-11.1111111 15.55555556h-2.22222222v-7.77777778h2.22222222zm4.4444444 0h-2.22222218v-11.11111111h2.22222218zm4.4444445 0h-2.2222222v-4.4444444h2.2222222z" transform="translate(-.802897 -.774089)" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m17.7777778 0h-15.55555558c-1.22222222 0-2.22222222 1-2.22222222 2.22222222v15.55555558c0 1.2222222 1 2.2222222 2.22222222 2.2222222h15.55555558c1.2222222 0 2.2222222-1 2.2222222-2.2222222v-15.55555558c0-1.22222222-1-2.22222222-2.2222222-2.22222222zm0 17.7777778h-15.55555558v-15.55555558h15.55555558zm-13.33333336-10.00000002h2.22222223v7.77777782h-2.22222223zm4.44444445-3.33333334h2.22222221v11.11111116h-2.22222221zm4.44444441 6.66666666h2.2222223v4.4444445h-2.2222223z" /></svg>,
	},
	emoticon: {
		/* translators: icon label */
		label: __( 'Emoticon', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'emoticon', 'coblocks' ),
			/* translators: icon keyword */
			__( 'emotion', 'coblocks' ),
			/* translators: icon keyword */
			__( 'fun', 'coblocks' ),
			/* translators: icon keyword */
			__( 'happy', 'coblocks' ),
			/* translators: icon keyword */
			__( 'joy', 'coblocks' ),
			/* translators: icon keyword */
			__( 'smile', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.99 0c5.53 0 10.01 4.48 10.01 10s-4.48 10-10.01 10c-5.52 0-9.99-4.48-9.99-10s4.47-10 9.99-10zm3.51 9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5h-10.22c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.99 0c-5.52 0-9.99 4.48-9.99 10s4.47 10 9.99 10c5.53 0 10.01-4.48 10.01-10s-4.48-10-10.01-10zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5h-10.22c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>,
	},
	functions: {
		/* translators: icon label */
		label: __( 'Functions', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'code', 'coblocks' ),
			/* translators: icon keyword */
			__( 'greek', 'coblocks' ),
			/* translators: icon keyword */
			__( 'math', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m17.9645996 0h-15.99999999v2.5l8.12499999 7.5-8.12499999 7.5v2.5h15.99999999v-3.75h-9.74999999l6.24999999-6.25-6.24999999-6.25h9.74999999z" fillRule="evenodd" /></svg>,
	},
	gesture: {
		/* translators: icon label */
		label: __( 'Doodle', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'art', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'doodle', 'coblocks' ),
			/* translators: icon keyword */
			__( 'drawing', 'coblocks' ),
			/* translators: icon keyword */
			__( 'font', 'coblocks' ),
			/* translators: icon keyword */
			__( 'marker', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pencil', 'coblocks' ),
			/* translators: icon keyword */
			__( 'type', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m1.92731278 4.32703003c.77092511-.7897664 1.54185022-1.50166852 1.88325991-1.3570634.55066079.22246941 0 1.14571746-.33039648 1.69076752-.2753304.46718576-3.14977973 4.32703003-3.14977973 7.01890985 0 1.4238043.52863436 2.6028922 1.47577092 3.3147943.82599119.6229143 1.91629956.8120133 2.90748899.5116796 1.17841409-.3448276 2.14757709-1.5572859 3.37004405-3.0812013 1.33259912-1.6573971 3.11674006-3.82647389 4.49339206-3.82647389 1.7951542 0 1.8171806 1.12347053 1.938326 1.99110119-4.1629956.7119022-5.92511013 4.0823137-5.92511013 5.9733037s1.58590313 3.4371524 3.53524233 3.4371524c1.7951541 0 4.7246696-1.4794216 5.1651982-6.785317h2.7092511v-2.7808676h-2.7202643c-.1651983-1.83537269-1.2004405-4.67185767-4.438326-4.67185767-2.4779736 0-4.60352424 2.12458287-5.44052864 3.15906563-.63876652.81201335-2.26872247 2.75862064-2.52202643 3.02558394-.2753304.3337042-.74889868.9343716-1.22246696.9343716-.49559472 0-.79295155-.9232481-.39647578-2.1357064.38546256-1.21245826 1.54185022-3.18131254 2.03744494-3.9154616.85903084-1.26807564 1.43171806-2.13570634 1.43171806-3.64849833 0-2.4137931-1.8061674-3.18131257-2.76431718-3.18131257-1.45374449 0-2.72026432 1.11234705-2.99559471 1.39043382-.39647577.40044493-.72687225.73414905-.969163 1.03448275zm10.23127752 12.96996667c-.3414097 0-.814978-.2892103-.814978-.8008899 0-.6674082.8039648-2.4471635 3.160793-3.0700779-.3303965 2.9922136-1.5748899 3.8709678-2.345815 3.8709678z" /></svg>,
	},
	font: {
		/* translators: icon label */
		label: __( 'Font', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'font', 'coblocks' ),
			/* translators: icon keyword */
			__( 'text', 'coblocks' ),
			/* translators: icon keyword */
			__( 'typography', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m7.93 11.5h4.14l-2.07-5.52zm10.07-11.5h-16c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-4.05 16.5-1.14-3h-5.64l-1.12 3h-2.09l5.11-13h1.86l5.11 13z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m7.17 13.5h5.64l1.14 3h2.09l-5.11-13h-1.86l-5.11 13h2.09zm2.83-7.52 2.07 5.52h-4.14zm8-5.98h-16c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm0 18h-16v-16h16z" /></svg>,
	},
	heart: {
		/* translators: icon label */
		label: __( 'Heart', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'kiss', 'coblocks' ),
			/* translators: icon keyword */
			__( 'love', 'coblocks' ),
			/* translators: icon keyword */
			__( 'shape', 'coblocks' ),
			/* translators: icon keyword */
			__( 'valentine', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 20-1.45-1.4386921c-5.15-5.0899183-8.55-8.4468665-8.55-12.56675749 0-3.35694823 2.42-5.99455041 5.5-5.99455041 1.74 0 3.41.88283379 4.5 2.27792916 1.09-1.39509537 2.76-2.27792916 4.5-2.27792916 3.08 0 5.5 2.63760218 5.5 5.99455041 0 4.11989099-3.4 7.47683919-8.55 12.57765669" fillRule="evenodd" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.5 0c-1.74 0-3.41.88283379-4.5 2.27792916-1.09-1.39509537-2.76-2.27792916-4.5-2.27792916-3.08 0-5.5 2.63760218-5.5 5.99455041 0 4.11989099 3.4 7.47683919 8.55 12.57765669l1.45 1.4277929 1.45-1.4386921c5.15-5.0899183 8.55-8.4468665 8.55-12.56675749 0-3.35694823-2.42-5.99455041-5.5-5.99455041zm-4.4 16.9482289-.1.1089918-.1-.1089918c-4.76-4.6975477-7.9-7.80381473-7.9-10.95367849 0-2.17983651 1.5-3.8147139 3.5-3.8147139 1.54 0 3.04 1.07901908 3.57 2.57220709h1.87c.52-1.49318801 2.02-2.57220709 3.56-2.57220709 2 0 3.5 1.63487739 3.5 3.8147139 0 3.14986376-3.14 6.25613079-7.9 10.95367849z" /></svg>,
	},
	star: {
		/* translators: icon label */
		label: __( 'Star', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'favorite', 'coblocks' ),
			/* translators: icon keyword */
			__( 'like', 'coblocks' ),
			/* translators: icon keyword */
			__( 'plus', 'coblocks' ),
			/* translators: icon keyword */
			__( 'rate', 'coblocks' ),
			/* translators: icon keyword */
			__( 'vote', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.0268555.55859375-2.81000003 6.63-7.19.61 5.46 4.72999995-1.64 7.03 6.18000003-3.73 6.18 3.73-1.64-7.03 5.46-4.72999995-7.19-.61z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.0268555 5.68859375.97 2.29.47 1.11 1.2.1 2.47.21-1.88 1.62999995-.91.79.27 1.18.56 2.41-2.12-1.28-1.03-.64-1.03000003.62-2.12 1.28.56-2.41.27-1.18-.91-.79-1.88-1.62999995 2.47-.21 1.2-.1.47-1.11zm0-5.13-2.81000003 6.63-7.19.61 5.46 4.72999995-1.64 7.03 6.18000003-3.73 6.18 3.73-1.64-7.03 5.46-4.72999995-7.19-.61z" /></svg>,
	},
	desktop_mac: {
		/* translators: icon label */
		label: __( 'Desktop', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'apple', 'coblocks' ),
			/* translators: icon keyword */
			__( 'computer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'desk', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'monitor', 'coblocks' ),
			/* translators: icon keyword */
			__( 'office', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pc', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.1818182 0h-16.36363638c-1 0-1.81818182.81818182-1.81818182 1.81818182v12.90909088c0 1 .81818182 1.8181818 1.81818182 1.8181818h6.36363636l-1.81818182 2.7272728v.9090909h7.27272724v-.9090909l-1.8181818-2.7272728h6.3636364c1 0 1.8181818-.8181818 1.8181818-1.8181818v-12.90909088c0-1-.8181818-1.81818182-1.8181818-1.81818182z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.1818182 0h-16.36363638c-1 0-1.81818182.81818182-1.81818182 1.81818182v12.90909088c0 1 .81818182 1.8181818 1.81818182 1.8181818h6.36363636l-1.81818182 2.7272728v.9090909h7.27272724v-.9090909l-1.8181818-2.7272728h6.3636364c1 0 1.8181818-.8181818 1.8181818-1.8181818v-12.90909088c0-1-.8181818-1.81818182-1.8181818-1.81818182zm0 12.9090909h-16.36363638v-11.09090908h16.36363638z" /></svg>,
	},
	devices: {
		/* translators: icon label */
		label: __( 'Devices', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'apple', 'coblocks' ),
			/* translators: icon keyword */
			__( 'computer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'desk', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ipad', 'coblocks' ),
			/* translators: icon keyword */
			__( 'office', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pc', 'coblocks' ),
			/* translators: icon keyword */
			__( 'surface', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="m0 0h20v20h-20z" /><path d="m3.33333333 5h14.99999997v-1.66666667h-14.99999997c-.91666666 0-1.66666666.75-1.66666666 1.66666667v9.1666667h-1.66666667v2.5h11.6666667v-2.5h-8.33333337zm15.83333337 1.66666667h-5c-.4583334 0-.8333334.375-.8333334.83333333v8.3333333c0 .4583334.375.8333334.8333334.8333334h5c.4583333 0 .8333333-.375.8333333-.8333334v-8.3333333c0-.45833333-.375-.83333333-.8333333-.83333333zm-.8333334 7.50000003h-3.3333333v-5.83333337h3.3333333z" fill="currentColor" fillRule="nonzero" /></g></svg>,
	},
	laptop_mac: {
		/* translators: icon label */
		label: __( 'Laptop', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'apple', 'coblocks' ),
			/* translators: icon keyword */
			__( 'computer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'desk', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'monitor', 'coblocks' ),
			/* translators: icon keyword */
			__( 'office', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pc', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m16.6666667 15c.9166666 0 1.6583333-.75 1.6583333-1.6666667l.0083333-9.16666663c0-.91666667-.75-1.66666667-1.6666666-1.66666667h-13.33333337c-.91666666 0-1.66666666.75-1.66666666 1.66666667v9.16666663c0 .9166667.75 1.6666667 1.66666666 1.6666667h-3.33333333c0 .9166667.75 1.6666667 1.66666667 1.6666667h16.66666663c.9166667 0 1.6666667-.75 1.6666667-1.6666667zm-13.33333337-10.83333333h13.33333337v9.16666663h-13.33333337zm6.66666667 11.66666663c-.45833333 0-.83333333-.375-.83333333-.8333333s.375-.8333333.83333333-.8333333c.4583333 0 .8333333.375.8333333.8333333s-.375.8333333-.8333333.8333333z" /></svg>,
	},
	tablet_mac: {
		/* translators: icon label */
		label: __( 'Tablet', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'apple', 'coblocks' ),
			/* translators: icon keyword */
			__( 'computer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'desk', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ipad', 'coblocks' ),
			/* translators: icon keyword */
			__( 'monitor', 'coblocks' ),
			/* translators: icon keyword */
			__( 'office', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pc', 'coblocks' ),
			/* translators: icon keyword */
			__( 'surface', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333333 0h-11.66666663c-1.15 0-2.08333334.93333333-2.08333334 2.08333333v15.83333337c0 1.15.93333334 2.0833333 2.08333334 2.0833333h11.66666663c1.15 0 2.0833334-.9333333 2.0833334-2.0833333v-15.83333337c0-1.15-.9333334-2.08333333-2.0833334-2.08333333zm-5.8333333 19.1666667c-.69166667 0-1.25-.5583334-1.25-1.25 0-.6916667.55833333-1.25 1.25-1.25.6916667 0 1.25.5583333 1.25 1.25 0 .6916666-.5583333 1.25-1.25 1.25zm6.25-3.3333334h-12.5v-13.3333333h12.5z" /></svg>,
	},
	watch: {
		/* translators: icon label */
		label: __( 'Watch', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'apple', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'mac', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="nonzero"><path d="m16.6666667 10c0-2.11666667-.9916667-4.00833333-2.5333334-5.225l-.8-4.775h-6.66666663l-.79166667 4.775c-1.55 1.21666667-2.54166667 3.1-2.54166667 5.225s.99166667 4.0083333 2.54166667 5.225l.79166667 4.775h6.66666663l.8-4.775c1.5416667-1.2166667 2.5333334-3.1083333 2.5333334-5.225zm-11.6666667 0c0-2.75833333 2.24166667-5 5-5 2.7583333 0 5 2.24166667 5 5 0 2.7583333-2.2416667 5-5 5-2.75833333 0-5-2.2416667-5-5z" /><path d="m11.925 1.66666667.3416667 2.06666666c-.7083334-.25833333-1.4666667-.4-2.2666667-.4-.79166667 0-1.55833333.14166667-2.25833333.39166667l.34166666-2.05833333zm.3416667 14.60000003-.3416667 2.0666666h-3.84166667l-.34166666-2.0583333c.7.25 1.46666666.3916667 2.25833333.3916667.8 0 1.5583333-.1416667 2.2666667-.4zm1.0666666-16.2666667h-6.66666663l-.79166667 4.775c-1.55 1.21666667-2.54166667 3.1-2.54166667 5.225s.99166667 4.0083333 2.54166667 5.225l.79166667 4.775h6.66666663l.8-4.775c1.5416667-1.2166667 2.5333334-3.1083333 2.5333334-5.225 0-2.11666667-.9916667-4.00833333-2.5333334-5.225zm-3.3333333 15c-2.75833333 0-5-2.2416667-5-5 0-2.75833333 2.24166667-5 5-5 2.7583333 0 5 2.24166667 5 5 0 2.7583333-2.2416667 5-5 5z" /></g></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.925 1.66666667.3416667 2.06666666c-.7083334-.25833333-1.4666667-.4-2.2666667-.4-.79166667 0-1.55833333.14166667-2.25833333.39166667l.34166666-2.05833333zm.3416667 14.60000003-.3416667 2.0666666h-3.84166667l-.34166666-2.0583333c.7.25 1.46666666.3916667 2.25833333.3916667.8 0 1.5583333-.1416667 2.2666667-.4zm1.0666666-16.2666667h-6.66666663l-.79166667 4.775c-1.55 1.21666667-2.54166667 3.1-2.54166667 5.225s.99166667 4.0083333 2.54166667 5.225l.79166667 4.775h6.66666663l.8-4.775c1.5416667-1.2166667 2.5333334-3.1083333 2.5333334-5.225 0-2.11666667-.9916667-4.00833333-2.5333334-5.225zm-3.3333333 15c-2.75833333 0-5-2.2416667-5-5 0-2.75833333 2.24166667-5 5-5 2.7583333 0 5 2.24166667 5 5 0 2.7583333-2.2416667 5-5 5z" /></svg>,
	},
	keyboard: {
		/* translators: icon label */
		label: __( 'Keyboard', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'apple', 'coblocks' ),
			/* translators: icon keyword */
			__( 'computer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'desk', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ipad', 'coblocks' ),
			/* translators: icon keyword */
			__( 'office', 'coblocks' ),
			/* translators: icon keyword */
			__( 'pc', 'coblocks' ),
			/* translators: icon keyword */
			__( 'surface', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18 0h-16c-1.1 0-1.99.9-1.99 2l-.01 10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-9 3h2v2h-2zm0 3h2v2h-2zm-3-3h2v2h-2zm0 3h2v2h-2zm-1 2h-2v-2h2zm0-3h-2v-2h2zm9 7h-8v-2h8zm0-4h-2v-2h2zm0-3h-2v-2h2zm3 3h-2v-2h2zm0-3h-2v-2h2z" transform="translate(0 3)" /></svg>,
	},
	device_hub: {
		/* translators: icon label */
		label: __( 'Hub', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'connect', 'coblocks' ),
			/* translators: icon keyword */
			__( 'device', 'coblocks' ),
			/* translators: icon keyword */
			__( 'hub', 'coblocks' ),
			/* translators: icon keyword */
			__( 'social', 'coblocks' ),
			/* translators: icon keyword */
			__( 'usb', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15.5555556 14.4444444-4.4444445-4.4444444v-3.53333333c1.2888889-.46666667 2.2222222-1.68888889 2.2222222-3.13333334 0-1.84444444-1.4888889-3.33333333-3.3333333-3.33333333-1.84444444 0-3.33333333 1.48888889-3.33333333 3.33333333 0 1.44444445.93333333 2.66666667 2.22222222 3.13333334v3.53333333l-4.44444445 4.4444444h-4.44444444v5.5555556h5.55555556v-3.3888889l4.44444444-4.6666667 4.4444444 4.6666667v3.3888889h5.5555556v-5.5555556z" fillRule="evenodd" /></svg>,
	},
	drafts: {
		/* translators: icon label */
		label: __( 'Email', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'email', 'coblocks' ),
			/* translators: icon keyword */
			__( 'letter', 'coblocks' ),
			/* translators: icon keyword */
			__( 'mail', 'coblocks' ),
			/* translators: icon keyword */
			__( 'os', 'coblocks' ),
			/* translators: icon keyword */
			__( 'read', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.99 7c0-.72-.37-1.35-.94-1.7l-9.05-5.3-9.05 5.3c-.57.35-.95.98-.95 1.7v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-9.99 5-8.26-5.16 8.26-4.84 8.26 4.84z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.99 7c0-.72-.37-1.35-.94-1.7l-9.05-5.3-9.05 5.3c-.57.35-.95.98-.95 1.7v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0v.01l-7.99 4.99-8-5 8-4.68zm-15.99 11v-8.66l8 5.02 7.99-4.99.01 8.63z" /></svg>,
	},
	email: {
		/* translators: icon label */
		label: __( 'Email', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'email', 'coblocks' ),
			/* translators: icon keyword */
			__( 'letter', 'coblocks' ),
			/* translators: icon keyword */
			__( 'mail', 'coblocks' ),
			/* translators: icon keyword */
			__( 'os', 'coblocks' ),
			/* translators: icon keyword */
			__( 'read', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg>,
	},
	reply_all: {
		/* translators: icon label */
		label: __( 'Reply', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'comment', 'coblocks' ),
			/* translators: icon keyword */
			__( 'email', 'coblocks' ),
			/* translators: icon keyword */
			__( 'mail', 'coblocks' ),
			/* translators: icon keyword */
			__( 'message', 'coblocks' ),
			/* translators: icon keyword */
			__( 'reply', 'coblocks' ),
			/* translators: icon keyword */
			__( 'respond', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m5.83333333 6.66666667v-2.5l-5.83333333 5.83333333 5.83333333 5.8333333v-2.5l-3.33333333-3.3333333zm4.99999997.83333333v-3.33333333l-5.8333333 5.83333333 5.8333333 5.8333333v-3.4166666c4.1666667 0 7.0833334 1.3333333 9.1666667 4.25-.8333333-4.1666667-3.3333333-8.33333337-9.1666667-9.1666667z" /></svg>,
	},
	send: {
		/* translators: icon label */
		label: __( 'Send', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'deliver', 'coblocks' ),
			/* translators: icon keyword */
			__( 'email', 'coblocks' ),
			/* translators: icon keyword */
			__( 'mail', 'coblocks' ),
			/* translators: icon keyword */
			__( 'send', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><path d="m.00952381 18.5714286 19.99047619-8.5714286-19.99047619-8.57142857-.00952381 6.66666667 14.2857143 1.9047619-14.2857143 1.9047619z" /><path d="m1.91428571 4.31428571 7.15238096 3.06666667-7.16190477-.95238095zm7.14285715 8.30476189-7.15238096 3.0666667v-2.1142857zm-9.04761905-11.19047617-.00952381 6.66666667 14.2857143 1.9047619-14.2857143 1.9047619.00952381 6.6666667 19.99047619-8.5714286z" fillRule="nonzero" /></g></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m1.91428571 4.31428571 7.15238096 3.06666667-7.16190477-.95238095zm7.14285715 8.30476189-7.15238096 3.0666667v-2.1142857zm-9.04761905-11.19047617-.00952381 6.66666667 14.2857143 1.9047619-14.2857143 1.9047619.00952381 6.6666667 19.99047619-8.5714286z" /></svg>,
	},
	signal: {
		/* translators: icon label */
		label: __( 'Signal', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'radio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'waves', 'coblocks' ),
			/* translators: icon keyword */
			__( 'wifi', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 8.675c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19zm-6-10c-5.52 0-10 4.48-10 10 0 3.7 2.01 6.92 4.99 8.65l1-1.73c-2.38-1.39-3.99-3.96-3.99-6.92 0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.96-1.61 5.53-4 6.92l1 1.73c2.99-1.73 5-4.95 5-8.65 0-5.52-4.48-10-10-10z" /></svg>,
	},
	blocks: {
		/* translators: icon label */
		label: __( 'Blocks', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'block', 'coblocks' ),
			/* translators: icon keyword */
			__( 'blocks', 'coblocks' ),
			/* translators: icon keyword */
			__( 'box', 'coblocks' ),
			/* translators: icon keyword */
			__( 'boxes', 'coblocks' ),
			/* translators: icon keyword */
			__( 'build', 'coblocks' ),
			/* translators: icon keyword */
			__( 'square', 'coblocks' ),
			/* translators: icon keyword */
			__( 'widgets', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.3519669 11.7141378v8.2858622h8.2815735v-8.2858622zm-10.3519669 8.2858622h8.2815735v-8.2858622h-8.2815735zm0-18.64319006v8.28586225h8.2815735v-8.28586225zm14.1407867-1.35680994-5.8592132 5.85189021 5.8592132 5.86224759 5.8592133-5.86224759z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.1407867 2.93112377 2.9296067 2.93112377-2.9296067 2.93112377-2.9296066-2.93112377zm-7.92960658.49715173v4.14293113h-4.14078675v-4.14293113zm10.35196688 10.3573278v4.1429311h-4.1407868v-4.1429311zm-10.35196688 0v4.1429311h-4.14078675v-4.1429311zm7.92960658-13.7856033-5.8592132 5.85189021 5.8592132 5.86224759 5.8592133-5.86224759zm-5.8592132 1.35680994h-8.2815735v8.28586225h8.2815735zm10.3519669 10.35732786h-8.2815735v8.2858622h8.2815735zm-10.3519669 0h-8.2815735v8.2858622h8.2815735z" /></svg>,
	},
	marker: {
		/* translators: icon label */
		label: __( 'Marker', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'about', 'coblocks' ),
			/* translators: icon keyword */
			__( 'check', 'coblocks' ),
			/* translators: icon keyword */
			__( 'checkbox', 'coblocks' ),
			/* translators: icon keyword */
			__( 'directions', 'coblocks' ),
			/* translators: icon keyword */
			__( 'map', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c3.921743 0 7.114273 3.19253001 7.114273 7.11427301 0 4.95331259-6.1894175 11.86305029-6.4562027 12.15651399l-.6580703.729213-.65807025-.729213c-.26678524-.2934637-6.45620276-7.2032014-6.45620276-12.15651399 0-3.921743 3.19253001-7.11427301 7.11427301-7.11427301zm-1.36060471 9.04401956-1.56514007-1.5740329-1.26278345 1.26278346 2.82792352 2.82792348 5.34459761-5.34459756-1.2538906-1.26278346z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-3.921743 0-7.11427301 3.19253001-7.11427301 7.11427301 0 4.95331259 6.18941752 11.86305029 6.45620276 12.15651399l.65807025.729213.6580703-.729213c.2667852-.2934637 6.4562027-7.2032014 6.4562027-12.15651399 0-3.921743-3.19253-7.11427301-7.114273-7.11427301zm0 17.3143619c-1.9386394-2.3210315-5.33570476-7.0520231-5.33570476-10.20008889 0-2.94353046 2.3921743-5.33570476 5.33570476-5.33570476 2.9435305 0 5.3357048 2.3921743 5.3357048 5.33570476 0 3.40595819-3.7794576 8.32369939-5.3357048 10.20008889zm-1.36060471-8.27034234-1.56514007-1.5740329-1.26278345 1.26278346 2.82792352 2.82792348 5.34459761-5.34459756-1.2538906-1.26278346z" /></svg>,
	},
	mountains: {
		/* translators: icon label */
		label: __( 'Mountains', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'hills', 'coblocks' ),
			/* translators: icon keyword */
			__( 'landscape', 'coblocks' ),
			/* translators: icon keyword */
			__( 'minimal', 'coblocks' ),
			/* translators: icon keyword */
			__( 'outdoors', 'coblocks' ),
			/* translators: icon keyword */
			__( 'outside', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.8181818 4.54545455-3.40909089 4.54545454 2.59090909 3.45454541-1.45454545 1.0909091c-1.53636364-2.0454545-4.0909091-5.45454542-4.0909091-5.45454542l-5.45454545 7.27272732h20z" fillRule="evenodd" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.8181818 4.54545455-3.83636362 5.11818181 1.13636364 1.51818184 2.69999998-3.60909093 4.5454546 6.06363633h-7.69090913l-3.64545454-4.88181815-5.02727273 6.70000005h20zm-8.18181816 9.09090905 1.38181818-1.8454545 1.38181818 1.8454545z" /></svg>,
	},
	waves: {
		/* translators: icon label */
		label: __( 'Waves', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'fun', 'coblocks' ),
			/* translators: icon keyword */
			__( 'minimal', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ocean', 'coblocks' ),
			/* translators: icon keyword */
			__( 'outdoors', 'coblocks' ),
			/* translators: icon keyword */
			__( 'outside', 'coblocks' ),
			/* translators: icon keyword */
			__( 'summer', 'coblocks' ),
			/* translators: icon keyword */
			__( 'water', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15 16.6594678c-1.35 0-2.2.42-2.95.8-.65.33-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.42 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.42 2.95-.8c.65-.33 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm0-5.604419c-1.35 0-2.2.43-2.95.8-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.32-1.17.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm2.95-10.2550488c-.75-.38-1.58-.8-2.95-.8s-2.2.42-2.95.8c-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.37-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.93c1.35 0 2.2-.43 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.58zm-2.95 4.65062988c-1.35 0-2.2.43-2.95.8-.65.35-1.15.6-2.05.6s-1.4-.25-2.05-.6c-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.35-1.15.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.32 1.18-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8z" /></svg>,
	},
	globe: {
		/* translators: icon label */
		label: __( 'Globe', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'earth', 'coblocks' ),
			/* translators: icon keyword */
			__( 'global', 'coblocks' ),
			/* translators: icon keyword */
			__( 'location', 'coblocks' ),
			/* translators: icon keyword */
			__( 'map', 'coblocks' ),
			/* translators: icon keyword */
			__( 'public', 'coblocks' ),
			/* translators: icon keyword */
			__( 'world', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-8 10c0-.61.08-1.21.21-1.78l4.78 4.78v1c0 1.1.9 2 2 2v1.93c-3.93-.5-6.99-3.86-6.99-7.93zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-.41c2.93 1.18 5.01 4.06 5.01 7.41 0 2.08-.81 3.98-2.11 5.4z" /></svg>,
	},
	city: {
		/* translators: icon label */
		label: __( 'City', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'building', 'coblocks' ),
			/* translators: icon keyword */
			__( 'business', 'coblocks' ),
			/* translators: icon keyword */
			__( 'corporation', 'coblocks' ),
			/* translators: icon keyword */
			__( 'location', 'coblocks' ),
			/* translators: icon keyword */
			__( 'map', 'coblocks' ),
			/* translators: icon keyword */
			__( 'public', 'coblocks' ),
			/* translators: icon keyword */
			__( 'skyscraper', 'coblocks' ),
			/* translators: icon keyword */
			__( 'town', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m13.1578947 9.47368421v-6.31578947l-3.1578947-3.15789474-3.15789474 3.15789474v2.10526315h-6.31578947v14.73684211h18.94736841v-10.52631579zm-8.42105259 8.42105259h-2.10526316v-2.1052631h2.10526316zm0-4.2105263h-2.10526316v-2.1052631h2.10526316zm0-4.21052629h-2.10526316v-2.10526316h2.10526316zm6.31578949 8.42105259h-2.10526318v-2.1052631h2.10526318zm0-4.2105263h-2.10526318v-2.1052631h2.10526318zm0-4.21052629h-2.10526318v-2.10526316h2.10526318zm0-4.21052632h-2.10526318v-2.10526315h2.10526318zm6.3157895 12.63157891h-2.1052632v-2.1052631h2.1052632zm0-4.2105263h-2.1052632v-2.1052631h2.1052632z" /></svg>,
	},
	dining: {
		/* translators: icon label */
		label: __( 'Dining', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'drink', 'coblocks' ),
			/* translators: icon keyword */
			__( 'food', 'coblocks' ),
			/* translators: icon keyword */
			__( 'fork', 'coblocks' ),
			/* translators: icon keyword */
			__( 'menu', 'coblocks' ),
			/* translators: icon keyword */
			__( 'restaurant', 'coblocks' ),
			/* translators: icon keyword */
			__( 'spoon', 'coblocks' ),
			/* translators: icon keyword */
			__( 'taste', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m5.6064238 11.1802028 2.96010809-2.96010811-7.34274162-7.33228187c-1.63172036 1.63172036-1.63172036 4.27803607 0 5.92021617zm7.0917077-1.89321403c1.6003411.74264193 3.8491865.21965466 5.5122861-1.44344493 1.9978115-1.99781147 2.3848221-4.86378185.8472394-6.40136449-1.5271229-1.5271229-4.3930933-1.15057205-6.4013645.84723942-1.6630996 1.66309959-2.1860869 3.91194496-1.4434449 5.51228608l-10.20871199 10.20871195 1.47482417 1.4748242 7.20676492-7.1858454 7.1963052 7.1963052 1.4748241-1.4748242-7.1963051-7.1963052z" /></svg>,
	},
	couch: {
		/* translators: icon label */
		label: __( 'Couch', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'chair', 'coblocks' ),
			/* translators: icon keyword */
			__( 'chill', 'coblocks' ),
			/* translators: icon keyword */
			__( 'relax', 'coblocks' ),
			/* translators: icon keyword */
			__( 'weekend', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.1818182 7.87545455c-1.0045455 0-1.8181818.81363636-1.8181818 1.81818181v2.72727274h-12.72727276v-2.72727274c0-1.00454545-.81363637-1.81818181-1.81818182-1.81818181-1.00454546 0-1.81818182.81363636-1.81818182 1.81818181v5.14764964c0 1 .81818182 1.8181818 1.81818182 1.8181818h16.36363638c1 0 1.8181818-.8181818 1.8181818-1.8181818v-5.14764964c0-1.00454545-.8136364-1.81818181-1.8181818-1.81818181zm-2.7272727-4.54545455h-10.90909095c-1 0-1.81818182.81818182-1.81818182 1.81818182v1.95909091c1.05454545.37727272 1.81818182 1.37727272 1.81818182 2.55909091v1.84545456h10.90909095v-1.84545456c0-1.18181819.7636363-2.18181819 1.8181818-2.55909091v-1.95909091c0-1-.8181818-1.81818182-1.8181818-1.81818182z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m17.5 7.5v-1.66666667c0-1.375-1.125-2.5-2.5-2.5h-10c-1.375 0-2.5 1.125-2.5 2.5v1.66666667c-1.375 0-2.5 1.125-2.5 2.5v4.1666667c0 1.375 1.125 2.5 2.5 2.5h15c1.375 0 2.5-1.125 2.5-2.5v-4.1666667c0-1.375-1.125-2.5-2.5-2.5zm-13.33333333-1.66666667c0-.45833333.375-.83333333.83333333-.83333333h10c.4583333 0 .8333333.375.8333333.83333333v2.31666667c-.5083333.45833333-.8333333 1.11666667-.8333333 1.85v1.6666667h-10v-1.6666667c0-.73333333-.325-1.39166667-.83333333-1.85zm14.16666663 8.33333337c0 .4583333-.375.8333333-.8333333.8333333h-15c-.45833333 0-.83333333-.375-.83333333-.8333333v-4.1666667c0-.45833333.375-.83333333.83333333-.83333333s.83333333.375.83333333.83333333v3.3333333h13.33333337v-3.3333333c0-.45833333.375-.83333333.8333333-.83333333s.8333333.375.8333333.83333333z" /></svg>,
	},
	cake: {
		/* translators: icon label */
		label: __( 'Cake', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'celebration', 'coblocks' ),
			/* translators: icon keyword */
			__( 'food', 'coblocks' ),
			/* translators: icon keyword */
			__( 'fun', 'coblocks' ),
			/* translators: icon keyword */
			__( 'happy', 'coblocks' ),
			/* translators: icon keyword */
			__( 'party', 'coblocks' ),
			/* translators: icon keyword */
			__( 'taste', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 5.45454545c1.0090909 0 1.8181818-.81818181 1.8181818-1.81818181 0-.34545455-.0909091-.66363637-.2636363-.93636364l-1.5545455-2.7-1.55454545 2.7c-.17272728.27272727-.26363637.59090909-.26363637.93636364 0 1 .81818182 1.81818181 1.81818182 1.81818181zm4.1818182 9.08181815-.9727273-.9727272-.9818182.9727272c-1.1818182 1.1818182-3.25454543 1.1909091-4.44545452 0l-.97272727-.9727272-.99090909.9727272c-.59090909.5909091-1.38181818.9181819-2.21818182.9181819-.66363636 0-1.27272727-.209091-1.78181818-.5545455v4.1909091c0 .5.40909091.9090909.90909091.9090909h14.54545457c.5 0 .9090909-.4090909.9090909-.9090909v-4.1909091c-.5090909.3454545-1.1181818.5545455-1.7818182.5545455-.8363636 0-1.6272727-.3272728-2.2181818-.9181819zm1.2727273-6.35454542h-4.5454546v-1.81818182h-1.81818181v1.81818182h-4.54545454c-1.50909091 0-2.72727273 1.21818182-2.72727273 2.72727272v1.4c0 .9818182.8 1.7818182 1.78181818 1.7818182.47272727 0 .92727273-.1818182 1.25454545-.5181818l1.94545455-1.9363637 1.93636364 1.9363637c.67272727.6727272 1.84545456.6727272 2.51818186 0l1.9454545-1.9363637 1.9363636 1.9363637c.3363637.3363636.7818182.5181818 1.2545455.5181818.9818182 0 1.7818182-.8 1.7818182-1.7818182v-1.4c.0090909-1.5090909-1.2090909-2.72727272-2.7181818-2.72727272z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 5.45454545c1.0090909 0 1.8181818-.81818181 1.8181818-1.81818181 0-.34545455-.0909091-.66363637-.2636363-.93636364l-1.5545455-2.7-1.55454545 2.7c-.17272728.27272727-.26363637.59090909-.26363637.93636364 0 1 .81818182 1.81818181 1.81818182 1.81818181zm4.1818182 9.08181815-.9727273-.9727272-.9818182.9727272c-1.1818182 1.1818182-3.25454543 1.1909091-4.44545452 0l-.97272727-.9727272-.99090909.9727272c-.59090909.5909091-1.38181818.9181819-2.21818182.9181819-.66363636 0-1.27272727-.209091-1.78181818-.5545455v4.1909091c0 .5.40909091.9090909.90909091.9090909h14.54545457c.5 0 .9090909-.4090909.9090909-.9090909v-4.1909091c-.5090909.3454545-1.1181818.5545455-1.7818182.5545455-.8363636 0-1.6272727-.3272728-2.2181818-.9181819zm1.2727273-6.35454542h-4.5454546v-1.81818182h-1.81818181v1.81818182h-4.54545454c-1.50909091 0-2.72727273 1.21818182-2.72727273 2.72727272v1.4c0 .9818182.8 1.7818182 1.78181818 1.7818182.47272727 0 .92727273-.1818182 1.25454545-.5181818l1.94545455-1.9363637 1.93636364 1.9363637c.67272727.6727272 1.84545456.6727272 2.51818186 0l1.9454545-1.9363637 1.9363636 1.9363637c.3363637.3363636.7818182.5181818 1.2545455.5181818.9818182 0 1.7818182-.8 1.7818182-1.7818182v-1.4c.0090909-1.5090909-1.2090909-2.72727272-2.7181818-2.72727272z" /></svg>,
	},
	flower: {
		/* translators: icon label */
		label: __( 'Flower', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'gardening', 'coblocks' ),
			/* translators: icon keyword */
			__( 'landscape', 'coblocks' ),
			/* translators: icon keyword */
			__( 'nice', 'coblocks' ),
			/* translators: icon keyword */
			__( 'outdoors', 'coblocks' ),
			/* translators: icon keyword */
			__( 'outside', 'coblocks' ),
			/* translators: icon keyword */
			__( 'petal', 'coblocks' ),
			/* translators: icon keyword */
			__( 'relax', 'coblocks' ),
			/* translators: icon keyword */
			__( 'scent', 'coblocks' ),
			/* translators: icon keyword */
			__( 'smell', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10 20c4.7333333 0 8.5714286-3.8380952 8.5714286-8.5714286-4.7333334 0-8.5714286 3.8380953-8.5714286 8.5714286zm-6.0952381-11.19047619c0 1.31428569 1.06666667 2.38095239 2.38095239 2.38095239.5047619 0 .96190476-.152381 1.35238095-.4190476l-.01904762.1809524c0 1.3142857 1.06666667 2.3809523 2.38095238 2.3809523 1.3142857 0 2.3809524-1.0666666 2.3809524-2.3809523l-.0190476-.1809524c.3809523.2666666.847619.4190476 1.3523809.4190476 1.3142857 0 2.3809524-1.0666667 2.3809524-2.38095239 0-.95238095-.5619048-1.76190476-1.3619048-2.14285714.8-.38095238 1.3619048-1.19047619 1.3619048-2.14285715 0-1.31428571-1.0666667-2.38095238-2.3809524-2.38095238-.5047619 0-.9619047.15238096-1.3523809.41904762l.0190476-.18095238c0-1.31428571-1.0666667-2.38095238-2.3809524-2.38095238-1.31428571 0-2.38095238 1.06666667-2.38095238 2.38095238l.01904762.18095238c-.38095238-.26666666-.84761905-.41904762-1.35238095-.41904762-1.31428572 0-2.38095239 1.06666667-2.38095239 2.38095238 0 .95238096.56190477 1.76190477 1.36190477 2.14285715-.8.38095238-1.36190477 1.19047619-1.36190477 2.14285714zm6.0952381-4.52380952c1.3142857 0 2.3809524 1.06666666 2.3809524 2.38095238 0 1.31428571-1.0666667 2.38095238-2.3809524 2.38095238-1.31428571 0-2.38095238-1.06666667-2.38095238-2.38095238 0-1.31428572 1.06666667-2.38095238 2.38095238-2.38095238zm-8.57142857 7.14285711c0 4.7333334 3.83809524 8.5714286 8.57142857 8.5714286 0-4.7333333-3.83809524-8.5714286-8.57142857-8.5714286z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m6.81904762 11.4952381c.14285714 0 .27619048-.0095238.40952381-.0285714.44761905 1.0952381 1.52380952 1.8666666 2.77142857 1.8666666 1.247619 0 2.3238095-.7714285 2.7714286-1.8666666.1333333.0190476.2761904.0285714.4095238.0285714 1.647619 0 2.9904762-1.3428571 2.9904762-2.9904762 0-.67619047-.2380953-1.32380952-.6380953-1.83809523.4095238-.51428572.6380953-1.16190477.6380953-1.83809524 0-1.64761905-1.3428572-2.99047619-2.9904762-2.99047619-.1428572 0-.2761905.00952381-.4095238.02857143-.4476191-1.0952381-1.5238096-1.86666667-2.7714286-1.86666667-1.24761905 0-2.32380952.77142857-2.77142857 1.86666667-.13333333-.01904762-.27619048-.02857143-.40952381-.02857143-1.64761905 0-2.99047619 1.34285714-2.99047619 2.99047619 0 .67619047.23809524 1.32380952.63809524 1.83809524-.40952381.51428571-.64761905 1.16190476-.64761905 1.83809523 0 1.6476191 1.34285714 2.9904762 3 2.9904762zm3.18095238-.0666667c-.59047619 0-1.06666667-.4666666-1.08571429-1.047619l.11428572-1.03809526c.3047619.11428572.62857143.18095238.97142857.18095238.3428571 0 .6761905-.06666666.9809524-.18095238l.1047619 1.03809526c-.0190476.5809524-.4952381 1.047619-1.0857143 1.047619zm3.1809524-1.83809521c-.2285714 0-.4380953-.06666667-.6095238-.19047619l-.7714286-.54285714c.5238095-.42857143.8952381-1.03809524 1.0095238-1.74285715l.8380952.4c.3809524.18095239.6285715.56190477.6285715.98095239 0 .6095238-.4952381 1.09523809-1.0952381 1.09523809zm-.6190476-5.65714286c.1904762-.12380952.4-.19047619.6190476-.19047619.6 0 1.0857143.48571429 1.0857143 1.08571429 0 .41904762-.2380953.79047619-.6285715.98095238l-.8380952.4c-.1142857-.70476191-.4857143-1.31428571-1.0190476-1.74285714zm-2.5619048-2.02857143c.5904762 0 1.0666667.46666667 1.0857143 1.04761905l-.1047619 1.03809524c-.3047619-.11428571-.6380953-.18095238-.9809524-.18095238-.34285714 0-.66666667.06666667-.97142857.18095238l-.11428572-1.03809524c.01904762-.58095238.4952381-1.04761905 1.08571429-1.04761905zm-3.18095238 1.83809524c.22857143 0 .43809524.06666667.60952381.19047619l.77142857.53333334c-.52380952.42857143-.8952381 1.03809523-1.00952381 1.74285714l-.83809524-.4c-.38095238-.19047619-.62857143-.56190476-.62857143-.98095238 0-.6.4952381-1.08571429 1.0952381-1.08571429zm-.46666667 3.78095238.83809524-.4c.11428571.70476191.48571429 1.31428572 1.01904762 1.74285715l-.77142857.52380952c-.19047619.12380952-.4.19047619-.61904762.19047619-.6 0-1.08571429-.48571428-1.08571429-1.08571428-.00952381-.40952381.23809524-.78095239.61904762-.97142858zm3.64761905 12.47619048c4.7333333 0 8.5714286-3.8380952 8.5714286-8.5714286-4.7333334 0-8.5714286 3.8380953-8.5714286 8.5714286zm2.3238095-2.3238095c.6761905-1.8095238 2.1142857-3.2571429 3.9238095-3.9238095-.6761904 1.8095238-2.1142857 3.247619-3.9238095 3.9238095zm-10.89523807-6.2476191c0 4.7333334 3.83809524 8.5714286 8.57142857 8.5714286 0-4.7333333-3.83809524-8.5714286-8.57142857-8.5714286zm2.32380952 2.3238096c1.80952381.6761904 3.25714286 2.1142857 3.92380953 3.9238095-1.80952381-.6761905-3.24761905-2.1142857-3.92380953-3.9238095z" /></svg>,
	},
	vintage_filter: {
		/* translators: icon label */
		label: __( 'Vintage Filter', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'camera', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'flower', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photography', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.9874888 10.357462c-.2502234-.1429848-.5093833-.2591599-.7685433-.357462.25916-.09830206.5183199-.21447721.7685433-.35746202 1.7158177-.9919571 2.6720286-2.78820375 2.6809652-4.6380697-1.5996426-.92046471-3.6371761-.99195711-5.3619303 0-.2502234.1429848-.4825737.31277926-.697051.48257372.0446828-.27703306.0714924-.56300268.0714924-.84897229 0-1.98391421-1.0813226-3.70866846-2.6809651-4.63806971-1.59964254.92940125-2.68096515 2.6541555-2.68096515 4.63806971 0 .28596961.02680965.57193923.07149241.84897229-.21447722-.17873101-.44682753-.34852547-.69705094-.49151028-1.7158177-.9919571-3.75335121-.9204647-5.3619303 0 0 1.84986596.95621091 3.64611261 2.68096515 4.63806971.25022341.14298481.50938338.25915996.76854334.35746202-.25915996.09830205-.51831993.21447725-.76854334.35746205-1.71581769.9919571-2.6720286 2.7882037-2.68096515 4.6380697 1.59964254.9204647 3.63717605.9919571 5.3619303 0 .25022341-.1429848.48257372-.3127793.69705094-.4825738-.04468276.2859697-.07149241.5719393-.07149241.8579089 0 1.9839142 1.08132261 3.7086684 2.68096515 4.6380697 1.5996425-.9294013 2.6809651-2.6541555 2.6809651-4.6380697 0-.2859696-.0268096-.5719392-.0714924-.8489723.2144773.178731.4468276.3395889.697051.4825737 1.7158177.9919571 3.7533512.9204647 5.3619303 0-.0089366-1.8498659-.9651475-3.6461126-2.6809652-4.6380697zm-5.9874888 3.2171582c-1.97497766 0-3.5746202-1.5996425-3.5746202-3.5746202 0-1.97497766 1.59964254-3.5746202 3.5746202-3.5746202 1.9749777 0 3.5746202 1.59964254 3.5746202 3.5746202 0 1.9749777-1.5996425 3.5746202-3.5746202 3.5746202z" transform="translate(1)" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.9874888 10.357462c-.2502234-.1429848-.5093833-.2591599-.7685433-.357462.25916-.09830206.5183199-.21447721.7685433-.35746202 1.7158177-.9919571 2.6720286-2.78820375 2.6809652-4.6380697-.8132261-.46470063-1.7426274-.71492404-2.6899017-.71492404-.9115282 0-1.8319929.23235031-2.6720286.71492404-.2502234.1429848-.4825737.31277926-.697051.48257372.0446828-.27703306.0714924-.56300268.0714924-.84897229 0-1.98391421-1.0813226-3.70866846-2.6809651-4.63806971-1.59964254.92940125-2.68096515 2.6541555-2.68096515 4.63806971 0 .28596961.02680965.57193923.07149241.84897229-.21447722-.17873101-.44682753-.34852547-.69705094-.49151028-.84003575-.48257372-1.76050045-.71492403-2.6720286-.71492403-.9383378 0-1.8766756.25022341-2.6899017.71492403 0 1.84986596.95621091 3.64611261 2.68096515 4.63806971.25022341.14298481.50938338.25915996.76854334.35746202-.25915996.09830205-.51831993.21447725-.76854334.35746205-1.71581769.9919571-2.6720286 2.7882037-2.68096515 4.6380697.8132261.4647006 1.74262735.714924 2.6899017.714924.91152815 0 1.83199285-.2323503 2.6720286-.714924.25022341-.1429848.48257372-.3127793.69705094-.4825738-.04468276.2859697-.07149241.5719393-.07149241.8579089 0 1.9839142 1.08132261 3.7086684 2.68096515 4.6380697 1.5996425-.9294013 2.6809651-2.6541555 2.6809651-4.6380697 0-.2859696-.0268096-.5719392-.0714924-.8489723.2144773.178731.4468276.3395889.697051.4825737.8400357.4825738 1.7605004.7149241 2.6720286.7149241.9383378 0 1.8766756-.2502234 2.6899017-.7149241-.0089366-1.8498659-.9651475-3.6461126-2.6809652-4.6380697zm-2.2698838-3.46738157c.1876676-.15192136.3395889-.25915997.4825737-.33065237.5451296-.31277927 1.1617516-.48257373 1.7873101-.48257373.2412869 0 .4736372.02680966.7059875.07149241-.277033.81322609-.8400357 1.51027703-1.590706 1.94816801-.1519213.0893655-.3217158.1608579-.5183199.24128686l-1.233244.46470062c-.1519213-.41108132-.3663985-.77747989-.6434316-1.10813226zm-3.717605-4.6023235c.56300268.64343163.89365505 1.48346738.89365505 2.35031278 0 .16979445-.0178731.36639857-.04468275.56300268l-.20554066 1.28686327c-.21447722-.03574621-.42895443-.06255586-.64343164-.06255586s-.42895442.02680965-.63449508.06255586l-.20554067-1.28686327c-.0357462-.19660411-.0536193-.39320823-.0536193-.56300268 0-.87578195.33065237-1.70688115.89365505-2.35031278zm-6.69347632 3.85165326c.23235031-.05361931.47363718-.07149241.71492404-.07149241.61662199 0 1.23324397.16085791 1.77837355.48257373.13404826.08042895.28596961.17873101.43789097.31277927l1.02770331.85790884c-.26809652.32171582-.47363718.67917784-.62555853 1.07238606l-1.23324397-.46470062c-.18766756-.08042896-.35746202-.16085791-.50044683-.24128687-.77747989-.44682752-1.33154602-1.13494191-1.59964254-1.948168zm2.97587132 6.96157281c-.18766756.1519214-.33958892.25916-.48257373.3306524-.54512958.3127793-1.16175156.4825737-1.7873101.4825737-.24128686 0-.47363718-.0268096-.70598749-.0714924.27703307-.8132261.84003575-1.510277 1.59070599-1.948168.15192136-.0893655.32171582-.1608579.51831993-.2412869l1.23324397-.4647006c.1429848.4110813.36639857.7864165.64343163 1.1081323zm3.717605 4.6112601c-.56300268-.6434317-.89365505-1.4834674-.89365505-2.3503128 0-.178731.0178731-.3663986.0536193-.5808758l.19660411-1.2689902c.20554067.0357462.42001788.0625559.64343164.0625559.21447721 0 .42895442-.0268097.63449508-.0625559l.20554067 1.2868633c.0357462.1966041.0536193.3932082.0536193.5630027 0 .8757819-.33065237 1.7068811-.89365505 2.3503128zm5.9785523-3.7890974c-.616622 0-1.233244-.1608579-1.7783736-.4825738-.1608579-.0893655-.3038427-.1966041-.4378909-.3038427l-1.0277033-.8579088c.2680965-.3217158.4825737-.6791779.6255585-1.0813226l1.233244.4647006c.1966041.0714924.3663985.1519213.5093833.2323503.7596068.437891 1.313673 1.1349419 1.590706 1.948168-.2412868.0625559-.4825737.080429-.714924.080429z" transform="translate(1)" /></svg>,
	},
	build: {
		/* translators: icon label */
		label: __( 'Build', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'block', 'coblocks' ),
			/* translators: icon keyword */
			__( 'blocks', 'coblocks' ),
			/* translators: icon keyword */
			__( 'box', 'coblocks' ),
			/* translators: icon keyword */
			__( 'boxes', 'coblocks' ),
			/* translators: icon keyword */
			__( 'build', 'coblocks' ),
			/* translators: icon keyword */
			__( 'square', 'coblocks' ),
			/* translators: icon keyword */
			__( 'widgets', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="m0 0h20v20h-20z" /><path d="m19.6611198 16.3587437-8.2604891-8.26048913c.8460633-2.12880446.4093855-4.63970202-1.3100335-6.36821846-2.09241464-2.09241464-5.34930351-2.2834612-7.66915452-.59133458l3.4934227 3.50252016-1.2918386 1.28274115-3.48432525-3.48432525c-1.69212662 2.31075356-1.50108006 5.57673988.59133458 7.66005711 1.69212662 1.6921266 4.15753691 2.1379019 6.26814645 1.3464233l8.28778144 8.2877814c.3548008.3548008.9279404.3548008 1.2827412 0l2.0924146-2.0924146c.3638982-.3457033.3638982-.9188429 0-1.2827411z" fill="currentColor" fillRule="nonzero" /></g></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" transform="translate(0 -.734049)"><path d="m0 1h20v20h-20z" /><path d="m19.6627376 17.0986011-8.2473132-8.24731315c.8447138-2.1254089.4087325-4.63230145-1.307944-6.35806082-2.08907708-2.08907713-5.34077104-2.27981895-7.65692177-.59039136l3.48785051 3.49693345-1.28977806 1.28069511-3.47876756-3.47876757c-1.68942759 2.30706779-1.49868577 5.56784469.59039136 7.64783884 1.68942759 1.6894276 4.15090542 2.1344919 6.25814844 1.3442758l8.27456198 8.274562c.3542348.3542348.9264603.3542348 1.2806951 0l2.0890772-2.0890772c.3633177-.3451518.3633177-.9173773 0-1.2806951zm-2.7248832 1.4532711-8.5924651-8.59246508c-.55405958.40873248-1.17169978.65397198-1.8165888.74480138-1.23528039.1816589-2.53414139-.1907418-3.47876757-1.13536797-.86287968-.85379674-1.26252922-1.99824769-1.19894861-3.12453275l2.80662971 2.80662971 3.85116827-3.85116827-2.80662971-2.80662971c1.12628506-.0635806 2.26165307.33606893 3.12453275 1.18986567.98095795.98095796 1.35335866 2.33431662 1.12628506 3.59684584-.10899533.64488902-.38148365 1.24436333-.79929908 1.78025703l8.58338208 8.58338215z" fill="currentColor" fillRule="nonzero" /></g></svg>,
	},
	credit_card: {
		/* translators: icon label */
		label: __( 'Credit Card', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'cash', 'coblocks' ),
			/* translators: icon keyword */
			__( 'checkout', 'coblocks' ),
			/* translators: icon keyword */
			__( 'commerce', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ecommerce', 'coblocks' ),
			/* translators: icon keyword */
			__( 'money', 'coblocks' ),
			/* translators: icon keyword */
			__( 'shop', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="m0 0h20v20h-20z" /><path d="m18 2h-16c-1.11 0-1.99.89-1.99 2l-.01 12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2v-12c0-1.11-.89-2-2-2zm0 14h-16v-6h16zm0-10h-16v-2h16z" fill="currentColor" fillRule="nonzero" /></g></svg>,
	},
	extension: {
		/* translators: icon label */
		label: __( 'Extension', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'plugin', 'coblocks' ),
			/* translators: icon keyword */
			__( 'puzzle', 'coblocks' ),
			/* translators: icon keyword */
			__( 'team', 'coblocks' ),
			/* translators: icon keyword */
			__( 'together', 'coblocks' ),
			/* translators: icon keyword */
			__( 'widget', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="m0 0h20v20h-20z" /><path d="m8.71794872 0c-1.41538462 0-2.56410257 1.14871795-2.56410257 2.56410256h-4.1025641c-1.12820513 0-2.04102564.92307693-2.04102564 2.05128206v3.89743589h.2974359c1.52820513 0 2.76923077 1.24102564 2.76923077 2.76923079 0 1.5282051-1.24102564 2.7692308-2.76923077 2.7692308h-.30769231v3.8974358c0 1.1282052.92307692 2.0512821 2.05128205 2.0512821h3.8974359v-.3076923c0-1.5282051 1.24102564-2.7692308 2.76923077-2.7692308 1.52820508 0 2.76923078 1.2410257 2.76923078 2.7692308v.3076923h3.8974359c1.1282051 0 2.051282-.9230769 2.051282-2.0512821v-4.1025641c1.4153847 0 2.5641026-1.1487179 2.5641026-2.5641025 0-1.41538463-1.1487179-2.56410258-2.5641026-2.56410258v-4.1025641c0-1.12820513-.9230769-2.05128206-2.051282-2.05128206h-4.1025641c0-1.41538461-1.148718-2.56410256-2.56410258-2.56410256z" fill="currentColor" fillRule="nonzero" /></g></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="m0 0h20v20h-20z" /><path d="m9.23076923 2.56410256v2.05128206h6.15384617v6.15384618h2.051282c.2871795 0 .5128205.225641.5128205.5128205s-.225641.5128205-.5128205.5128205h-2.051282v6.1538461h-2.174359c-.6974359-1.7948717-2.451282-3.076923-4.49230768-3.076923-2.04102564 0-3.7948718 1.2820513-4.49230769 3.076923h-2.17435898v-2.1743589c1.7948718-.6974359 3.07692308-2.4512821 3.07692308-4.4923077 0-2.04102566-1.27179487-3.79487181-3.06666667-4.49230771l-.01025641-2.17435897h6.15384616v-2.05128206c0-.28717948.22564102-.51282051.51282051-.51282051s.51282051.22564103.51282051.51282051zm-.51282051-2.56410256c-1.41538462 0-2.56410257 1.14871795-2.56410257 2.56410256h-4.1025641c-1.12820513 0-2.04102564.92307693-2.04102564 2.05128206v3.89743589h.2974359c1.52820513 0 2.76923077 1.24102564 2.76923077 2.76923079 0 1.5282051-1.24102564 2.7692308-2.76923077 2.7692308h-.30769231v3.8974358c0 1.1282052.92307692 2.0512821 2.05128205 2.0512821h3.8974359v-.3076923c0-1.5282051 1.24102564-2.7692308 2.76923077-2.7692308 1.52820508 0 2.76923078 1.2410257 2.76923078 2.7692308v.3076923h3.8974359c1.1282051 0 2.051282-.9230769 2.051282-2.0512821v-4.1025641c1.4153847 0 2.5641026-1.1487179 2.5641026-2.5641025 0-1.41538463-1.1487179-2.56410258-2.5641026-2.56410258v-4.1025641c0-1.12820513-.9230769-2.05128206-2.051282-2.05128206h-4.1025641c0-1.41538461-1.148718-2.56410256-2.56410258-2.56410256z" fill="currentColor" fillRule="nonzero" /></g></svg>,
	},
	fingerprint: {
		/* translators: icon label */
		label: __( 'Fingerprint', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'bio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'biometric', 'coblocks' ),
			/* translators: icon keyword */
			__( 'defense', 'coblocks' ),
			/* translators: icon keyword */
			__( 'safe', 'coblocks' ),
			/* translators: icon keyword */
			__( 'secure', 'coblocks' ),
			/* translators: icon keyword */
			__( 'security', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.7660485 2.56204547c-.0789273 0-.1578547-.01973185-.2269162-.05919554-1.894257-.97672626-3.532-1.39109498-5.49531846-1.39109498-1.95345253 0-3.80824585.46369833-5.49531849 1.39109498-.23678212.12825699-.53275978.03946369-.67088269-.19731843-.12825698-.23678213-.03946368-.54262571.19731844-.67088269 1.83506147-.99645811 3.84770954-1.50948605 5.96888274-1.50948605 2.10144136 0 3.93650286.46369833 5.94915086 1.49962013.2466481.12825698.3354414.42423464.2071844.66101676-.0887933.1775866-.256514.27624582-.4341006.27624582zm-14.11813418 5.17960898c-.09865922 0-.19731844-.02959776-.28611174-.08879329-.2269162-.15785475-.27624581-.46369833-.11839106-.69061454.97672627-1.38122906 2.21983242-2.46648047 3.69972071-3.22615645 3.09789947-1.59827935 7.06400007-1.60814527 10.17176547-.00986592 1.4798883.75967598 2.7229944 1.83506147 3.6997207 3.20642461.1578547.21705028.1085251.53275978-.1183911.69061453s-.5327598.10852514-.6906145-.11839106c-.887933-1.24310616-2.0126481-2.21983243-3.3445475-2.90058104-2.8315196-1.45029051-6.45231293-1.45029051-9.27396659.00986593-1.34176537.69061453-2.46648047 1.67720672-3.35441344 2.92031287-.07892737.13812291-.2269162.20718436-.38477095.20718436zm6.16620117 11.90816775c-.12825698 0-.25651396-.0493296-.34530726-.1479889-.85833521-.8583352-1.32203353-1.4108268-1.9830503-2.6046033-.68074861-1.2135084-1.0359218-2.6933967-1.0359218-4.2818101 0-2.93017884 2.50594416-5.31773193 5.58411179-5.31773193 3.07816758 0 5.58411178 2.38755309 5.58411178 5.31773193 0 .2762458-.2170503.4932961-.4932961.4932961s-.4932961-.2170503-.4932961-.4932961c0-2.3875531-2.0619777-4.33113974-4.59751958-4.33113974-2.53554193 0-4.5975196 1.94358664-4.5975196 4.33113974 0 1.4206927.3157095 2.7328603.91753074 3.7983799.631419 1.134581 1.06551956 1.6180112 1.82519554 2.3875531.18745252.1973184.18745252.503162 0 .7004804-.10852514.0986593-.23678212.1479889-.36503911.1479889zm7.07386601-1.8251956c-1.1740447 0-2.2099665-.2959776-3.0584358-.878067-1.47002236-.9964581-2.34808941-2.6144693-2.34808941-4.3311397 0-.2762459.21705028-.4932961.4932961-.4932961.27624581 0 .49329609.2170502.49329609.4932961 0 1.3910949.71034642 2.7032626 1.91398882 3.5122682.7004805.4735642 1.519352.7004804 2.5059442.7004804.2367821 0 .631419-.0295978 1.0260559-.0986592.2663798-.0493296.5228938.128257.5722234.4045028.0493296.2663799-.128257.5228938-.4045028.5722235-.5623575.1085251-1.0556536.118391-1.1937765.118391zm-1.9830503 2.0323799c-.0394637 0-.0887933-.0098659-.128257-.0197318-1.5686816-.4341006-2.59473745-1.01619-3.67012294-2.0718436-1.38122906-1.3713632-2.14090505-3.1965587-2.14090505-5.1500112 0-1.5982794 1.36149722-2.90058107 3.03870394-2.90058107 1.67720675 0 3.03870395 1.30230167 3.03870395 2.90058107 0 1.0556536.9175307 1.9139888 2.0521117 1.9139888 1.1345811 0 2.0521118-.8583352 2.0521118-1.9139888 0-3.71945259-3.2064246-6.73842468-7.15279337-6.73842468-2.80192181 0-5.3670615 1.55881565-6.52137436 3.97596652-.38477096.79913966-.58208939 1.73640226-.58208939 2.76245816 0 .7695419.06906145 1.9830503.66101676 3.5615978.09865922.2565139-.02959776.5426257-.28611173.631419-.25651397.0986592-.54262571-.0394637-.631419-.2861118-.48343018-1.2924357-.7202123-2.5750056-.7202123-3.906905 0-1.1839107.2269162-2.2592961.67088269-3.19655873 1.31216761-2.7525922 4.22261456-4.53832406 7.40930733-4.53832406 4.48899447 0 8.13938557 3.46293858 8.13938557 7.72501679 0 1.5982794-1.3614972 2.9005811-3.038704 2.9005811-1.6772067 0-3.0387039-1.3023017-3.0387039-2.9005811 0-1.0556536-.9175307-1.9139888-2.05211175-1.9139888-1.13458101 0-2.05211175.8583352-2.05211175 1.9139888 0 1.6870727.65115084 3.2656202 1.84492739 4.4495308.93726258.9273967 1.83506151 1.4404246 3.22615641 1.8251956.2663799.0690614.4143688.3453072.3453073.6018212-.0493296.2269162-.256514.374905-.4636983.374905z" transform="translate(1)" /></svg>,
	},
	translate: {
		/* translators: icon label */
		label: __( 'Translate', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'global', 'coblocks' ),
			/* translators: icon keyword */
			__( 'language', 'coblocks' ),
			/* translators: icon keyword */
			__( 'speech', 'coblocks' ),
			/* translators: icon keyword */
			__( 'world', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.8187411 12.8292466-2.30909089-2.2818182.02727273-.0272727c1.58181816-1.76363641 2.70909086-3.79090913 3.37272726-5.93636368h2.6636364v-1.81818182h-6.36363639v-1.81818181h-1.81818182v1.81818181h-6.36363636v1.80909091h10.15454547c-.60909092 1.75454546-1.57272729 3.41818182-2.8818182 4.87272728-.84545454-.93636364-1.54545454-1.96363637-2.1-3.04545455h-1.81818181c.66363636 1.48181818 1.57272727 2.88181818 2.7090909 4.14545456l-4.62727272 4.5636363 1.29090909 1.2909091 4.54545454-4.5454545 2.8272727 2.8272727zm5.1181818-4.60909094h-1.8181818l-4.0909091 10.90909094h1.8181818l1.0181819-2.7272728h4.3181818l1.0272727 2.7272728h1.8181818zm-2.3818181 6.36363634 1.4727272-3.9363636 1.4727273 3.9363636z" /></svg>,
	},
	new: {
		/* translators: icon label */
		label: __( 'New', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'audio', 'coblocks' ),
			/* translators: icon keyword */
			__( 'badge', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'media', 'coblocks' ),
			/* translators: icon keyword */
			__( 'microphone', 'coblocks' ),
			/* translators: icon keyword */
			__( 'music', 'coblocks' ),
			/* translators: icon keyword */
			__( 'song', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m20.0286458 10.0068123-2.2181818-2.52727276.3090909-3.34545455-3.2818182-.74545454-1.7181818-2.8909091-3.0909091 1.32727273-3.09090906-1.32727273-1.71818182 2.8909091-3.28181818.73636363.30909091 3.34545455-2.21818182 2.53636367 2.21818182 2.5272727-.30909091 3.3545454 3.28181818.7454546 1.71818182 2.8909091 3.09090906-1.3363637 3.0909091 1.3272728 1.7181818-2.8909091 3.2818182-.7454546-.3090909-3.3454545zm-9.0909091 4.5454545h-1.81818178v-1.8181818h1.81818178zm0-3.6363636h-1.81818178v-5.45454548h1.81818178z" /></svg>,
		iconOutlined: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m20.5555013 9.96270419-2.2181818-2.52727273.3090909-3.34545454-3.2818182-.74545455-1.7181818-2.89090909-3.0909091 1.32727273-3.09090909-1.32727273-1.71818182 2.89090909-3.28181818.73636364.30909091 3.34545454-2.21818182 2.53636364 2.21818182 2.52727271-.30909091 3.3545455 3.28181818.7454545 1.71818182 2.8909091 3.09090909-1.3363636 3.0909091 1.3272727 1.7181818-2.8909091 3.2818182-.7454545-.3090909-3.3454546zm-4.1 1.91818181.2363636 2.5363636-2.4909091.5636364-1.3 2.1909091-2.3454545-1.0090909-2.34545454 1.0090909-1.3-2.1909091-2.49090909-.5636364.23636363-2.5454545-1.68181818-1.90909091 1.68181818-1.92727273-.23636363-2.52727272 2.49090909-.55454546 1.3-2.19090909 2.34545454 1 2.3454545-1.00909091 1.3 2.19090909 2.4909091.56363637-.2363636 2.53636363 1.6818182 1.91818182zm-6.80909091.8090909h1.81818181v1.8181818h-1.81818181zm0-7.27272726h1.81818181v5.45454546h-1.81818181z" transform="translate(-.565918)" /></svg>,
	},
	flare: {
		/* translators: icon label */
		label: __( 'Flare', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'artist', 'coblocks' ),
			/* translators: icon keyword */
			__( 'camera', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'flower', 'coblocks' ),
			/* translators: icon keyword */
			__( 'photography', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m5.45454545 9.09090909h-5.45454545v1.81818181h5.45454545zm1.97272728-2.94545454-1.92727273-1.92727273-1.28181818 1.28181818 1.92727273 1.92727273zm3.48181817-6.14545455h-1.81818181v5.45454545h1.81818181zm4.8727273 5.5-1.2818182-1.28181818-1.9272727 1.92727273 1.2818182 1.28181818zm-1.2363637 3.59090909v1.81818181h5.4545455v-1.81818181zm-4.5454545-1.81818182c-1.50909091 0-2.72727273 1.21818182-2.72727273 2.72727273 0 1.5090909 1.21818182 2.7272727 2.72727273 2.7272727 1.5090909 0 2.7272727-1.2181818 2.7272727-2.7272727 0-1.50909091-1.2181818-2.72727273-2.7272727-2.72727273zm2.5727273 6.58181823 1.9272727 1.9272727 1.2818182-1.2818182-1.9272727-1.9272727zm-8.35454548.6454545 1.28181818 1.2818182 1.92727273-1.9272727-1.28181818-1.2818182zm4.87272727 5.5h1.81818181v-5.4545455h-1.81818181z" /></svg>,
	},
	layers: {
		/* translators: icon label */
		label: __( 'Layers', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'build', 'coblocks' ),
			/* translators: icon keyword */
			__( 'creative', 'coblocks' ),
			/* translators: icon keyword */
			__( 'design', 'coblocks' ),
			/* translators: icon keyword */
			__( 'develop', 'coblocks' ),
			/* translators: icon keyword */
			__( 'engineer', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.99610362 17.0837787-7.42990299-5.7765731-1.63316728 1.2702412 9.07315155 7.0568956 9.0731515-7.0568956-1.6432485-1.2803225zm.01008128-2.560645 7.4198217-5.77657311 1.6533298-1.28032249-9.0731515-7.05689565-9.07315155 7.05689565 1.64324856 1.28032249z" /></svg>,
	},
	shipping: {
		/* translators: icon label */
		label: __( 'Shipping', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'cart', 'coblocks' ),
			/* translators: icon keyword */
			__( 'commerce', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ecommerce', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ship', 'coblocks' ),
			/* translators: icon keyword */
			__( 'shop', 'coblocks' ),
			/* translators: icon keyword */
			__( 'woo', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m17.2727273 4.36363636h-2.7272728v-3.63636363h-12.72727268c-1 0-1.81818182.81818182-1.81818182 1.81818182v9.99999995h1.81818182c0 1.509091 1.21818182 2.7272728 2.72727273 2.7272728 1.5090909 0 2.72727272-1.2181818 2.72727272-2.7272728h5.45454543c0 1.509091 1.2181818 2.7272728 2.7272728 2.7272728 1.5090909 0 2.7272727-1.2181818 2.7272727-2.7272728h1.8181818v-4.5454545zm-.4545455 1.36363637 1.7818182 2.27272727h-4.0545455v-2.27272727zm-12.27272725 7.72727277c-.5 0-.90909091-.409091-.90909091-.909091s.40909091-.9090909.90909091-.9090909.9090909.4090909.9090909.9090909-.4090909.909091-.9090909.909091zm2.01818181-2.7272728c-.5-.5545454-1.20909091-.90909088-2.01818181-.90909088-.80909091 0-1.51818182.35454548-2.01818182.90909088h-.70909091v-8.18181815h10.90909088v8.18181815zm8.89090914 2.7272728c-.5 0-.909091-.409091-.909091-.909091s.409091-.9090909.909091-.9090909.9090909.4090909.9090909.9090909-.4090909.909091-.9090909.909091z" transform="translate(0 2)" /></svg>,
	},
	snowflake: {
		/* translators: icon label */
		label: __( 'Snowflake', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'chill', 'coblocks' ),
			/* translators: icon keyword */
			__( 'cold', 'coblocks' ),
			/* translators: icon keyword */
			__( 'frozen', 'coblocks' ),
			/* translators: icon keyword */
			__( 'global', 'coblocks' ),
			/* translators: icon keyword */
			__( 'ice', 'coblocks' ),
			/* translators: icon keyword */
			__( 'season', 'coblocks' ),
			/* translators: icon keyword */
			__( 'winter', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m20 9h-4.17l3.24-3.24-1.41-1.42-4.66 4.66h-2v-2l4.66-4.66-1.42-1.41-3.24 3.24v-4.17h-2v4.17l-3.24-3.24-1.42 1.41 4.66 4.66v2h-2l-4.66-4.66-1.41 1.42 3.24 3.24h-4.17v2h4.17l-3.24 3.24 1.41 1.42 4.66-4.66h2v2l-4.66 4.66 1.42 1.41 3.24-3.24v4.17h2v-4.17l3.24 3.24 1.42-1.41-4.66-4.66v-2h2l4.66 4.66 1.41-1.42-3.24-3.24h4.17z" fillRule="evenodd" /></svg>,
	},
	school: {
		/* translators: icon label */
		label: __( 'School', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'college', 'coblocks' ),
			/* translators: icon keyword */
			__( 'degree', 'coblocks' ),
			/* translators: icon keyword */
			__( 'diploma', 'coblocks' ),
			/* translators: icon keyword */
			__( 'education', 'coblocks' ),
			/* translators: icon keyword */
			__( 'graduate', 'coblocks' ),
			/* translators: icon keyword */
			__( 'graduation', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m4.63589015 9.40022032v3.64467918l6.37818865 3.4806687 6.3781886-3.4806687v-3.64467918l-6.3781886 3.48066868zm6.37818865-9.2757086-10.02286786 5.46701882 10.02286786 5.46701886 8.2005282-4.47384377v6.29618337h1.8223396v-7.28935846z" transform="translate(-1 1.713379)" /></svg>,
	},
	fire: {
		/* translators: icon label */
		label: __( 'Fire', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'design', 'coblocks' ),
			/* translators: icon keyword */
			__( 'hot', 'coblocks' ),
			/* translators: icon keyword */
			__( 'trending', 'coblocks' ),
			/* translators: icon keyword */
			__( 'trendy', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m8.91322329.78180339s.69401426 2.48532134.69401426 4.50171413c0 1.93198565-1.2661071 3.49820703-3.19809275 3.49820703-1.94136422 0-3.40442131-1.56622138-3.40442131-3.49820703l.02813571-.33762856c-1.89447137 2.25085707-3.02927847 5.16759264-3.02927847 8.33754974 0 4.1453284 3.35752846 7.5028569 7.50285689 7.5028569 4.14532848 0 7.50285688-3.3575285 7.50285688-7.5028569 0-5.05504985-2.4290499-9.56614256-6.09607121-12.50163531zm-1.67876423 17.19092081c-1.66938566 0-3.0198999-1.3129999-3.0198999-2.9448713 0-1.5193285.98474997-2.5884856 2.63537848-2.9261142 1.66000709-.3376285 3.37628556-1.1348071 4.33289986-2.41967133.3657643 1.20983563.5533357 2.48532133.5533357 3.78894273 0 2.4853213-2.0163928 4.5017141-4.50171414 4.5017141z" transform="translate(2.553223 -.786621)" /></svg>,
	},
	update: {
		/* translators: icon label */
		label: __( 'Update', 'coblocks' ),
		keywords: [
			/* translators: icon keyword */
			__( 'add', 'coblocks' ),
			/* translators: icon keyword */
			__( 'improve', 'coblocks' ),
			/* translators: icon keyword */
			__( 'software', 'coblocks' ),
			/* translators: icon keyword */
			__( 'upload', 'coblocks' ),
		],
		icon: <svg height="20" focusable="false" role="img" aria-hidden="true" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.9986483 8.20489366h-7.5333334l3.0444445-3.13333333c-3.0333334-3-7.94444447-3.11111111-10.97777781-.11111111-3.03333333 3.01111111-3.03333333 7.86666668 0 10.87777778 3.03333334 3.0111111 7.94444441 3.0111111 10.97777781 0 1.5111111-1.4888889 2.2666666-3.2333333 2.2666666-5.4333333h2.2222223c0 2.2-.9777778 5.0555555-2.9333334 6.9888889-3.9 3.8666666-10.23333331 3.8666666-14.13333331 0-3.88888889-3.8555556-3.92222222-10.12222227-.02222222-13.97777783 3.9-3.85555555 10.15555553-3.85555555 14.05555553 0l3.0333334-3.12222222zm-9.4444445-2.35555555v4.72222219l3.8888889 2.3111111-.8 1.3444445-4.75555555-2.8222222v-5.55555559z" transform="translate(0 -.293783)" /></svg>,
	},
};

Object.entries( icons ).forEach( ( item ) => {
	const elem = item[ 0 ];
	svgs.outlined[ elem ] = {
		icon: icons[ elem ]?.iconOutlined || icons[ elem ].icon,
		label: icons[ elem ]?.label || null,
		keywords: icons[ elem ]?.keywords || null,
	};

	svgs.filled[ elem ] = {
		icon: icons[ elem ]?.icon || null,
		label: icons[ elem ]?.label || null,
		keywords: icons[ elem ]?.keywords || null,
	};
} );

export default svgs;
