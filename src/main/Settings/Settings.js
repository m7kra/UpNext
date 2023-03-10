import settings from 'electron-settings';
import fs from 'fs';
import { app } from 'electron';
import path from 'path';
import { platform } from 'os';

const customCSSDirectory = path.join(app.getPath('userData'), 'css');
const customCSSPath = path.join(app.getPath('userData'), 'css', 'custom.css');

/**
 * Class that manages app settings. Settings are represented as an array
 * containing `subSettings`. These, in turn, have a property `type` which
 * determines what the other properties are and what should be displayed in the
 * `Settings` component.
 */
export default class Settings {

    /**
     * Gets app settings. If none are defined, return default settings.
     * @return {Object} settings
     */
    static async get() {
        // Get the stored settings and decide whether to use the default ones
        let definedSettings = await settings.get();

        // If last version is different than the current one, then the tutorial
        // should be shown
        if (!definedSettings.version || definedSettings.version.value != defaultSettings.version.value) {
            definedSettings.version = defaultSettings.version;
            definedSettings.firstTime = defaultSettings.firstTime;
        }
        
        // To ensure version compatibility, copy all the missing properties to
        // the defined settings
        definedSettings = {...defaultSettings, ...definedSettings};

        // Add custom CSS
        const customCSS = Settings.getCustomCss();
        definedSettings.customCSS = defaultSettings.customCSS;
        definedSettings.customCSS.value = customCSS;
        
        return definedSettings;
    }

    /**
     * Store the provided `settings`
     * @param {Object} settings 
     */
    static async set(newSettings) {
        // Store CSS
        if (newSettings.customCSS) {
            Settings.setCustomCss(newSettings.customCSS.value);
            delete newSettings.customCSS;
        }

        await settings.set(newSettings);
    }

    /**
     * Stores the predefined settings.
     */
    static async reset() {
        // firstTime is never saved as true
        const temp = {...defaultSettings};
        temp.firstTime.value = false;
        await settings.set(temp);
        this.setCustomCss('');
    }

    /**
     * Gets the user-defined CSS, returning `''` if none is defined.
     * @return {string} CSS
     */
    static getCustomCss() {
        if (!fs.existsSync(customCSSPath)) return '';
        else return fs.readFileSync(customCSSPath).toString();
    }

    /**
     * Auxiliary method that saves the user-defined CSS.
     * @param {string} customCSS 
     */
    static setCustomCss(customCSS) {
        // Create directory if it doesn't exist
        if (!fs.existsSync(customCSSDirectory)) fs.mkdirSync(customCSSDirectory);

        fs.writeFileSync(customCSSPath, customCSS);
    }
}

const defaultSettings = {
    categories: {
        type: 'internal',
        value: ['General', 'Appearance']
    },
    theme: {
        name: 'Theme',
        category: 'Appearance',
        type: 'select',
        options: ['light', 'dark'],
        value: 'light'
    },
    zoomFactor: {
        name: 'Zoom',
        category: 'Appearance',
        type: 'select',
        options: ['0.7', '0.8', '0.9', '1', '1.2', '1.4', '1.6', '1.8'],
        value: platform() == 'win32'? '0.8' : '1'
    },
    customCSS: {
        name: 'Custom CSS',
        category: 'Appearance',
        description: 'This allows you to change the app\'s appearence. See the documentation for more information.',
        type: 'code',
        language: 'css',
        value: ''
    },
    filePath: {
        name: 'Todo list file path',
        category: 'General',
        description: 'The path to the file where your todo list is stored. If you leave this empty, the app will use a default file.',
        type: 'filepath',
        value: ''
    },
    showCompleted: {
        name: 'Show completed tasks',
        category: 'General',
        type: 'bool',
        value: true
    },
    dimCompleted: {
        name: 'Dim completed tasks',
        category: 'General',
        type: 'bool',
        value: false
    },
    version: {
        type: 'internal',
        value: app.getVersion()
    },
    firstTime: {
        type: 'internal',
        value: true
    }
}