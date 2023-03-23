<?php

// This registers a new pattern category:
// The label will show up in the patterns panel in the editor (left sidebar after clicking the + button)
function blocks_course_plugin_register_pattern_cat() {
    register_block_pattern_category( 'blocks-course', array(
        'label' => __('Blocks Course', 'blocks-course')
    ));
}

// This registers a new pattern:
add_action( 'init', 'blocks_course_plugin_register_pattern_cat' );

function blocks_course_plugin_register_pattern() {
    register_block_pattern( 'blocks-course/my-patterns', array(
        'title' => __('My Pattern', 'blocks-course'),
        'description' => __('Some description', 'blocks-course'),
        // We just created the blocks-course category above, so we are assigning this new pattern to that category:
        'categories' => array('blocks-course'),
        // These are search keywords (in the editor, press the + button, then click on patterns, and you can search):
        'keywords' => array('my pattern'),
// To create a pattern -- First create it with the blocks in the editor (such as columns, paragraphs, whatever blocks you want to use. Make sure nothing else is in that post, to make your life easier. Then go to the code view, and you can copy/paste the code, entering it below in a ''. -- Another option is to select the column (the very outermost block for your new pattern - then on the hover toolbar, click on the three dots - copy. -- you can then go to a website like lingojam.com/textooneline -- convert the text to one line with this tool. Then you can paste it below inside ''. ))
        'content' => '<!-- wp:columns --><div class="wp-block-columns"><!-- wp:column {"width":"33.33%"} --><div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:heading --><h2 id="our-team">Our Team</h2><!-- /wp:heading --><!-- wp:paragraph --><p>wrefregregreg</p><!-- /wp:paragraph --></div><!-- /wp:column --><!-- wp:column {"width":"66.66%"} --><div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:blocks-course/team-members --><div class="wp-block-blocks-course-team-members has-2-columns"><!-- wp:blocks-course/team-member --><div class="wp-block-blocks-course-team-member"></div><!-- /wp:blocks-course/team-member --><!-- wp:blocks-course/team-member --><div class="wp-block-blocks-course-team-member"></div><!-- /wp:blocks-course/team-member --><!-- wp:blocks-course/team-member --><div class="wp-block-blocks-course-team-member"></div><!-- /wp:blocks-course/team-member --></div><!-- /wp:blocks-course/team-members --></div><!-- /wp:column --></div><!-- /wp:columns -->'
    ));
}
add_action( 'init', 'blocks_course_plugin_register_pattern' );