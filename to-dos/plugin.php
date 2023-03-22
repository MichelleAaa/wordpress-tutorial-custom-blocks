<?php
/**
 * Plugin Name:       To Do List
 * Description:       Display and edit todos in the data store.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ali Alaa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       todo-list
 *
 * @package           blocks-course
 */

// This block requires the other plugin, found in the blocks-course-plugin folder, to be activated to run (that plugin is a custom data store that calls data from an API. So it must be activated for the data to be retreived, so this plugin can work with that data.)

function blocks_course_todo_list_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'blocks_course_todo_list_block_init' );