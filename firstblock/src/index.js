import { registerBlockType } from '@wordpress/blocks';
import "./style.scss";
import Edit from "./edit";
import Save from "./save";

// The first argument takes the name of the block (which comes from the block.json file). -- Second argument specifies our edit and save functions. 
registerBlockType("blocks-course/firstblock", {
    // When we click on the Block from the Editor screen to add it, the edit return function will run, and whatever is returned is what will show up in the editor.
    edit: Edit,
    save: Save
});