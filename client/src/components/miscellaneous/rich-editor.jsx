import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, setValue, name }) => {    
    return <ReactQuill theme="snow" value={value} onChange={(value)=>setValue(name, value)} />;
}

export default RichTextEditor