const name = 'shape-divider';

import blockAttributes from './'

export const Transforms = {
		from: [
			// Default.
			...[ ':divider', ':top-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }` );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						verticalFlip: true,
					} );
				},
			},
			// Waves.
			...[ ':waves-divider', ':waves-angled-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-waves',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-waves-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-waves',
						verticalFlip: true,
					} );
				},
			},
			// Sloped.
			...[ ':sloped-divider', ':top-sloped-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-sloped',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-sloped-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-sloped',
						verticalFlip: true,
					} );
				},
			},
			// Sloped.
			...[ ':rounded-divider', ':top-rounded-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-rounded',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-rounded-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-rounded',
						verticalFlip: true,
					} );
				},
			},
			// Angled.
			...[ ':angled-divider', ':top-angled-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-angled',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-angled-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-angled',
						verticalFlip: true,
					} );
				},
			},
			// Triangle.
			...[ ':triangle-divider', ':top-triangle-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-triangle',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-triangle-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-triangle',
						verticalFlip: true,
					} );
				},
			},
			// Pointed.
			...[ ':pointed-divider', ':top-pointed-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-pointed',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-pointed-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-pointed',
						verticalFlip: true,
					} );
				},
			},
			// Hills.
			...[ ':hills-divider', ':top-hills-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-hills',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-hills-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-hills',
						verticalFlip: true,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { blockAttributes } ) => createBlock( `coblocks/${ name }`, {
					height: blockAttributes.height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'coblocks/dynamic-separator' ],
				transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
					height: blockAttributes.height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( `coblocks/${ name }` ),
			},
		],
  }
