import Button from '../Button/Button';
import ContentEditable from 'react-contenteditable';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import { useState } from 'react';

import './title.css';

export default function Title({title, modify, remove}) {
    const [value, setValue] = useState(title.content);

    function save() {
        modify({...title, content: value});
    }

    function keyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
            modify({...title, content: e.target.textContent});
        }
    }
    
    return (
        <div className='title title-edit row' onBlur={save} onKeyDown={keyDown}>
            <div className='col-12 d-flex align-items-center'>
                <ContentEditable tagName='h1' html={value} onChange={e => setValue(e.target.value)} onKeyDown={keyDown} spellCheck={false} />
            </div>
        </div>
    )
}