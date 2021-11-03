'use strict';

/*global google coblocksGoogleMaps*/

const renderMap = ( elements ) => {
	Array.from( elements ).forEach( ( element ) => {
		let mapAttributes = element.getAttribute( 'data-map-attr' );
		mapAttributes = mapAttributes.replace( /\/q/g, '"' ).split( '||' );
		const gmapAttr = JSON.parse( '{' + mapAttributes + '}' );

		if ( [ gmapAttr.address, gmapAttr.lat, gmapAttr.lng ].includes( 'undefined' ) ) {
			return;
		}

		let skin = mapStyles( gmapAttr.skin );
		if ( typeof skin === 'undefined' ) {
			skin = [];
		}
		skin.push(
			{
				elementType: 'labels',
				featureType: 'administrative.land_parcel',
				stylers: [ { visibility: 'off' } ],
			},
			{
				elementType: 'labels.text',
				featureType: 'poi',
				stylers: [ { visibility: 'off' } ],
			},
			{
				featureType: 'poi.business',
				stylers: [ { visibility: 'off' } ],
			},
			{
				featureType: 'transit',
				stylers: [ { visibility: 'off' } ],
			}
		);

		const map = new google.maps.Map( element, {
			center: new google.maps.LatLng( gmapAttr.lat, gmapAttr.lng ),
			fullscreenControl: gmapAttr.fullscreenControl === 'true',
			mapTypeControl: gmapAttr.mapTypeControl === 'true',
			streetViewControl: gmapAttr.streetViewControl === 'true',
			styles: skin,
			zoom: parseInt( gmapAttr.zoom ),
			zoomControl: gmapAttr.zoomControl === 'true',
		} );

		new google.maps.Marker( {
			icon: {
				scaledSize: new google.maps.Size(
					gmapAttr.iconSize,
					gmapAttr.iconSize
				),
				url: coblocksGoogleMaps.url + '/assets/images/markers/' + gmapAttr.skin + '.svg',
			},
			map,
			position: new google.maps.LatLng( gmapAttr.lat, gmapAttr.lng ),
		} );
		map.setCenter( new google.maps.LatLng( gmapAttr.lat, gmapAttr.lng ) );
	} );
};

