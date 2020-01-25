/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from './icon';
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, MediaUpload, InnerBlocks, BlockControls } = wp.blockEditor;
const { Toolbar, Tooltip, IconButton } = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'aurooba-makes-blocks/sample-block',
    {
        title: __( 'Sample Block', 'aurooba-makes-blocks' ),
        description: __( 'Sample', 'aurooba-makes-blocks' ),
        category: 'layout',  
        icon: {
            // background: 'rgba(254, 243, 224, 0.52)',
            src: icons.block,
        }, 
        keywords: [
            __( 'Image', 'aurooba-makes-blocks' ),
            __( 'Text', 'aurooba-makes-blocks' ),
            __( 'Aurooba Makes', 'aurooba-makes-blocks' ),
        ],
        supports: {
            html: false,
        },
        styles: [
            {
                name: 'wide',
                label: __( 'Wide image' ),
                isDefault: true
            },
            {
                name: 'tall',
                label: __( 'Tall image' )
            },
        ],
        attributes: {
            message: {
                type: 'array',
                source: 'children',
                selector: '.message-body',
            },
            blockAlignment: {
                type: 'string',
                default: 'wide',
            },
            imgURL: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: 'img',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
            },
            mediaPosition: {
                type: "string",
                // default: "left",
            },
        },
        getEditWrapperProps( attributes ) {
            const { blockAlignment, mediaPosition } = attributes;
            if ( 'wide' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },
        edit: props => {
            const { attributes: { imgURL, imgID, imgAlt, mediaPosition }, className, setAttributes, isSelected } = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const classes = classnames(
                className,
                `image-${mediaPosition}`
            );
            return (
                <div className={ classes }>
                    <BlockControls>
                        <Toolbar>
                            <Tooltip text={ __( 'Show image on left', 'aurooba-makes-blocks' ) }>
                            <IconButton
                                icon='align-pull-left'
                                title={ __( 'Show image on left' ) }
                                isActive={ mediaPosition === 'left' }
                                onClick={ () => setAttributes( { mediaPosition: 'left' } ) }
                            />
                            </Tooltip>
                            <Tooltip text={ __( 'Show image on right', 'aurooba-makes-blocks' ) }>
                            <IconButton
                                icon='align-pull-right'
                                title={ __( 'Show image on right' ) }
                                onClick={ () => setAttributes( { mediaPosition: 'right' } ) }
                            />
                            </Tooltip>
                        </Toolbar>
                    </BlockControls>
                    <div className={ 'row' }>
                    { ! imgID ? (
                        <MediaPlaceholder
                            labels={ {
                                title: __( 'Image' ),
                            } }
                            className={ className }
                            onSelect={ onSelectImage }
                            accept="image/*"
                            allowedTypes={ [ 'image', 'video' ] }
                        />
                    ) : (
                        <div className={ 'image-wrapper'}>                       
                            <img
                                src={ imgURL }
                                alt={ imgAlt }
                            />

                            { isSelected ? (
                                <BlockControls>
                                    <Toolbar>
                                        <MediaUpload
                                            onSelect={ onSelectImage }
                                            allowedTypes={ [ 'image' ] }
                                            value={ imgID }
                                            render={ ( { open } ) => (
                                                <IconButton
                                                    className="components-toolbar__control"
                                                    label={ __( 'Edit image' ) }
                                                    icon="edit"
                                                    onClick={ open }
                                                />
                                            ) }
                                        />
                                    </Toolbar>
                                </BlockControls>
                             ) : null } 
                             </div>
                    )}
                        <InnerBlocks 
                            allowedBlocks={ [ 'core/heading', 'core/quote', 'core/paragraph', 'core/button' ] }
                            templateLock= { false }
                            templateInsertUpdatesSelection={ false }
                        />
                    </div>
                </div>

            );
        },
        save: props => {
            const { attributes: { imgURL, imgAlt } } = props;
            return (
                <div>
                    <img
                        src={ imgURL }
                        alt={ imgAlt }
                    />
                    <InnerBlocks.Content />
                </div>
            );
        },
    },
);
