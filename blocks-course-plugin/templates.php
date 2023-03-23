<?php

//The file also has to be included in plugin.php

//The template sets up what will auto-show up in the post type specified.
//Below we specified that for the 'post' type, that when we edit/create a new post, in the editor the metadata-block is going to be appear by default. 

// function blocks_course_plugin_register_template() {
//     $post_type_object = get_post_type_object( 'post' );
//     $post_type_object->template = array(
//         array('blocks-course/metadata-block')
//     );
// }
// add_action( 'init', 'blocks_course_plugin_register_template' );



function blocks_course_plugin_register_template() {
    $post_type_object = get_post_type_object( 'post' );
    $post_type_object->template_lock = 'insert'; //all would prevent users from moving the blocks, removing the blocks, or adding more blocks. 'insert' would only disable inserting new blocks, but you could drag/drop the pre-existing ones.
    $post_type_object->template = array(
        array('blocks-course/metadata-block'),
//When you create a new post, a paragraph would be on the page, with "Some text" written in it already.
        array('core/paragraph', array('content' => 'Some text')),
        
// First argument is the block. Second is the arguments. As a third element we can pass child blocks. -- This adds three of the team-members block.
        array(
            'blocks-course/team-members', 
            array('columns' => 3), 
            array(
                array(
                    'blocks-course/team-member',
                    array(
                        'name' => 'John Doe',
                        'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque nibh, tincidunt ut facilisis vitae, ullamcorper sit amet lectus. Proin porta vulputate purus.',
                        'url' => 'https://picsum.photos/id/1012/300/200'
                    )
                ),
                array(
                    'blocks-course/team-member',
                    array(
                        'name' => 'John Doe',
                        'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque nibh, tincidunt ut facilisis vitae, ullamcorper sit amet lectus. Proin porta vulputate purus.',
                        'url' => 'https://picsum.photos/id/1012/300/200'
                    )
                ),
                array(
                    'blocks-course/team-member',
                    array(
                        'name' => 'John Doe',
                        'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque nibh, tincidunt ut facilisis vitae, ullamcorper sit amet lectus. Proin porta vulputate purus.',
                        'url' => 'https://picsum.photos/id/1012/300/200'
                    )
                )
            )
        )
    );
}

//This has been commented out just to avoid the new post panel from being too busy, but you would need to uncomment it to use this:

// add_action( 'init', 'blocks_course_plugin_register_template' );
