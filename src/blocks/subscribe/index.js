/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Edit from './edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;


/**
 * Block constants
 */
const name = 'subscribe';

const title = __( 'Subscribe' );

const icon = icons.buttons;

const keywords = [
    __( 'subscribe' )
];

const blockAttributes = {
    email: {
        type: 'string',
        default: '',
    },
    label: {
        type: 'string',
        default: 'Email Address',
    },
    buttonLabel: {
        type: 'string',
        default: 'Sign up',
    },
    backgroundColor: {
        type: 'string',
    },
    textColor: {
        type: 'string',
    },
    customBackgroundColor: {
        type: 'string',
    },
    customTextColor: {
        type: 'string',
    },
};

const settings = {

    title: title,

    description: __( 'Sign up to receive special offers.' ),

    keywords: keywords,

    attributes: blockAttributes,

    transforms: {},

    supports: {
        align: true,
        alignWide: false,
        alignFull: false,
    },

    edit: Edit,

    save( { attributes, className } ) {
        const {
        } = attributes;

        const classes = classnames(
            className, {

            }
        );

        const innerClasses = classnames(
            'wp-block-coblocks-subscribe__inner',{
            }
        );

        return (
            <div className={ classes }>
                <div className={ innerClasses }>
                    <div className="wp-block-coblocks-subscribe__inner-form-wrapper">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        );
    },
};

export { name, title, icon, settings };
