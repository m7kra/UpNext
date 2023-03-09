import Button from '../Button/Button';
import { Circle, CircleFill, XLg, Pencil, CheckLg, Calendar } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import ContentEditable from 'react-contenteditable';
import { useState, useMemo } from 'react';

import './task.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function Task({task, modify, remove}) {
    const [value, setValue] = useState();
    const [complete, setComplete] = useState();
    const [deadline, setDeadline] = useState();

    useMemo(() => {
        setValue(task.content);
        setComplete(task.complete);
        const tmp = task.deadline? task.deadline.split('/') : null;
        setDeadline(tmp? new Date(tmp[2], tmp[1] - 1, tmp[0]) : null);
    }, [task]);

    function toggleComplete() {
        setComplete(!complete);
        modify({...task, complete: !complete});
    }

    function save() {
        modify({...task, content: value, complete: complete, deadline: deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null});
    }

    const deadlineString = deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null;

    return (
        <div className={'task row' + (task.complete? ' complete' : '')} onBlur={save}>
            <div className='col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={toggleComplete}>
                    {complete? <CircleFill /> : <Circle />}
                </Button>
            </div>
            <div className='task-body col-10'>
                <div className={`d-flex task-deadline${deadline? ' exists' : ''}`}>
                    <DatePicker selected={deadline} onChange={setDeadline} customInput={
                        deadline? <p className='me-2'>{deadlineString}</p> : <Calendar />
                    } />
                </div>
                <ContentEditable tagName='p' html={value} onChange={e => setValue(e.target.value)} spellCheck={false} />
            </div>
            <div className='d-flex col-1 align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    )
}