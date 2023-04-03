
/**
 * Internal dependencies
 */

export function transformRIDs( rids, className ) {
	let output = rids[ 0 ];
	if ( rids.length === 1 ) {
		return output += ( className === 'button' ) ? '&type=button' : '&type=standard';
	}
	for ( let i = 1; i < rids.length; i++ ) {
		output += `%2C${ rids[ i ] }`;
	}
	output += ( className === 'button' ) ? '&type=button' : '&type=multi';
	return output;
}

const OpenTable = ( props ) => {
	const {
		attributes,
		className,
	} = props;

	const rids = attributes.restaurantIDs.map( ( restaurantObject ) => restaurantObject.rid );
	const classNameCleaned = className.substring( className.lastIndexOf( '-' ) + 1 );
	const ridsString = transformRIDs( rids, classNameCleaned );
	const isMultiple = rids.length > 1;

	const styles = [ 'wide', 'tall', 'standard', 'button' ];
	if ( ! styles.includes( classNameCleaned ) ) {
		return (
			<div className="iframe__overflow-wrapper">
				<iframe
					frameBorder="0"
					id="opentable-iframe"
					scrolling="no"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ attributes.language }&theme=standard&overlay=false&insideiframe=true&disablega=true` }
					style={ { width: '224px', height: isMultiple ? '362px' : '302px', display: 'block', margin: 'auto' } }
					title="open table frame"
				/>
			</div>

		);
	}
	return (
		<div className="iframe__overflow-wrapper">
			{ { tall: (
				<iframe
					frameBorder="0"
					id="opentable-iframe"
					scrolling="no"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ attributes.language }&theme=tall&overlay=false&insideiframe=true&disablega=true` }
					style={ { width: '289px', height: isMultiple ? '551px' : '491px', display: 'block', margin: 'auto' } }
					title="open table frame"
				/>
			), standard: (
				<iframe
					frameBorder="0"
					id="opentable-iframe"
					scrolling="no"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ attributes.language }&theme=standard&overlay=false&insideiframe=true&disablega=true` }
					style={ { width: '225px', height: isMultiple ? '362px' : '302px', display: 'block', margin: 'auto' } }
					title="open table frame"
				/>
			), button: (
				<iframe
					frameBorder="0"
					id="opentable-iframe"
					scrolling="no"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ attributes.language }&theme=standard&overlay=false&insideiframe=true&disablega=true` }
					style={ { width: '210px', height: '116px', display: 'block', margin: 'auto' } }
					title="open table frame"
				/>
			) }[ classNameCleaned ]
			}
		</div>
	);
};

export default OpenTable;
