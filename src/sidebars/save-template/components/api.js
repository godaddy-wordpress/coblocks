/**
 * Use withSelect instead of withAPIData
 */

const { apiFetch }	= wp;
const { registerStore, withSelect } = wp.data;

//for count API
const count_actions = {
    setCount( CoBlocksCount ) {
        return {
            type: 'SET_COBLOCKS_COUNT',
            CoBlocksCount,
        };
    },

    receiveCount( path ) {
        return {
            type: 'RECEIVE_COBLOCKS_COUNT',
            path,
        };
    },
};

const template_store = registerStore( 'coblocks/count', {
    reducer( state = { CoBlocksCount: {} }, action ) {

        switch ( action.type ) {
            case 'SET_COBLOCKS_COUNT':
                return {
                    ...state,
                    CoBlocksCount: action.CoBlocksCount,
                };
            case 'RECEIVE_COBLOCKS_COUNT':
                return action.CoBlocksCount;
        }

        return state;
    },

    count_actions,

    selectors: {
        receiveCount( state ) {
            const { CoBlocksCount } = state;
            return CoBlocksCount;
        },
    },

    resolvers: {
        * receiveCount( state ) {
            const CoBlocksCount = apiFetch( { path: '/coblocks/v1/library/count/1' } )
                .then( CoBlocksCount => {
                    return count_actions.setCount( CoBlocksCount );
                } )
            yield CoBlocksCount;
        },
    },

} );