<?php
/**
 * Plugin Name:       Blocks Course Plugin
 * Description:       Plugin for blocks course.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ali Alaa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       plugin-boilerplate
 *
 */

//  This plugin will be a custom data store we create (instead of connecting to the wp standard store).
// We don't need a block.json file since this won't be a block component. It's a plugin that other plugins could access the data store from.

function blocks_course_plugin__enqueue_assets() {

    $asset_file = include(plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_enqueue_script( 'blocks-course-plugin-script', plugins_url('build/index.js', __FILE__), $asset_file['dependencies'], $asset_file['version']);
    
    wp_enqueue_style( 'blocks-course-plugin-style', plugins_url('build/index.css', __FILE__) );
}

add_action( 'enqueue_block_editor_assets', 'blocks_course_plugin__enqueue_assets' );
