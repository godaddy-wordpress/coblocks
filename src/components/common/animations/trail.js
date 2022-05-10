import { Children } from '@wordpress/element';
import { animated, useTrail } from 'react-spring';

export const Trail = ( { children, config, className, direction = 'x' } ) => {
	const items = Children.toArray( children );
	const trail = useTrail( items.length, {
		config: {
			friction: 40,
			mass: 1,
			tension: 750,
			...config?.config,
		},
		from: {
			[ direction ]: -3,
			opacity: 0,
			...config?.from,
		},
		to: {
			[ direction ]: 0,
			opacity: 1,
			...config?.to,
		},
	} );

	return (
		<div className={ className }>
			{ trail.map( ( { x, y, ...rest }, index ) => (
				<animated.div
					key={ `${ className }-${ index }` }
					style={ { ...rest, transform: getInterpolateForDirection( { x, y }, direction ) } }>
					{ items[ index ] }
				</animated.div>
			) ) }
		</div>
	);
};

const getInterpolateForDirection = ( props, direction ) => {
	return props[ direction ].interpolate(
		( px ) => direction === 'x'
			? `translate3d( 0, ${ px }px, 0 )`
			: `translate3d( ${ px }px, 0, 0 )`
	);
};

export default Trail;
