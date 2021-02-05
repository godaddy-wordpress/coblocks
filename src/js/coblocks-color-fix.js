import { hexToRGB } from '../utils/helper';

const wpThemeColorHex = getComputedStyle( document.documentElement ).getPropertyValue( '--wp-admin-theme-color' ).trim();

const wpThemeColorRbg = hexToRGB( wpThemeColorHex );

document.documentElement.style.setProperty( '--wp-admin-theme-color-rgb', wpThemeColorRbg );
