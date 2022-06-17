
// eslint-disable-next-line no-unused-vars
export default function save( { attributes } ) {
	// Block body (save state)
	return (
		<>
			{ Object.keys( attributes.reviews ).map( ( key ) => {
				const review = attributes.reviews[ key ];
				return (
					<div key={ 'review_' + key } style={ { border: '1px solid black', padding: 5 } }>
						<img src={ review.authorAvatarSrc } alt="user avatar" />
						<p><span style={ { fontWeight: 700 } }>Author: </span>{ review.author }</p>
						<p><span style={ { fontWeight: 700 } }>On: </span>{ review.localizedDate }</p>
						<p><span style={ { fontWeight: 700 } }>Rating: </span>{ review.rating }/5</p>
						<p><span style={ { fontWeight: 700 } }>Comment: </span><span dangerouslySetInnerHTML={ { __html: review.comment } }></span></p>
						<p><a href={ 'https://www.yelp.com/biz/' + attributes.yelpBusinessDetails.businessId + '?hrid=' + review.id }>See on Yelp.com</a></p>
					</div>
				);
			} ) }
		</>
	);
}
