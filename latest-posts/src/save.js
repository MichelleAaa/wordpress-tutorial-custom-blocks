export default function save() {
	return null;
}

//We have a dynamic block instead of a static block for this example.(For a dynamic block we are rendering dynamically with php instead of JS for the front-end.) With a dynamic block, you still need an edit.js file for the editor, but you don't need a real save.js file. The output for the front-end is going to render through the function referenced in plugin.php (in the render_callback section.) 