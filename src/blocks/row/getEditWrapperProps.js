const getEditWrapperProps = ( attributes ) => {
	const { id, layout, columns, hasAlignmentControls } = attributes;

	// If no layout is seleted, return the following.
	if ( ! layout ) {
		return { 'data-id': id, 'data-columns': columns, 'data-layout': 'none' };
	}

	if ( hasAlignmentControls === false ) {
		return { 'data-align': '' };
	}

	return { 'data-id': id, 'data-columns': columns, 'data-layout': layout };
};

export default getEditWrapperProps;
