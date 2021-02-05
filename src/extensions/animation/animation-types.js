import { __ } from '@wordpress/i18n';

export const animationTypes = [
	{
		className: 'fadeIn',
		label: __( 'Fade in', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" width="16.5" x="3.75" y="3.75" fill="none" /><path d="m7.99992 12.6667c-.36667 0-.66667.3-.66667.6667 0 .3666.3.6666.66667.6666s.66667-.3.66667-.6666c0-.3667-.3-.6667-.66667-.6667zm0 2.6667c-.36667 0-.66667.3-.66667.6666 0 .3667.3.6667.66667.6667s.66667-.3.66667-.6667c0-.3666-.3-.6666-.66667-.6666zm0-5.3334c-.36667 0-.66667.3-.66667.6667s.3.6667.66667.6667.66667-.3.66667-.6667-.3-.6667-.66667-.6667zm0-2.66663c-.36667 0-.66667.3-.66667.66667s.3.66667.66667.66667.66667-.3.66667-.66667-.3-.66667-.66667-.66667zm5.33338 1.33334c.3666 0 .6666-.3.6666-.66667s-.3-.66667-.6666-.66667c-.3667 0-.6667.3-.6667.66667s.3.66667.6667.66667zm-2.6667 0c.3667 0 .6667-.3.6667-.66667s-.3-.66667-.6667-.66667-.66668.3-.66668.66667.29998.66667.66668.66667zm0 3.66669c-.5533 0-1.00001.4466-1.00001 1 0 .5533.44671 1 1.00001 1s1-.4467 1-1c0-.5534-.4467-1-1-1zm5.3333.3333c-.3666 0-.6666.3-.6666.6667 0 .3666.3.6666.6666.6666.3667 0 .6667-.3.6667-.6666 0-.3667-.3-.6667-.6667-.6667zm0 2.6667c-.3666 0-.6666.3-.6666.6666 0 .3667.3.6667.6666.6667.3667 0 .6667-.3.6667-.6667 0-.3666-.3-.6666-.6667-.6666zm0-5.3334c-.3666 0-.6666.3-.6666.6667s.3.6667.6666.6667c.3667 0 .6667-.3.6667-.6667s-.3-.6667-.6667-.6667zm0-2.66663c-.3666 0-.6666.3-.6666.66667s.3.66667.6666.66667c.3667 0 .6667-.3.6667-.66667s-.3-.66667-.6667-.66667zm-2.6666 8.00003c-.3667 0-.6667.3-.6667.6666 0 .3667.3.6667.6667.6667.3666 0 .6666-.3.6666-.6667 0-.3666-.3-.6666-.6666-.6666zm-2.6667-5.66669c-.5533 0-1.00001.44669-1.00001.99999s.44671 1 1.00001 1 1-.4467 1-1-.4467-.99999-1-.99999zm0 5.66669c-.3667 0-.66668.3-.66668.6666 0 .3667.29998.6667.66668.6667s.6667-.3.6667-.6667c0-.3666-.3-.6666-.6667-.6666zm2.6667-3c-.5534 0-1 .4466-1 1 0 .5533.4466 1 1 1 .5533 0 1-.4467 1-1 0-.5534-.4467-1-1-1zm0-2.66669c-.5534 0-1 .44669-1 .99999s.4466 1 1 1c.5533 0 1-.4467 1-1s-.4467-.99999-1-.99999z" fill="currentColor" /></svg>,
	},
	{
		className: 'zoomIn',
		label: __( 'Zoom in', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" width="16.5" x="3.75" y="3.75" fill="none" /><rect height="10.5" rx="1.25" stroke="currentColor" strokeOpacity=".75" strokeWidth="1.5" width="10.5" x="6.75" y="6.75" fill="none" /><rect fill="currentColor" fillOpacity=".25" height="4" rx=".5" width="4" x="10" y="10" /></svg>,
	},
	{
		className: 'slideInLeft',
		label: __( 'Slide in from left', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" width="16.5" x="3.75" y="3.75" fill="none" /><g fill="currentColor"><path clipRule="evenodd" d="m10.4375 16.3732 4.5625-4.546-4.5606-4.5772-1.0626 1.05873 3.5019 3.51457-3.49998 3.4873z" fillRule="evenodd" /><path d="m13.5487 11.0606v1.5h-9.81249v-1.5z" /></g></svg>,
	},
	{
		className: 'slideInRight',
		label: __( 'Slide in from right', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" transform="matrix(-1 0 0 1 19.5 3)" width="16.5" x="-.75" y=".75" fill="none" /><g fill="currentColor"><path clipRule="evenodd" d="m13.5625 16.3732-4.5625-4.546 4.5606-4.5772 1.0626 1.05873-3.5019 3.51457 3.5 3.4873z" fillRule="evenodd" /><path d="m10.4513 11.0606v1.5h9.8125v-1.5z" /></g></svg>,
	},
	{
		className: 'slideInBottom',
		label: __( 'Slide in from bottom', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" width="16.5" x="3.75" y="3.75" fill="none" /><g fill="currentColor"><path clipRule="evenodd" d="m16.5626 13.2363-4.5459-4.56259-4.57725 4.56059 1.05874 1.0626 3.51461-3.5019 3.4872 3.5z" fillRule="evenodd" /><path d="m11.2501 10.125h1.5v9.8125h-1.5z" /></g></svg>,
	},
	{
		className: 'clipHorizontal',
		label: __( 'Clip horizontally', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" width="16.5" x="3.75" y="3.75" fill="none" /><g fill="currentColor"><path d="m9 12.0698h8v11h-8z" transform="matrix(0 -1 1 0 -3.0698 21.0698)" /><path d="m4 20.0698h8v11h-8z" transform="matrix(0 -1 1 0 -16.0698 24.0698)" /></g></svg>,

	},
	{
		className: 'clipVertical',
		label: __( 'Clip vertically', 'coblocks' ),
		icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16.5" rx="1.53571" stroke="currentColor" strokeWidth="1.5" width="16.5" x="3.75" y="3.75" fill="none" /><g fill="currentColor"><path d="m12 4h7.5v11h-7.5z" /><path d="m4.5 9h7.5v11h-7.5z" /></g></svg>,
	},
];
