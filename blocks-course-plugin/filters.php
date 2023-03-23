<?php 


function blocks_course_filter_metadata($metadata) {

    //Meta shows details of all of the plugins. The easiest way to see it is:
    // echo '<pre style="position:relative;z-index:1000;background:#fff;">';
    // var_dump($metadata);
    // echo '</pre>';

    // This adds support for gradient backgrounds for the paragraph element:
    if($metadata['name'] == 'core/paragraph') {
        $metadata['title'] = 'Text Block';
        $metadata['supports']['color'] = array(
            'link' => true,
            'gradients' => true
        );
    }
    return $metadata;
}

add_filter( 'block_type_metadata', 'blocks_course_filter_metadata' );

// $allowed_block_types is the array of all block types we have. 
// This block limits which blocks you can add. So right now, this code would make the editor blocks section only list the paragraph block as being available:
// function blocks_course_filter_allowed_blocks($allowed_block_types, $editor_context) {
//     // Only for the 'post' post type, the user can only select the paragraph in the post edit screen:
//     if(!empty($editor_context->post) && $editor_context->post->post_type === 'post' ) {
//         return array('core/paragraph');
//     }
//     return $allowed_block_types;
// }

// add_filter( 'allowed_block_types_all', 'blocks_course_filter_allowed_blocks', 10, 2 );

//Other things you can do are add/remove block categories, edit settings for the editor, etc.