/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const example = {
    attributes: {
        count: 3,
        contentAlign: 'center',
    },
    innerBlocks: [
        {
            name: 'coblocks/pricing-table-item',
            attributes: {
                title: __( 'Basic', 'coblocks' ),
                currency: '$',
                amount: '29',
                features: [
                    { 	
                        type: 'li',
                        props: {
                            children: [
                                "Standard Support",
                            ]
                        }
                    }
                ]
            },
            innerBlocks: [ 
                { 
                    name: 'core/button',
                    attributes: {
                        text: 'Buy',
                    }
                }
            ]
        },
        {
            name: 'coblocks/pricing-table-item',
            attributes: {
                title: __( 'Pro', 'coblocks' ),
                currency: '$',
                amount: '39',
                features: [
                    { 	
                        type: 'li',
                        props: {
                            children: [
                                "Tailored Experience",
                            ]
                        }
                    }
                ]
            },
            innerBlocks: [ 
                { 
                    name: 'core/button',
                    attributes: {
                        text: 'Buy',
                    }
                }
            ]
        },
        {
            name: 'coblocks/pricing-table-item',
            attributes: {
                title: __( 'Gold', 'coblocks' ),
                currency: '$',
                amount: '99',
                features: [
                    { 	
                        type: 'li',
                        props: {
                            children: [
                                "Expert Guidence",
                            ]
                        }
                    }
                ]
            },
            innerBlocks: [ 
                { 
                    name: 'core/button',
                    attributes: {
                        text: 'Call',
                    }
                }
            ]
        },
    ],
};

export default example;