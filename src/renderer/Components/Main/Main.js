import logo from '../../../../assets/icon.png';
import './main.css';

/**
 * Displays a generic banner.
 */
export default function Main() {
    return (
        <div id='main'>
            <div className='spacer-200' />
            <div id='banner'>
                <img id='logo' src={logo} height='200' />
                <h1 id='title'>M7kra</h1>
            </div>
        </div>
    );
}