/**
 * External dependencies
 */
 import '@testing-library/jest-dom/extend-expect';
 import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';
 import { replaceActiveStyle } from '@wordpress/block-editor/build/components/block-styles';
 
 /**
  * Internal dependencies.
  */
 import { name, settings } from '../index';
 
 // Make variables accessible for all tests.
 let block;
 let serializedBlock;
 
 describe( 'coblocks/opentable', () => {
     beforeAll( () => {
        // Register the block.
        registerBlockType( name, { category: 'common', ...settings } );
     } );
 
     beforeEach( () => {
        // Create the block with the minimum attributes.
        block = createBlock( name );

        // Reset the reused variables.
        serializedBlock = '';
     } );
 
     afterEach( () => {
        // Make a snapshot for each save function test to better detect deprecation needs.
        expect( serializedBlock ).toMatchSnapshot();
     } );
 
     it( 'should not render when no rid defined', () => {
        block.attributes.restaurantIDs = [ { name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)' } ];
        block.attributes.language = 'en-US';
        serializedBlock = serialize( block );

        expect( serializedBlock ).toBeDefined();
        expect( serializedBlock ).toContain();
     } );
 
     it( 'should render with preassigned restaurants', () => {
        block.attributes.restaurantIDs = [
            { rid: '123456', name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)'},
        ];
        block.attributes.language = 'en-US';
        serializedBlock = serialize( block );

        expect( serializedBlock ).toBeDefined();
        expect( serializedBlock ).toContain( 'iframe__overflow-wrapper' );
     } );
 
     it( 'should render with style "Tall"', () => {
        block.attributes.restaurantIDs = [
            { rid: '123456', name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)'},
        ];
        block.attributes.language = 'en-US';

        const activeStyle = undefined;
        const newStyle = { name: 'tall' };
        block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

        serializedBlock = serialize( block );

        expect( serializedBlock ).toBeDefined();
        expect( serializedBlock ).toContain( 'is-style-tall' );
     } );
 
     it( 'should render with style "Button"', () => {
        block.attributes.restaurantIDs = [
            { rid: '123456', name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)'},
        ];
        block.attributes.language = 'en-US';

        const activeStyle = undefined;
        const newStyle = { name: 'button' };
        block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

        serializedBlock = serialize( block );

        expect( serializedBlock ).toBeDefined();
        expect( serializedBlock ).toContain( 'is-style-button' );
    } );

    it( 'should render with multiple restaurants selected', () => {
        block.attributes.restaurantIDs = [
            { rid: '123456', name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)'},
            { rid: '246847', name: 'Jines Restaurant (Test Restaurant added by CoBlocks)'},
        ];
        block.attributes.language = 'en-US';
        serializedBlock = serialize( block );

        expect( serializedBlock ).toBeDefined();
        expect( serializedBlock ).toContain( 'type=multi' );
    } );

 
     it( 'should render with no language selected', () => {
        block.attributes.restaurantIDs = [
            { rid: '123456', name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)'},
        ];
        serializedBlock = serialize( block );
 
        expect( serializedBlock ).toBeDefined();
        expect( serializedBlock ).toContain( 'type=standard' );
     } );
 } );
 