import Setting from '../Setting/Setting';
import Button from '../Button/Button';

import Events from 'renderer/Events/Events';
import { useState, useMemo } from 'react';
import './settings.css';
/**
 * Component that displays current settings, using the `Setting` component, and
 * allows to modify them. The settings `customCSS` and `firstTime` should not be
 * displayed nor modified, and the new settings should be saved automatically.
 * This component should also allow to reset the settings, reset the library and
 * to go through the tutorial again.
 */
export default function Settings({settings, displayTutorial}) {

    const [category, setCategory] = useState('General');
    const [categories, setCategories] = useState({});
    useMemo(() => {
        const newCategories = {};
        for (const i in settings.categories.value) newCategories[settings.categories.value[i]] = {};
        for (const setting in settings) {
            if (settings[setting].type == 'internal') continue;
            const category = settings[setting].category;
            newCategories[category][setting] = settings[setting];
        }
        newCategories['Actions'] = {};
        setCategories(newCategories);
    }, [settings])

    function changeSetting(setting, newValue) {
        let newSettings = {...settings};
        newSettings[setting] = newValue;
        Events.fire('saveSettings', newSettings);
    }

    const renderedCategories = [];
    for (const c in categories) {
        renderedCategories.push(
            <>
                <div className={`category${c == category? ' selected' : ''}`} onClick={() => setCategory(c)} key={renderedCategories.length}>
                    {c}
                </div>
                <div className='spacer-12' />
            </>
        );
    }

    const renderedSettings =  [];
    if (category != 'Actions') for (const setting in categories[category]) {
        const modify = (newValue) => changeSetting(setting, newValue);
        renderedSettings.push(
            <div key={renderedSettings.length}>
                <Setting setting={settings[setting]} modify={modify}/>
                <div className='spacer-24' />
            </div>
        );
    }
    else {
        renderedSettings.push(<Setting setting={{
            type: 'custom',
            name: 'Reset Settings',
            description: 'This will return all settings back to normal. It will also erase custom CSS.'
        }}>
           <Button onClick={() => Events.fire('resetSettings')} type='outline'>Reset Settings</Button> 
        </Setting>);
        renderedSettings.push(
            <div className='spacer-24' />
        );
        renderedSettings.push(<Setting setting={{
            type: 'custom',
            name: 'Tutorial',
            description: 'Watch the app\'s tutorial again'
        }}>
           <Button onClick={displayTutorial} type='outline'>Tutorial</Button> 
        </Setting>);
    }

    return (
        <div id='settings'>
            <div className='spacer-24' />
            <div className='row justify-content-center'>
                <div className='col-11'>
                    <h1>Settings:</h1>
                </div>
            </div>
            <div className='spacer-48' />
            <div className='row justify-content-center'>
                <div className='col-3'>
                    {renderedCategories}
                </div>
                <div className='col-8'>
                    {renderedSettings}
                </div>
            </div>
        </div>
    )
}