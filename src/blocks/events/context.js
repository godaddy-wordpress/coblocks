import { createContext, useContext, useState } from '@wordpress/element';

const EventsContext = createContext( {
	isEditing: false,
	setIsEditing: () => {},
} );

const EventsContextProvider = ( { children } ) => {
	const [ isEditing, setIsEditing ] = useState( false );

	const context = {
		isEditing,
		setIsEditing,
	};

	return (
		<EventsContext.Provider value={ context }>
			{ children }
		</EventsContext.Provider>
	);
};

const withEventsState = ( Component ) => {
	return ( props ) => {
		const eventsContext = useContext( EventsContext );

		return (
			<EventsContextProvider>
				<Component { ...eventsContext } { ...props } />
			</EventsContextProvider>
		);
	};
};

export {
	EventsContext,
	EventsContextProvider,
	withEventsState,
};
