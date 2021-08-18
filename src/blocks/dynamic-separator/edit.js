/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { ResizableBox } from '@wordpress/components';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const DynamicSeparatorEdit = ( props ) => {
	const {
		attributes: {
			height,
		},
		className,
		isSelected,
		setAttributes,
		color,
	} = props;

	return (
		<>
			{ isSelected && <Inspector { ...props } /> }
			<ResizableBox
				className={ classnames( className, {
					'is-selected': isSelected,
					'has-background': color.color,
					[ color.class ]: color.class,
				} ) }
				style={ {
					color: color.color,
				} }
				size={ {
					height,
				} }
				minHeight="20"
				enable={ {
					top: false,
					right: false,
					bottom: true,
					left: false,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false,
				} }
				onResizeStop={ ( _event, _direction, _elt, delta ) => {
					const spacerHeight = parseInt( height + delta.height, 10 );
					setAttributes( {
						height: spacerHeight,
					} );
				} }
				showHandle={ isSelected }
			/>
		</>
	);
};

export default compose( [ applyWithColors ] )( DynamicSeparatorEdit );
