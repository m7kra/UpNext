import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../Button/Button';
import Events from 'renderer/Events/Events';
import Select from '../Select/Select';
import { useState } from 'react';
import { useEffect } from 'react';

import './setting.css';

/**
 * Component that displays a single `setting`. Its properties are `settingName`,
 * `setting` and `modify`. In order to modify the setting, `modify` should be
 * called. The value to be passed to the function is the entire setting.
 */
export default function Setting({setting, modify, children}) {

    let renderedSetting;
    
    // Render a select element
    if (setting.type == 'select') {
        renderedSetting = (
            <Select
                options={setting.options}
                value={setting.value}
                onChange={(v) => modify({...setting, value: v})}
            />
        );
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
        renderedSetting = (
            <div className='form-check form-switch'>
                {swtch}
            </div>
        );
    }

    // Render a text input
    else if (setting.type == 'text') {
        renderedSetting = <input type='text' className='setting-input' value={setting.value} onChange={setValue} />;
    }

    // Render a file dialog
    else if (setting.type == 'filepath') {
        renderedSetting = (
            <>
                <Button type='outline' onClick={() => {
                    Events.fire('searchFile', (path) => modify({...setting, value: path}));
                }}>Select File</Button>
                <Button type='outline' onClick={() => {
                    Events.fire('showFile', setting.value);
                }}>Show Current File</Button>
                <div className='ps-2'><code>{setting.value}</code></div>
            </>
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

        renderedSetting = (
            <div data-color-mode={window.settings.theme.value}>
                <CodeEditor value={setting.value} language={setting.language} onChange={storeValueAfterTimeout} onBlur={setValue} padding={15} />
            </div>
        );
    }

    else if (setting.type == 'custom') renderedSetting = children;

    return (
        <div className='setting'>
            <h2>{setting.name}</h2>
            <p className='setting-description'>
                {setting.description? setting.description : null}
            </p>
            {renderedSetting}
        </div>
    );
}