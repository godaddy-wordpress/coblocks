/**
 * Use withSelect instead of withAPIData
 */

const { apiFetch }	= wp;
const { registerStore, withSelect } = wp.data;

//for saved Sections API
const saved_sections_actions = {
    setSaved( CoBlocksSaved ) {
        return {
            type: 'SET_COBLOCKS_SAVED',
            CoBlocksSaved,
        };
    },

    receiveSaved( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_SAVED',
            path,
        };
    },

    fetchFromAPI( path ) {
        return {
            type: 'FETCH_FROM_API',
            path,
        };
    },
};

const saved_sections_store = registerStore( 'coblocks/saved_sections', {
    reducer( state = { CoBlocksSaved: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_SAVED':
                return {
                    ...state,
                    CoBlocksSaved: action.CoBlocksSaved,
                };
            case 'RECEIVE_COBLOCKS_SAVED':
                return action.CoBlocksSaved;
        }

        return state;
    },

    saved_sections_actions,

    selectors: {
        receiveSaved( state ) {
            const { CoBlocksSaved } = state;
            return CoBlocksSaved;
        },
    },

    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },

    resolvers: {
        * receiveSaved( state ) {
            const path = '/coblocks/v1/library/saved_sections/1';
            const CoBlocksSaved = yield saved_sections_actions.fetchFromAPI( path );
            yield saved_sections_actions.setSaved( CoBlocksSaved );
        },
    },

} );

//for sections API
const section_actions = {
    setSections( CoBlockSections ) {
        return {
            type: 'SET_COBLOCKS_SECTIONS',
            CoBlockSections,
        };
    },

    receiveSections( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_SECTIONS',
            path,
        };
    },

    fetchFromAPI( path ) {
        return {
            type: 'FETCH_FROM_API',
            path,
        };
    },
};

const section_store = registerStore( 'coblocks/sections', {
    reducer( state = { CoBlockSections: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_SECTIONS':
                return {
                    ...state,
                    CoBlockSections: action.CoBlockSections,
                };
            case 'RECEIVE_COBLOCKS_SECTIONS':
                return action.CoBlockSections;
        }

        return state;
    },

    section_actions,

    selectors: {
        receiveSections( state ) {
            const { CoBlockSections } = state;
            return CoBlockSections;
        },
    },

    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },

    resolvers: {
        * receiveSections( state ) {
            const path = '/coblocks/v1/library/sections/1';
            const CoBlockSections = yield section_actions.fetchFromAPI( path );
            yield section_actions.setSections( CoBlockSections );
        },
    },

} );


//for theme sections API
const theme_section_actions = {
    setThemeSections( CoBlocksThemeSections ) {
        return {
            type: 'SET_COBLOCKS_THEME_SECTIONS',
            CoBlocksThemeSections,
        };
    },

    receiveThemeSections( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_THEME_SECTIONS',
            path,
        };
    },

    fetchFromAPI( path ) {
        return {
            type: 'FETCH_FROM_API',
            path,
        };
    },
};

const theme_section_store = registerStore( 'coblocks/theme_sections', {
    reducer( state = { CoBlocksThemeSections: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_THEME_SECTIONS':
                return {
                    ...state,
                    CoBlocksThemeSections: action.CoBlocksThemeSections,
                };
            case 'RECEIVE_COBLOCKS_THEME_SECTIONS':
                return action.CoBlocksThemeSections;
        }

        return state;
    },

    theme_section_actions,

    selectors: {
        receiveThemeSections( state ) {
            const { CoBlocksThemeSections } = state;
            return CoBlocksThemeSections;
        },
    },

    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },

    resolvers: {
        * receiveThemeSections( state ) {
            const path = '/coblocks/v1/library/theme_sections/1';
            const CoBlocksThemeSections = yield theme_section_actions.fetchFromAPI( path );
            yield theme_section_actions.setThemeSections( CoBlocksThemeSections );
        },
    },

} );

//for theme name API
const theme_name_actions = {
    setThemeName( CoBlocksThemeName ) {
        return {
            type: 'SET_COBLOCKS_NAME_SECTIONS',
            CoBlocksThemeName,
        };
    },

    receiveThemeName( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_NAME_SECTIONS',
            path,
        };
    },

    fetchFromAPI( path ) {
        return {
            type: 'FETCH_FROM_API',
            path,
        };
    },
};

const theme_name_store = registerStore( 'coblocks/theme_name', {
    reducer( state = { CoBlocksThemeName: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_NAME_SECTIONS':
                return {
                    ...state,
                    CoBlocksThemeName: action.CoBlocksThemeName,
                };
            case 'RECEIVE_COBLOCKS_NAME_SECTIONS':
                return action.CoBlocksThemeName;
        }

        return state;
    },

    theme_name_actions,

    selectors: {
        receiveThemeName( state ) {
            const { CoBlocksThemeName } = state;
            return CoBlocksThemeName;
        },
    },

    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },

    resolvers: {
        * receiveThemeName( state ) {
            const path = '/coblocks/v1/library/theme_name/1';
            const CoBlocksThemeName = yield theme_name_actions.fetchFromAPI( path );
            yield theme_name_actions.setThemeName( CoBlocksThemeName );
        },
    },

} );