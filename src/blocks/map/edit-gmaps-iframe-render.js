import { __ } from '@wordpress/i18n';

const locale = document.documentElement.lang;

const GoogleMapIframeRender = ( props ) => {
	const { attributes } = props;

	const { address, height, zoom } = attributes;

	return <>
		<div
			style={ { height, position: 'absolute', width: '100%' } }
		/>
		<div className="iframe__overflow-wrapper">
			<iframe
				frameBorder="0"
				src={ `https://www.google.com/maps?q=${ encodeURIComponent(
					address
				) }&output=embed&hl=${ locale }&z=${ zoom }` }
				style={ { minHeight: height + 'px', width: '100%' } }
				title={ __( 'Google Map', 'coblocks' ) }
			/>
		</div>
	</>;
};

export default GoogleMapIframeRender;
