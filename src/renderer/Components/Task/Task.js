import Button from '../Button/Button';
import { Circle, CircleFill, XLg, X, Pencil, CheckLg, CalendarWeek } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import ContentEditable from 'react-contenteditable';
import { useState, useMemo, forwardRef } from 'react';
import Select from '../Select/Select';

import './task.css';

export default function Task({task, modify, remove}) {
    const [value, setValue] = useState();
    const [complete, setComplete] = useState();
    const [deadline, setDeadline] = useState();
    const [priority, setPriority] = useState();

    useMemo(() => {
        setValue(task.content);
        setComplete(task.complete);
        const tmp = task.deadline? task.deadline.split('/') : null;
        setDeadline(tmp? new Date(tmp[2], tmp[1] - 1, tmp[0]) : null);
        setPriority(task.priority);
    }, [task]);

    function toggleComplete() {
        setComplete(!complete);
        modify({...task, complete: !complete});
    }

    function saveDeadline(deadline) {
        setDeadline(deadline);
        modify({...task, content: value, complete: complete, deadline: deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null});
    }

    function savePriority(priority) {
        setPriority(priority);
        modify({...task, priority: priority});
    }

    function save() {
        modify({...task, content: value, complete: complete, deadline: deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null});
    }

    const deadlineString = deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null;

    return (
        <div className={'task row ' + (task.complete? 'complete ' : '') + task.priority} onBlur={save}>
            <div className='col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={toggleComplete}>
                    {complete? <CircleFill /> : <Circle />}
                </Button>
            </div>
            <div className='task-body col-7'>
                { deadline? <p className='task-deadline'>{deadlineString}</p> : null }
                <ContentEditable className='task-content' tagName='p' html={value? value : task.content} onChange={e => setValue(e.target.value)} spellCheck={false} />
            </div>
            <div className='task-utils col-2 d-flex align-items-center justify-content-center'>
                <Select
                    value={task.priority}
                    onChange={(value) => savePriority(value)}
                    options={['low', 'medium', 'high']}
                />
            </div>
            <div className='task-utils d-flex col-1 align-items-center justify-content-center'>
            { deadline? 
                <Button onClick={() => saveDeadline(null)}><CalendarWeek /></Button> :
                <DatePicker selected={deadline} onChange={saveDeadline} customInput={<Button><CalendarWeek /></Button>} />
            }
            </div>
            <div className='task-utils d-flex col-1 align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    )
}