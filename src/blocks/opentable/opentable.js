
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
	const rids = props.attributes.restaurantIDs.map( ( restaurantObject ) => restaurantObject.rid );
	const className = props.className.substring( props.className.lastIndexOf( '-' ) + 1 );
	const ridsString = transformRIDs( rids, className );
	const isMultiple = rids.length > 1;

	const styles = [ 'wide', 'tall', 'standard', 'button' ];
	if ( ! styles.includes( className ) ) {
		return (
			<div className="iframe__overflow-wrapper">
				<iframe
					id="opentable-iframe"
					scrolling="no"
					frameBorder="0"
					style={ { width: '224px', height: isMultiple ? '362px' : '302px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ props.attributes.language }&theme=standard&overlay=false&insideiframe=true&disablega=true` }
				/>
			</div>

		);
	}
	return (
		<div className="iframe__overflow-wrapper">
			{ { tall: (
				<iframe
					id="opentable-iframe"
					frameBorder="0"
					scrolling="no"
					style={ { width: '289px', height: isMultiple ? '551px' : '491px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ props.attributes.language }&theme=tall&overlay=false&insideiframe=true&disablega=true` }
				/>
			), standard: (
				<iframe
					id="opentable-iframe"
					frameBorder="0"
					scrolling="no"
					style={ { width: '225px', height: isMultiple ? '362px' : '302px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ props.attributes.language }&theme=standard&overlay=false&insideiframe=true&disablega=true` }
				/>
			), button: (
				<iframe
					id="opentable-iframe"
					frameBorder="0"
					scrolling="no"
					style={ { width: '210px', height: '116px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&lang=${ props.attributes.language }&theme=standard&overlay=false&insideiframe=true&disablega=true` }
				/>
			) }[ className ]
			}
		</div>
	);
};

export default OpenTable;
