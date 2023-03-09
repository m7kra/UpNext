import Button from '../Button/Button';
import ContentEditable from 'react-contenteditable';
import { CheckLg, XLg, Pencil } from 'react-bootstrap-icons';
import { useState } from 'react';

import './heading.css';

export default function Heading({heading, modify, remove}) {
    const [value, setValue] = useState(heading.content);

    function save() {
        modify({...heading, content: value});
    }

    function keyDown(e) {
        if (e.key != 'Enter') return;
        e.preventDefault();
        save();
    }
    
    return (
        <div className='heading heading-edit row' onBlur={save} onKeyDown={keyDown}>
            <div className='col-11 d-flex align-items-center'>
                <ContentEditable tagName='h2' html={value} onChange={e => setValue(e.target.value)} spellCheck={false} />
            </div>
            <div className='heading-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={remove}><XLg /></Button>
            </div>
        </div>
    )
}