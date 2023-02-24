import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

export default function edit() {
    const blockProps = useBlockProps(); // this will return the properties we need, such as classnames.
    // console.log(blockProps);
    return <p {...blockProps}>Edit JSX</p>;
}