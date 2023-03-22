<?php
/**
 * Plugin Name:       Plugin Boilerplate
 * Description:       Plugin Boilerplate.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ali Alaa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       plugin-boilerplate
 *
 */

// We don't have a block.json file, so we have to enqueue scripts in the function itself:
function blocks_course_plugin_boilerplate_enqueue_assets() {

    $asset_file = include(plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    // After you install @wordpress/scripts, add in the code for build into package.json, then you can run npm run build. Once you do, the index.asset.php file will be created. It lists the version, which is being included here as $asset_file.
    wp_enqueue_script( 'blocks-course-plugin-boilerplate-script', plugins_url('build/index.js', __FILE__), $asset_file['dependencies'], $asset_file['version']);
    
    wp_enqueue_style( 'blocks-course-plugin-boilerplate-style', plugins_url('build/index.css', __FILE__) );
}

// enqueue_block_editor_assets means that this code will run in the block editor (when you go to edit a post) -- It doesn't run in any other pages in the admin panel.
add_action( 'enqueue_block_editor_assets', 'blocks_course_plugin_boilerplate_enqueue_assets' );