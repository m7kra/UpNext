import Button from '../Button/Button';
import { ArrowLeft, GearFill } from 'react-bootstrap-icons';
import Button from '../Button/Button';

import { useReducer, useMemo } from 'react';
import './tutorial.css';
import logo from '../../../../assets/icon.png';

/**
 * Component that renders a brief introductory tutorial, based on a series of
 * slides. Its single property is `setTutorial`.
 */
export default function Tutorial({ dismissTutorial }) {

    const [currentSlide, changeSlide] = useReducer((state, change) => state + change, 0);

    // Here, the slide skeleton of `content` is converted in to real html
    const slides = useMemo(() => content.map((slide, index) =>
        <div className='slide' key={index}>
            <h1>{slide.title}</h1>
            <div className='spacer-12' />
            <p className='fs-5'>{slide.text}</p>
            <div className='center-children'>
                {slide.dummies}
            </div>
            <div className='spacer-24' />
        </div>
    ), []);

    const previousButton = currentSlide != 0 && <Button onClick={() => changeSlide(-1)} type='outline'>Previous</Button>;
    const nextButton = currentSlide < content.length - 1?
        <Button onClick={() => changeSlide(1)} type='outline'>Next</Button> :
        <Button onClick={() => dismissTutorial()} type='outline'>Let's go!</Button>;

    const skip = currentSlide > 0? <Button onClick={() => dismissTutorial()} type='outline'>Skip</Button> : null;


    return (
        <>
        <div id='tutorial-backdrop' />
        <div id='tutorial'>
            {slides[currentSlide]}
            <div className='tutorial-buttons'>
                {previousButton}<div className='w-100' />{skip}{nextButton}
            </div>
        </div>
        </>
    )
}

// Content is an array of slides. Each slide may have three properties:
// `title`, `text` and `image`
const content = [{
        title: 'Welcome!',
        text: <>
            <p style={{textAlign: 'center'}}>You can review this tutorial whenever you want, in the settings.</p>
        </>
    }, {
        title: 'Additional info',
        text: <>You can review this tutorial whenever you want, in the settings.</>
    },
];

// The app's logo
function Logo({size = 32}) {
    return (
        <div style={{width: `${size}px`, aspectRatio: '1/1', backgroundSize: 'cover', backgroundImage: `url(${logo})`}}></div>
    );
}