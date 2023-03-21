<?php
/**
 * Plugin Name:       Latest Posts Block
 * Description:       Display and filter latest posts.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ali Alaa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       latest-posts
 *
 * @package           blocks-course
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */

function blocks_course_render_latest_posts_block($attributes) {
	$args = array(
		// We set a default numberOfPosts in block.json of 5.
		'posts_per_page' => $attributes['numberOfPosts'],
		'post_status' => 'publish',
		// In the edit function we are allowing the user to adjust the orderBy selection in the right sidebar panel.
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
	);
	//Only if we have categories to filter by selected do we need this option. So we don't include it directly in the query, but instead below.
	if(isset($attributes['categories'])) {
		// categories is an array of objects, so to get just the id, we can use array_column. You pass it the array of objects as the first value, and the second is the key you want pulled out. (It's similar to map in JS that way.)
		$args['category__in'] = array_column($attributes['categories'], 'id');
	}
	$recent_posts = get_posts($args);

	// echo '<pre>';
	// var_dump($recent_posts);
	// echo '</pre>';
	
	$posts = '<ul ' . 
	// In edit.js we would use ...useBlockProps to get all the attributes and class names that are needed for the block. in PHP we have a similar function, get_block_wrapper_attributes().
	get_block_wrapper_attributes() . '>';
	foreach($recent_posts as $post) {
		$title = get_the_title($post);
		$title = $title ? $title : __('(No title)','latest-posts');
		$permalink = get_permalink( $post );
		$excerpt = get_the_excerpt( $post );

		$posts .= '<li>';

		if($attributes["displayFeaturedImage"] && has_post_thumbnail( $post )) {
			$posts .= get_the_post_thumbnail( $post, 'large' );
		}
		$posts .= '<h5><a href="' . esc_url($permalink) . '">' . $title . '</a></h5>';
		// In the get_the_date() method the 'c' is for the iso format.
		$posts .= '<time datetime="' . esc_attr( get_the_date('c', $post)) . '">' . esc_html( get_the_date('', $post)) . '</time>';

		if(!empty($excerpt)) {
			$posts .= '<p>' . $excerpt . '</p>';
		}

		$posts .= '</li>';
	}
	$posts .= '</ul>';

	return $posts;
}

function blocks_course_latest_posts_block_init() {
	register_block_type_from_metadata( __DIR__, array(
		'render_callback' => 'blocks_course_render_latest_posts_block'
	) );
	//render_callback is a function that will be responsible for generating our dynamic block.
}
add_action( 'init', 'blocks_course_latest_posts_block_init' );