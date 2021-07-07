
export default function save( { attributes, className } ) {
	if ( attributes.className === undefined || attributes.className === null ) {
		return (
			<iframe
				frameBorder="0"
				scrolling="no"
				style={ { width: '224px', height: '301px', display: 'block', margin: 'auto' } }
				title="open table frame"
				src={ `//www.opentable.com/widget/reservation/canvas?rid=${ attributes.restaurantID }$&domain=com&type=standard&theme=standard&overlay=false&insideiframe=true` }
			/> );
	}
	return (
		<div className={ className }>
			<div className="iframe__overflow-wrapper">
				{ { tall: (
					<iframe
						frameBorder="0"
						scrolling="no"
						style={ { width: '288px', height: '490px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ attributes.restaurantID }$&domain=com&type=standard&theme=tall&overlay=false&insideiframe=true` }
					/>
				), standard: (
					<iframe
						frameBorder="0"
						scrolling="no"
						style={ { width: '224px', height: '301px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ attributes.restaurantID }$&domain=com&type=standard&theme=standard&overlay=false&insideiframe=true` }
					/>
				), button: (
					<iframe
						frameBorder="0"
						scrolling="no"
						style={ { width: '210px', height: '115px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ attributes.restaurantID }$&domain=com&type=button&theme=standard&overlay=false&insideiframe=true` }
					/>
				) }[ attributes.className.substring( attributes.className.lastIndexOf( '-' ) + 1 ) ]
				}
			</div>
		</div>
	);
}
