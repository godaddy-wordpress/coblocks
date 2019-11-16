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

    // this event will automatically be unbound when this
    // test ends because it's attached to 'cy'
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('something about the error')

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()

      // return false to prevent the error from
      // failing this test
      return false
    })

    helpers.addCoBlocksBlockToPage( 'accordion' );

    helpers.savePage();

    helpers.checkForBlockErrors( 'accordion' );

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion .wp-block-coblocks-accordion-item' )
      .should( 'be.empty' );

    helpers.editPage();

  } );

  /**
   * Test that we can add an accordion item to the page, add content to it,
   * save and it displays properly without errors.
   */
  it( 'Test accordion block saves and displays correctly.', function() {

    helpers.clearBlocks();

    helpers.addCoBlocksBlockToPage( 'accordion' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( 'What is the best way to contact you?' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( 'You can reach us by calling (123)456-789.' );

    helpers.savePage();

    helpers.checkForBlockErrors( 'accordion' );

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'not.have.attr', 'open' );

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .click();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'have.attr', 'open' );

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .contains( 'What is the best way to contact you?' );

    cy.get( '.wp-block-coblocks-accordion-item__content' )
      .should( 'be.visible' )
      .contains( 'You can reach us by calling (123)456-789.' );

    helpers.editPage();

  } );

  /**
   * Test 'Display Open' attribute works
   */
  it( 'Test accordion block "Display Open" attribute works.', function() {

    helpers.clearBlocks();

    helpers.addCoBlocksBlockToPage( 'accordion' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( 'What is the best way to contact you?' );

    cy.get( '.components-toggle-control__label' )
      .contains( 'Display Open' )
      .parent( '.components-base-control__field' )
      .find( '.components-form-toggle__input' )
      .click();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( 'You can reach us by calling (123)456-789.' );

    helpers.savePage();

    helpers.checkForBlockErrors( 'accordion' );

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'have.attr', 'open' );

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .click();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'not.have.attr', 'open' );

    helpers.editPage();

  } );
} );
