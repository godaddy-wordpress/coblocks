/*
 * Include our constants
 */
import * as helpers from '../../helpers';

describe( 'Test CoBlocks Accordion Block', function() {

  /**
   * Setup accordion data to be used
   */
  var accordionData = [
    {
      'title': 'What is the best way to contact you?',
      'text': 'You can reach us by calling (123) 456-7890.',
    },
    {
      'title': 'What are your hours of operation?',
      'text': 'We are open 24 hours a day, 7 days a week, 365 days a year.',
    }
  ];

  /**
   * Test that we can add an accordion item to the content, not add any text or
   * alter any settings, and are able to successfuly save the block without errors.
   */
  it( 'Test accordion block saves with empty values.', function() {

    helpers.addCoBlocksBlockToPage();

    helpers.savePage();

    helpers.checkForBlockErrors();

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

    helpers.addCoBlocksBlockToPage();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[0].title );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( accordionData[0].text );

    helpers.savePage();

    helpers.checkForBlockErrors();

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
      .contains( accordionData[0].title );

    cy.get( '.wp-block-coblocks-accordion-item__content' )
      .should( 'be.visible' )
      .contains( accordionData[0].text );

    helpers.editPage();

  } );

  /**
   * Test 'Display Open' attribute works
   */
  it( 'Test accordion block "Display Open" attribute works.', function() {

    helpers.addCoBlocksBlockToPage();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[0].title );

    helpers.toggleSettingCheckbox( 'Display Open' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( accordionData[0].text );

    helpers.savePage();

    helpers.checkForBlockErrors();

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

  /**
   * Test that multiple accordion items display as expected, including a re-order
   */
  it( 'Test multiple accordion items display as expected.', function() {

    helpers.addCoBlocksBlockToPage();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[0].title );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( accordionData[0].text );

    cy.get( '.wp-block[data-type="coblocks/accordion"]' )
      .dblclick( 'right' );

    cy.get( '.components-coblocks-add-accordion-item__button' )
      .should( 'be.visible' )
      .click();

    cy.get( '.wp-block-coblocks-accordion-item:nth-child(2) p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[1].title );

    cy.get( '.wp-block-coblocks-accordion-item:nth-child(2) p.wp-block-paragraph' )
      .type( accordionData[1].text );

    helpers.savePage();

    helpers.checkForBlockErrors();

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion-item' )
      .should( 'have.length', 2 );

    cy.wrap( accordionData ).each( ( data, index ) => {

      var iteration      = index + 1,
          $accordionItem = cy.get( '.wp-block-coblocks-accordion-item:nth-child(' + iteration + ')' );

      $accordionItem.parent()
                    .should( 'not.have.attr', 'open' );

      cy.get( '.wp-block-coblocks-accordion-item:nth-child(' + iteration + ') .wp-block-coblocks-accordion-item__title' )
        .contains( accordionData[ index ].title );

      $accordionItem.click();

      $accordionItem.parent()
                    .should( 'have.attr', 'open' );

      cy.get( '.wp-block-coblocks-accordion-item:nth-child(' + iteration + ') .wp-block-coblocks-accordion-item__content' )
        .contains( accordionData[ index ].text );

    } );

    helpers.editPage();

    cy.get( '.wp-block[data-type="coblocks/accordion-item"]:nth-child(2)' )
      .click( 'left' );

    cy.get( '.editor-block-mover button[aria-label="Move up"]' )
      .click();

    cy.get( '.wp-block[data-type="coblocks/accordion-item"]:nth-child(2) p.wp-block-coblocks-accordion-item__title' )
      .contains( accordionData[0].title );

    helpers.savePage();

    helpers.checkForBlockErrors();

    helpers.viewPage();

    // non-destructive array reverse, since we've re-ordered the accordion tabs
    var reverseAccordionData = accordionData.slice().reverse();

    cy.wrap( reverseAccordionData ).each( ( data, index ) => {

      var iteration      = index + 1,
          $accordionItem = cy.get( '.wp-block-coblocks-accordion-item:nth-child(' + iteration + ')' );

      $accordionItem.parent()
                    .should( 'not.have.attr', 'open' );

      cy.get( '.wp-block-coblocks-accordion-item:nth-child(' + iteration + ') .wp-block-coblocks-accordion-item__title' )
        .contains( reverseAccordionData[ index ].title );

      $accordionItem.click();

      $accordionItem.parent()
                    .should( 'have.attr', 'open' );

      cy.get( '.wp-block-coblocks-accordion-item:nth-child(' + iteration + ') .wp-block-coblocks-accordion-item__content' )
        .contains( reverseAccordionData[ index ].text );

    } );

    helpers.editPage();

  } );

  /**
   * Test the accordion block color settings
   */
  it( 'Test the accordion block color settings.', function() {

    helpers.addCoBlocksBlockToPage();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[0].title );

    // Title - Background Color
    helpers.setColorSetting( 'background', '#8589bd' );

    // Title - Text Color
    helpers.setColorSetting( 'text', '#350745' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( accordionData[0].text );

    // Content - Background Color
    helpers.setColorSetting( 'background', '#55e7ff' );

    // Content - Text Color
    helpers.setColorSetting( 'text', '#201148' );

    helpers.savePage();

    helpers.checkForBlockErrors();

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .should( 'have.attr', 'style', 'background-color:#8589bd;color:#350745' );

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .click();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'have.attr', 'open' );

    cy.get( '.wp-block-coblocks-accordion-item__content' )
      .should( 'be.visible' );

    cy.get( '.wp-block-coblocks-accordion-item__content p' )
      .should( 'have.attr', 'style', 'background-color:#55e7ff;color:#201148' );

    helpers.editPage();

  } );

  /**
   * Test the accordion block content font settings
   */
  it( 'Test the accordion block text settings.', function() {

    helpers.addCoBlocksBlockToPage();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[0].title );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( accordionData[0].text );

    cy.get( '.components-font-size-picker__select select' )
      .select( 'large' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .should( 'have.class', 'has-large-font-size' );

    helpers.toggleSettingCheckbox( 'Drop Cap' );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .should( 'have.class', 'has-drop-cap' );

    helpers.savePage();

    helpers.checkForBlockErrors();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .should( 'have.class', 'has-large-font-size' )
      .should( 'have.class', 'has-drop-cap' );

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'not.have.attr', 'open' );

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .click();

    cy.get( '.wp-block-coblocks-accordion-item__title' )
      .parent()
      .should( 'have.attr', 'open' );

    cy.get( '.wp-block-coblocks-accordion-item__content' )
      .should( 'be.visible' );

    cy.get( '.wp-block-coblocks-accordion-item__content p' )
      .should( 'have.class', 'has-large-font-size' )
      .should( 'have.class', 'has-drop-cap' );

    helpers.editPage();

  } );

  /**
   * Test the accordion block custom classes
   */
  it( 'Test the accordion block custom classes.', function() {

    helpers.addCoBlocksBlockToPage();

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-coblocks-accordion-item__title' )
      .type( accordionData[0].title );

    cy.get( '.wp-block-coblocks-accordion-item p.wp-block-paragraph' )
      .type( accordionData[0].text );

    helpers.addCustomBlockClass( 'my-custom-class' );

    helpers.savePage();

    helpers.checkForBlockErrors();

    cy.get( '.wp-block-coblocks-accordion' )
      .should( 'have.class', 'my-custom-class' );

    helpers.viewPage();

    cy.get( '.wp-block-coblocks-accordion' )
      .should( 'have.class', 'my-custom-class' );

    helpers.editPage();

  } );
} );
