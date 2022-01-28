/*global coblocksBlockData*/

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { lazy, useEffect, useState } from '@wordpress/element';
import { ResizableBox, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import InspectorLoader from '../../components/inspector-loader';
const Inspector = lazy( () => import( './inspector' ) );

/**
 * Set and export block values.
 */
const MIN_ICON_SIZE = 32;
const MAX_ICON_SIZE = 400;

export { MIN_ICON_SIZE, MAX_ICON_SIZE };

const bundledIconsEnabled = ( typeof coblocksBlockData === 'undefined' || coblocksBlockData.bundledIconsEnabled );

const Edit = ( props ) => {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		className,
		isSelected,
		iconColor,
		isRTL,
	} = props;

	const {
		icon,
		contentAlign,
		width,
		borderRadius,
		padding,
		hasContentAlign,
	} = attributes;

	const [ svgs, setSvgs ] = useState( null );

	useEffect( () => {
		let isMounted = true;

		( async () => {
			const importedSvgs = await import( './svgs' );

			if ( isMounted ) {
				setSvgs( importedSvgs.default );
			}

			if ( attributes.icon === '' ) {
				// Randomize the default icon when first added.
				let defaultIcons = [ 'aperture', 'gesture', 'scatter_plot', 'waves', 'blocks', 'coblocks', 'drafts', 'device_hub', 'marker' ];
				if ( ! bundledIconsEnabled && Object.keys( coblocksBlockData.customIcons ).length ) {
					defaultIcons = Object.keys( coblocksBlockData.customIcons );
				}
				const rand = defaultIcons[ Math.floor( Math.random() * defaultIcons.length ) ];
				setAttributes( { icon: rand } );
			}
		} )();

		return () => {
			isMounted = false;
		};
	}, [] );

	if ( ! svgs ) {
		return <Spinner />;
	}

	const classes = classnames( className, {
		[ `has-text-align-${ contentAlign }` ]: contentAlign,
	} );

	const innerClasses = classnames( 'wp-block-coblocks-icon__inner', {
		'has-background': backgroundColor.color,
		[ backgroundColor.class ]: backgroundColor.class,
		'has-text-color': iconColor.color,
		[ iconColor.class ]: iconColor.class,
		'is-selected': isSelected,
	} );

	const innerStyles = {
		backgroundColor: backgroundColor.color,
		borderRadius: borderRadius + 'px',
		color: iconColor.color,
		fill: iconColor.color,
		padding: padding + 'px',
	};

	let iconStyle = 'outlined';

	if ( className.includes( 'is-style-filled' ) ) {
		iconStyle = 'filled';
	}

	const selectedIcon = icon ? svgs[ iconStyle ][ icon ] : svgs[ iconStyle ].logo;

	// Show or hide handles based on the contentAlign attribute.
	let showRightHandle = false;
	let showLeftHandle = false;

	if ( contentAlign === 'center' ) {
		// When the image is centered, show both handles.
		showRightHandle = true;
		showLeftHandle = true;
	} else if ( isRTL ) {
		// In RTL mode the image is on the right by default.
		// Show the right handle and hide the left handle only when it is aligned left.
		// Otherwise always show the left handle.
		showRightHandle = contentAlign === 'left' ? true : false;
		showLeftHandle = contentAlign === 'left' ? false : true;
	} else {
		// Show the left handle and hide the right handle only when the image is aligned right.
		// Otherwise always show the right handle.
		showLeftHandle = contentAlign === 'right' ? true : false;
		showRightHandle = contentAlign === 'right' ? false : true;
	}

	// If the parent block has set this block to not display alignment controls.
	// then we set them to true and hide them via CSS.
	if ( hasContentAlign === false ) {
		showRightHandle = true;
		showLeftHandle = true;
	}

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<InspectorLoader>
						<Inspector { ...props } />
					</InspectorLoader>
				</>
			) }
			<div className={ classes }>
				<ResizableBox
					className={ innerClasses }
					enable={ {
						bottom: true,
						left: showLeftHandle,
						right: showRightHandle,
						top: false,
					} }
					lockAspectRatio
					maxWidth={ MAX_ICON_SIZE }
					minWidth={ padding ? MIN_ICON_SIZE + 28 : MIN_ICON_SIZE }
					onResizeStart={ () => setAttributes( { iconSize: 'advanced' } ) }
					onResizeStop={ ( _event, _direction, _elt, delta ) =>
						setAttributes( {
							height: parseInt( width + delta.width, 10 ),
							width: parseInt( width + delta.width, 10 ),
						} )
					}
					showHandle={ isSelected }
					size={ { width } }
					style={ innerStyles }
				>
					{ selectedIcon ? selectedIcon.icon : <Spinner /> }
				</ResizableBox>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
	withSelect( ( select ) => {
		const { getEditorSettings } = select( 'core/editor' );
		const { isRTL } = getEditorSettings();

		return {
			isRTL,
		};
	} ),
] )( Edit );

if ( 'function' === typeof wp.domReady ) {
	wp.domReady( () => {
		// Remove the icon styles when bundled icons are disabled and no custom icon config exists.
		if ( ! bundledIconsEnabled && ! coblocksBlockData.customIconConfigExists ) {
			wp.blocks.unregisterBlockStyle( 'coblocks/icon', 'filled' );
			wp.blocks.unregisterBlockStyle( 'coblocks/icon', 'outlined' );
		}
	} );
}
