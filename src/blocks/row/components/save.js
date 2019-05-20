import classnames from 'classnames';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo } from '../../../components/background';

const { getColorClassName, InnerBlocks } = wp.editor;

function Save( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		columns,
		customTextColor,
		gutter,
		id,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );

	const classes = classnames( {
		[ `coblocks-row--${ id }` ]: id,
		[ `coblocks-row-${ coblocks.id }` ]: coblocks && ( typeof coblocks.id !== 'undefined' ),
	});

	const innerClasses = classnames(
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `has-${ gutter }-gutter` ]: gutter,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
			'is-stacked-on-mobile': isStackedOnMobile,
		} );

	const innerStyles = {
		...BackgroundStyles( attributes ),
		color: textClass ? undefined : customTextColor,
	};

	return (
		<div className={ classes } data-id={ id } data-columns={ columns } data-layout={ layout } >
			<div className={ innerClasses } style={ innerStyles }>
				{ BackgroundVideo( attributes ) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default Save;
