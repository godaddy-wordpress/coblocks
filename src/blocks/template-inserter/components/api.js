/**
 * Use withSelect instead of withAPIData
 */

const { apiFetch }	= wp;
const { registerStore, withSelect } = wp.data;

//for templates API
const template_actions = {
    setTemplates( CoBlocksTemplates ) {
        return {
            type: 'SET_COBLOCKS_TEMPLATES',
            CoBlocksTemplates,
        };
    },

    receiveTemplates( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_TEMPLATES',
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

const template_store = registerStore( 'coblocks/templates', {
    reducer( state = { CoBlocksTemplates: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_TEMPLATES':
                return {
                    ...state,
                    CoBlocksTemplates: action.CoBlocksTemplates,
                };
            case 'RECEIVE_COBLOCKS_TEMPLATES':
                return action.CoBlocksTemplates;
        }

        return state;
    },

    template_actions,

    selectors: {
        receiveTemplates( state ) {
            const { CoBlocksTemplates } = state;
            return CoBlocksTemplates;
        },
    },

    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },

    resolvers: {
        * receiveTemplates( state ) {
            const path = '/coblocks/v1/library/templates/1';
            const CoBlocksTemplates = yield template_actions.fetchFromAPI( path );
            yield template_actions.setTemplates( CoBlocksTemplates );
        },
    },

} );

//for themes API
const theme_actions = {
    setThemes( CoBlocksThemes ) {
        return {
            type: 'SET_COBLOCKS_THEMES',
            CoBlocksThemes,
        };
    },

    receiveThemes( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_THEMES',
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

const theme_store = registerStore( 'coblocks/themes', {
    reducer( state = { CoBlocksThemes: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_THEMES':
                return {
                    ...state,
                    CoBlocksThemes: action.CoBlocksThemes,
                };
            case 'RECEIVE_COBLOCKS_THEMES':
                return action.CoBlocksThemes;
        }

        return state;
    },

    theme_actions,

    selectors: {
        receiveThemes( state ) {
            const { CoBlocksThemes } = state;
            return CoBlocksThemes;
        },
    },

    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },

    resolvers: {
        * receiveThemes( state ) {
            const path = '/coblocks/v1/library/theme/1';
            const CoBlocksThemes = yield theme_actions.fetchFromAPI( path );
            yield theme_actions.setThemes( CoBlocksThemes );
        },
    },

} );

//for saved Templates API
const saved_templates_actions = {
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

const saved_templates_store = registerStore( 'coblocks/saved_templates', {
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

    saved_templates_actions,

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
            const path = '/coblocks/v1/library/saved_templates/1';
            const CoBlocksSaved = yield saved_templates_actions.fetchFromAPI( path );
            yield saved_templates_actions.setSaved( CoBlocksSaved );
        },
    },

} );

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