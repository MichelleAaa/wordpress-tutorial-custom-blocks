<?php 
/**
* Plugin Name: First Block
* Plugin URI: https://...com
* Description: My first block 
* Author: Test
* Author URI: https://..com
*/

// This function initiates our block.
function blocks_course_firstblock_init() {
    // the root folder is where the block.json file is located, which is why we are referencing only the __DIR__
    register_block_type_from_metadata( __DIR__ );
}

add_action("init", "blocks_course_firstblock_init");