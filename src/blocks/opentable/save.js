
import { transformRIDs } from './opentable';

export default function save( { attributes } ) {
	const rids = attributes.restaurantIDs;
	const className = ( attributes.className === undefined ) ? '' : attributes.className.substring( attributes.className.lastIndexOf( '-' ) + 1 );
	const ridsString = transformRIDs( rids, className );
	const isMultiple = rids.length > 1;

	const styles = [ 'tall', 'standard', 'button' ];
	if ( ( attributes.className === undefined || attributes.className === null ) || ( ! styles.includes( className ) ) ) {
		return (
			<div className="iframe__overflow-wrapper">
				<iframe
					id="opentable-iframe"
					scrolling="no"
					frameBorder="0"
					style={ { width: '224px', height: isMultiple ? '362px' : '302px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&theme=standard&overlay=false&insideiframe=true` }
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
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&theme=tall&overlay=false&insideiframe=true` }
				/>
			), standard: (
				<iframe
					id="opentable-iframe"
					frameBorder="0"
					scrolling="no"
					style={ { width: '225px', height: isMultiple ? '362px' : '302px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&theme=standard&overlay=false&insideiframe=true` }
				/>
			), button: (
				<iframe
					id="opentable-iframe"
					frameBorder="0"
					scrolling="no"
					style={ { width: '210px', height: '116px', display: 'block', margin: 'auto' } }
					title="open table frame"
					src={ `//www.opentable.com/widget/reservation/canvas?rid=${ ridsString }&domain=com&theme=standard&overlay=false&insideiframe=true` }
				/>
			) }[ className ]
			}
		</div>
	);
}
