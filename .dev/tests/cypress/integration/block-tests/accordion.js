/*
 * Include our constants
 */
import * as helpers from '../../helpers';

describe( 'Test CoBlocks Accordion Block', function() {

  /**
   * Test that we can add an accordion item to the content, not add any text or
   * alter any settings, and are able to successfuly save the block without errors.
   */
  it( 'Test accordion block saves with empty values.', function() {

    helpers.addCoBlocksBlockToPage( 'accordion' );

    helpers.savePage();

    cy.reload();

    helpers.checkForBlockErrors( 'accordion' );

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion .wp-block-coblocks-accordion-item' )
      .should( 'be.empty' );

    helpers.editPage();

  } );
} );
