<?php
/**
 * Plugin Name:       Text Box
 * Description:       A box of text.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gutenberg Blocks Course
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       boilerplate
 *
 * @package           blocks-course
 */

// Note that the package name blocks-course comes from block.json's name first reference.


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bocks_course_text_box_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'bocks_course_text_box_block_init' );
