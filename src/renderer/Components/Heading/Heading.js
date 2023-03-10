import Button from '../Button/Button';
import ContentEditable from 'react-contenteditable';
import { CheckLg, XLg, Pencil } from 'react-bootstrap-icons';
import { useState, useMemo } from 'react';

import './heading.css';

export default function Heading({heading, modify, remove}) {
    const [value, setValue] = useState(heading.content);
    useMemo(() => setValue(heading.content), [heading])

    function save() {
        modify({...heading, content: value});
    }

    function keyDown(e) {
        if (e.key === 'Enter') {
            console.log('called');
            e.preventDefault();
            e.target.blur();
            modify({...heading, content: e.target.textContent});
        }
    }
    
    return (
        <div className='heading heading-edit row' onBlur={save} onKeyDown={keyDown}>
            <div className='col-11 d-flex align-items-center'>
                <ContentEditable tagName='h2' html={value} onChange={e => setValue(e.target.value)} onKeyDown={keyDown} spellCheck={false} />
            </div>
            <div className='heading-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={remove}><XLg /></Button>
            </div>
        </div>
    )
}