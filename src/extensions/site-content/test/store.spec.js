import { actions, reducer, selectors } from '../store';

describe( '#action', () => {
	it( 'should return SET_RENAME_MODE action', () => {
		expect( actions.setRenameMode() ).toEqual( { type: 'SET_RENAME_MODE' } );
	} );

	it( 'should return CANCEL_RENAME_MODE action', () => {
		expect( actions.cancelRenameMode() ).toEqual( { type: 'CANCEL_RENAME_MODE' } );
	} );
} );

describe( '#reducer', () => {
	it( 'should return the correct post id on SET_RENAME_MODE action', () => {
		expect( reducer( {}, { type: 'SET_RENAME_MODE', postId: 1234 } ) ).toEqual( { isInRenameMode: 1234 } );
	} );

	it( 'should return null on CANCEL_RENAME_MODE action', () => {
		expect( reducer( {}, { type: 'CANCEL_RENAME_MODE' } ) ).toEqual( { isInRenameMode: null } );
	} );
} );

describe( '#selectors', () => {
	it( 'should return null if not in renaming mode', () => {
		expect( selectors.isInRenameMode( { isInRenameMode: null } ) ).toBeNull();
	} );

	it( 'should return the correct post id if in renaming mode', () => {
		expect( selectors.isInRenameMode( { isInRenameMode: 1234 } ) ).toBe( 1234 );
	} );
} );

