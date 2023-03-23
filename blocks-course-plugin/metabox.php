<?php

//For our data store to have access to the metaboxes we set up, we have to add the following code:
function blocks_course_register_meta() {
    register_meta( 'post', //post type
    '_blocks_course_post_subtitle', //the metakey
    array(
        'single' => true, //metafields can be single or an array, but this one is only a single value
        'type' => 'string', //text field type
        'show_in_rest' => true, //must set to true so behind the scenes this uses the WP API to get the data.
        'sanitize_callback' => 'sanitize_text_field',//sanitizes the value before saving it to the db.
        'auth_callback' => function() {
            return current_user_can( 'edit_posts' );
        } //When you start the field name with a _(as we did below when creating the meta field), you have to add an auth_callback to be allowed to edit the meta field.
    ));
}
add_action( 'init', 'blocks_course_register_meta' );
//With the above code we now have access to the meta field set up in the code below. We can access the field now in the console of an edito post page: wp.data.select(‘core/editor’).getEditedPostAttribute(‘meta’)
//You can also update with wp.data.dispatch('core/editor').editoPost({meta:{_blocks_course_post_subtitle: 'new entry here'}}) -- you would have to update the post for it to save the change.


// This file is the OLD way...
// With the Classic Editor (instead of the Gutenberg Block editor), which you can find in the plugin store, this is how you would handle metadata.
// You have to include the file in plugin.php


function blocks_course_add_meta_box() {
    add_meta_box( 
        'blocks_course_post_options_metabox', //id 
        'Post Options', //title, which appears in the editor screen
        'blocks_course_post_options_metabox_html', //this function renders th einputs.
        'post', //post type
        'normal', //position - normal is under the text box. you could also put it in the sidebar
        'default', // priority
        array('__back_compat_meta_box' => true,  '__block_editor_compatible_meta_box' => true) 
        //TO GET THIS TO WORK WITH THE GUTENBERG EDITOR:
        //Set the first option above to false, and second to true:
            // array('__back_compat_meta_box' => false, '__block_editor_compatible_meta_box' => true) 
        //The issue is that since this code is written with PHP instead of JS and the Redux-like data store, this code isn't included in the data store.  
        //WP recommends to migrate the metaboxes using JS and the data stores instead of this method.
    );
}

//This adds a meta box in the edit post screen.
add_action( 'add_meta_boxes', 'blocks_course_add_meta_box' );

function blocks_course_post_options_metabox_html($post) {
    $subtitle = get_post_meta($post->ID, '_blocks_course_post_subtitle', true);
    //note the underscore -- _blocks_course_post_subtitle -- If you click on screen options, Custom Fields, in the classic editor -- you woudl have a place to enter your own custom fields. By adding the underscore you won't be able to edit the custom field. (We are preventing the field from being edited with Custom fields by adding the _ to make it non-editable by the user in the post editor.)
    wp_nonce_field( 'blocks_course_update_post_metabox', 'blocks_course_update_post_nonce' );//this is for security
    ?>
    <p>
        <label for="blocks_course_post_subtitle_field"><?php esc_html_e( 'Post Subtitle', 'blocks_course' ); ?></label>
        <br />
        <input class="widefat" type="text" name="blocks_course_post_subtitle_field" id="blocks_course_post_subtitle_field" value="<?php echo esc_attr( $subtitle ); ?>" />
    </p>
    <?php
}

//When we save the post another function will run:
function blocks_course_save_post_metabox($post_id, $post) {

    //Verify if the user can edit posts and verify the nonce.
    $edit_cap = get_post_type_object( $post->post_type )->cap->edit_post;
    if( !current_user_can( $edit_cap, $post_id )) {
        return;
    }
    if( !isset( $_POST['blocks_course_update_post_nonce']) || !wp_verify_nonce( $_POST['blocks_course_update_post_nonce'], 'blocks_course_update_post_metabox' )) {
        return;
    } 

//This accesses the value field from the input.
    if(array_key_exists('blocks_course_post_subtitle_field', $_POST)) {
        update_post_meta( 
            $post_id, 
            '_blocks_course_post_subtitle', 
            sanitize_text_field($_POST['blocks_course_post_subtitle_field'])
        );
    }

}

add_action( 'save_post', 'blocks_course_save_post_metabox', 10, 2 );