const mapStyles = ( key ) => {
	const GMapStyles = {};

	GMapStyles.silver = [
		{
			elementType: 'geometry',
			stylers: [ { color: '#f5f5f5' } ],
		},
		{
			elementType: 'labels.icon',
			stylers: [ { visibility: 'off' } ],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [ { color: '#616161' } ],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [ { color: '#f5f5f5' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'administrative.land_parcel',
			stylers: [ { color: '#bdbdbd' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'poi',
			stylers: [ { color: '#eeeeee' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi',
			stylers: [ { color: '#757575' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'poi.park',
			stylers: [ { color: '#e5e5e5' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#9e9e9e' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road',
			stylers: [ { color: '#ffffff' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.arterial',
			stylers: [ { color: '#757575' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway',
			stylers: [ { color: '#dadada' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.highway',
			stylers: [ { color: '#616161' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.local',
			stylers: [ { color: '#9e9e9e' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'transit.line',
			stylers: [ { color: '#e5e5e5' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'transit.station',
			stylers: [ { color: '#eeeeee' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'water',
			stylers: [ { color: '#c9c9c9' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'water',
			stylers: [ { color: '#9e9e9e' } ],
		},
	];

	GMapStyles.retro = [
		{
			elementType: 'geometry',
			stylers: [ { color: '#ebe3cd' } ],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [ { color: '#523735' } ],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [ { color: '#f5f1e6' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'administrative',
			stylers: [ { color: '#c9b2a6' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'administrative.land_parcel',
			stylers: [ { color: '#dcd2be' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'administrative.land_parcel',
			stylers: [ { color: '#ae9e90' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'landscape.natural',
			stylers: [ { color: '#dfd2ae' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'poi',
			stylers: [ { color: '#dfd2ae' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi',
			stylers: [ { color: '#93817c' } ],
		},
		{
			elementType: 'geometry.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#a5b076' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#447530' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road',
			stylers: [ { color: '#f5f1e6' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.arterial',
			stylers: [ { color: '#fdfcf8' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway',
			stylers: [ { color: '#f8c967' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'road.highway',
			stylers: [ { color: '#e9bc62' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway.controlled_access',
			stylers: [ { color: '#e98d58' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'road.highway.controlled_access',
			stylers: [ { color: '#db8555' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.local',
			stylers: [ { color: '#806b63' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'transit.line',
			stylers: [ { color: '#dfd2ae' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'transit.line',
			stylers: [ { color: '#8f7d77' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'transit.line',
			stylers: [ { color: '#ebe3cd' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'transit.station',
			stylers: [ { color: '#dfd2ae' } ],
		},
		{
			elementType: 'geometry.fill',
			featureType: 'water',
			stylers: [ { color: '#b9d3c2' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'water',
			stylers: [ { color: '#92998d' } ],
		},
	];

	GMapStyles.dark = [
		{
			elementType: 'geometry',
			stylers: [ { color: '#212121' } ],
		},
		{
			elementType: 'labels.icon',
			stylers: [ { visibility: 'off' } ],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [ { color: '#757575' } ],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [ { color: '#212121' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'administrative',
			stylers: [ { color: '#757575' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'administrative.country',
			stylers: [ { color: '#9e9e9e' } ],
		},
		{
			featureType: 'administrative.land_parcel',
			stylers: [ { visibility: 'off' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'administrative.locality',
			stylers: [ { color: '#bdbdbd' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi',
			stylers: [ { color: '#757575' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'poi.park',
			stylers: [ { color: '#181818' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#616161' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'poi.park',
			stylers: [ { color: '#1b1b1b' } ],
		},
		{
			elementType: 'geometry.fill',
			featureType: 'road',
			stylers: [ { color: '#2c2c2c' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road',
			stylers: [ { color: '#8a8a8a' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.arterial',
			stylers: [ { color: '#373737' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway',
			stylers: [ { color: '#3c3c3c' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway.controlled_access',
			stylers: [ { color: '#4e4e4e' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.local',
			stylers: [ { color: '#616161' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'transit',
			stylers: [ { color: '#757575' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'water',
			stylers: [ { color: '#000000' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'water',
			stylers: [ { color: '#3d3d3d' } ],
		},
	];

	GMapStyles.night = [
		{
			elementType: 'geometry',
			stylers: [ { color: '#242f3e' } ],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [ { color: '#746855' } ],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [ { color: '#242f3e' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'administrative.locality',
			stylers: [ { color: '#d59563' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi',
			stylers: [ { color: '#d59563' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'poi.park',
			stylers: [ { color: '#263c3f' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#6b9a76' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road',
			stylers: [ { color: '#38414e' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'road',
			stylers: [ { color: '#212a37' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road',
			stylers: [ { color: '#9ca5b3' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway',
			stylers: [ { color: '#746855' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'road.highway',
			stylers: [ { color: '#1f2835' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.highway',
			stylers: [ { color: '#f3d19c' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'transit',
			stylers: [ { color: '#2f3948' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'transit.station',
			stylers: [ { color: '#d59563' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'water',
			stylers: [ { color: '#17263c' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'water',
			stylers: [ { color: '#515c6d' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'water',
			stylers: [ { color: '#17263c' } ],
		},
	];
	GMapStyles.aubergine = [
		{
			elementType: 'geometry',
			stylers: [ { color: '#1d2c4d' } ],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [ { color: '#8ec3b9' } ],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [ { color: '#1a3646' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'administrative.country',
			stylers: [ { color: '#4b6878' },
			],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'administrative.land_parcel',
			stylers: [ { color: '#64779e' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'administrative.province',
			stylers: [ { color: '#4b6878' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'landscape.man_made',
			stylers: [ { color: '#334e87' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'landscape.natural',
			stylers: [ { color: '#023e58' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'poi',
			stylers: [ { color: '#283d6a' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi',
			stylers: [ { color: '#6f9ba5' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'poi',
			stylers: [ { color: '#1d2c4d' } ],
		},
		{
			elementType: 'geometry.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#023e58' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'poi.park',
			stylers: [ { color: '#3C7680' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road',
			stylers: [ { color: '#304a7d' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road',
			stylers: [ { color: '#98a5be' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'road',
			stylers: [ { color: '#1d2c4d' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'road.highway',
			stylers: [ { color: '#2c6675' } ],
		},
		{
			elementType: 'geometry.stroke',
			featureType: 'road.highway',
			stylers: [ { color: '#255763' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'road.highway',
			stylers: [ { color: '#b0d5ce' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'road.highway',
			stylers: [ { color: '#023e58' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'transit',
			stylers: [ { color: '#98a5be' } ],
		},
		{
			elementType: 'labels.text.stroke',
			featureType: 'transit',
			stylers: [ { color: '#1d2c4d' } ],
		},
		{
			elementType: 'geometry.fill',
			featureType: 'transit.line',
			stylers: [ { color: '#283d6a' } ],
		},
		{
			elementType: 'geometry',
			featureType: 'transit.station',
			stylers: [ { color: '#3a4762', },
			],
		},
		{
			elementType: 'geometry',
			featureType: 'water',
			stylers: [ { color: '#0e1626' } ],
		},
		{
			elementType: 'labels.text.fill',
			featureType: 'water',
			stylers: [ { color: '#4e6d70' } ],
		},
	];

	return GMapStyles[ key ];
};

document.addEventListener( 'DOMContentLoaded', function() {
	renderMap( document.getElementsByClassName( 'wp-block-coblocks-map' ) );
} );
