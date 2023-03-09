import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../Button/Button';
import Events from 'renderer/Events/Events';
import { useState } from 'react';
import { useEffect } from 'react';

import './setting.css';

/**
 * Component that displays a single `setting`. Its properties are `settingName`,
 * `setting` and `modify`. In order to modify the setting, `modify` should be
 * called. The value to be passed to the function is the entire setting.
 */
export default function Setting({setting, modify}) {

    function setValue(e) {
        setting.value = e.target.value;
        modify(setting);
    }
    
    // Render a select element
    if (setting.type == 'select') {
        const options = setting.options.map((option, index) => {
            return <option value={option} key={index}>{option}</option>
        });

        return (
            <div className='setting'>
                <h3>{setting.name}</h3>
                <select className='setting-input' onChange={setValue} value={setting.value}>
                    {options}
                </select>
            </div>
        )
    }

    // Render a switch for booleans
    else if (setting.type == 'bool') {

        function setValue(e) {
            setting.value = e.target.checked;
            modify(setting);
        }

        const swtch = (
            setting.value? <input className='form-check-input' type='checkbox' onChange={setValue} checked />
            : <input className='form-check-input' type='checkbox' onChange={setValue} />
        )

        return (
            <div className='setting'>
                <h3>{setting.name}</h3>
                <div className='form-check form-switch'>
                    {swtch}
                </div>
            </div>
        )
    }

    // Render a text input
    else if (setting.type == 'text') {
        return (
            <div className='setting'>
                <h3>{setting.name}</h3>
                <input type='text' className='setting-input' value={setting.value} onChange={setValue} />
            </div>
        )
    }

    // Render a file dialog
    else if (setting.type == 'filepath') {
        return (
            <div className='setting'>
                <h3>{setting.name}</h3>
                <p>{setting.value}</p>
                <Button type='outline' onClick={() => {
                    Events.fire('searchFile', (path) => modify({...setting, value: path}));
                }}>Select File</Button>
            </div>
        );
    }

    // Render a text input
    else if (setting.type == 'code') {

        // There are two different ways of saving the typed code: either by
        // blur or by being inactive for 10 seconds

        let timeoutID;
        // Timeout that executes setValue if not called again
        function storeValueAfterTimeout(e) {
            setting.value = e.target.value;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                modify(setting);
            }, 10000);
        }

        return (
            <div className='setting'>
                <h3>{setting.name}</h3>
                <div data-color-mode={window.settings.theme.value}>
                    <CodeEditor value={setting.value} language={setting.language} onChange={storeValueAfterTimeout} onBlur={setValue} padding={15} />
                </div>
            </div>
        )
    }
}