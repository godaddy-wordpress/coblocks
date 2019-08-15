/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
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
const name = 'input';

const title = __( 'Input' );

const icon = icons.buttons;

const blockAttributes = {
    email: {
        type: 'string',
        default: '',
    },
    label: {
        type: 'string',
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

    description: __( 'Child element of subscribe block.' ),

    attributes: blockAttributes,

    transforms: {},

    parent: [ 'coblocks/subscribe' ],

    edit: Edit,

    save( { attributes, className } ) {
        const {
            email,
            label,
            backgroundColor,
            textColor,
            customBackgroundColor,
            customTextColor,
        } = attributes;

        const backgroundClass = getColorClassName( 'background-color', backgroundColor );
        const textClass = getColorClassName( 'color', textColor );

        const inputClasses = classnames( {
            'has-text-color': textColor || customTextColor,
            [ textClass ]: textClass,
            'has-background': backgroundColor || customBackgroundColor,
            [ backgroundClass ]: backgroundClass,
        } );

        const inputStyles = {
            backgroundColor: backgroundClass ? undefined : customBackgroundColor,
            color: textClass ? undefined : customTextColor,
        };

        return (
            <div className="input-wrapper">
                <input
                    className={inputClasses}
                    style={inputStyles}
                    type="text"
                    value={ email }
                    placeholder={ label }
                />
            </div>
        );
    },
};

export { name, title, icon, settings };
