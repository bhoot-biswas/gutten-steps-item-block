/**
 * BLOCK: gutten-steps-item-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * WordPress dependencies
 */
import {
	__
} from '@wordpress/i18n'; // Import __() from wp.i18n
import {
	registerBlockType
} from '@wordpress/blocks'; // Import registerBlockType() from wp.blocks
import { Fragment } from '@wordpress/element';
import {
	PanelBody,
    ToggleControl,
} from '@wordpress/components';

import {
    InnerBlocks,
	InspectorControls,
    RichText,
} from '@wordpress/block-editor'; // Import InnerBlocks() from wp.blocks

/**
 * Internal dependencies
 */
import {
    IconControl,
} from '@bengal-studio/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const getIconArray = value => {
	if ( typeof value !== 'string' ) {
		return null
	}
	if ( ! value.match( /\w*-/ ) ) {
		return null
	}
	return [
		value.match( /\w*/ ), // Prefix.
		// value.match( /\w*/ )[ 0 ], // Prefix.
		value.match( /\w+-(.*)$/ )[ 1 ], // Icon name.
	]
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'bengal-studio/steps-item', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'gutten-steps-item-block - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'gutten-steps-item-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
    attributes: {
        icon: {
    		type: 'string',
    	},
        showIcon: {
			type: 'boolean',
			default: false,
		},
        step: {
    		type: 'string',
    	},
    },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
        const {
            attributes,
            setAttributes,
        } = props;

        const {
            icon,
            showIcon,
            step,
        } = attributes;

        const selectedIcon = getIconArray( icon );

		return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __( 'Sortings' ) }>
                        <ToggleControl
                            label={ __( 'Show Icon' ) }
                            checked={ !! showIcon }
                            onChange={ ( showIcon ) => setAttributes( { showIcon } ) }
                        />
                        { showIcon && ( <IconControl
                            label={ __( 'Icon' ) }
                            value={ icon }
                            onChange={ ( icon ) => setAttributes( { icon } ) }
                        /> ) }
                    </PanelBody>
                </InspectorControls>
                <div className={ props.className }>
                    <div className="wp-block-bengal-studio-steps-item__container">
                        <div className="wp-block-bengal-studio-steps-item__tail"></div>
                        <div className="wp-block-bengal-studio-steps-item__icon">
                            { showIcon ? (
                                <FontAwesomeIcon icon={ selectedIcon } />
                            ) : <RichText
                                tagName="div"
                                placeholder={ __( 'Add number…' ) }
                                value={ step }
                                onChange={ ( value ) => setAttributes( { step: value } ) }
                                formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
                            /> }
                        </div>
                        <div className="wp-block-bengal-studio-steps-item__content">
                            <InnerBlocks />
                        </div>
                    </div>
    			</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
        const {
            attributes,
        } = props;

        const {
            icon,
            showIcon,
            step,
        } = attributes;

        const selectedIcon = getIconArray( icon );

		return (
			<div className={ props.className }>
				<div className="wp-block-bengal-studio-steps-item__container">
                    <div className="wp-block-bengal-studio-steps-item__tail"></div>
                    <div className="wp-block-bengal-studio-steps-item__icon">
                        { showIcon ? (
                            <FontAwesomeIcon icon={ selectedIcon } />
                        ) : <RichText.Content
                            tagName="div"
                            value={ step }
                        /> }
                    </div>
                    <div className="wp-block-bengal-studio-steps-item__content">
                        <InnerBlocks.Content />
                    </div>
                </div>
			</div>
		);
	},
} );
