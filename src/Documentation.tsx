// Documentation.tsx
import React from 'react';
import './css/Documentation.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

const Documentation = () => {


    const [markdown, setMarkdown] = useState('');

    const [isTechInfo, setIsTechInfo] = useState(true);
    const [isUserManual, setIsUserManual] = useState(false);
    const [isAbout, setIsAbout] = useState(false);

    let key;

    useEffect(() => {
        if(isTechInfo){
            key = 'tech_info';
            setIsUserManual(false);
            setIsAbout(false);

            fetch(require('./md/tech_info.md'))
                .then(response => response.text())
                .then(text => setMarkdown(text));
        } else if(isUserManual){
            key = 'user_manual';
            setIsTechInfo(false);
            setIsAbout(false);

            fetch(require('./md/user_manual.md'))
                .then(response => response.text())
                .then(text => setMarkdown(text));
        } else if(isAbout){
            key = 'about';
            setIsTechInfo(false);
            setIsUserManual(false);

            fetch(require('./md/about.md'))
                .then(response => response.text())
                .then(text => setMarkdown(text));
        }

    }, [isTechInfo, isUserManual, isAbout]);


    return(
        <div className='Documentation'>
            <div className='topic-nav'>
                <ul>
                    <li><a href='#' onClick={(e) => {e.preventDefault(); setIsTechInfo(true); setIsAbout(false); setIsUserManual(false)}}>Technical Information</a></li>
                    <li><a href='#' onClick={(e) => {e.preventDefault(); setIsUserManual(true); setIsAbout(false); setIsTechInfo(false)}}>User Manual</a></li>
                    <li><a href='#' onClick={(e) => {e.preventDefault(); setIsAbout(true); setIsTechInfo(false); setIsUserManual(false)}}>About</a></li>
                </ul>
            </div>
            <div className='main-doc-wrapper'>
                <div className='main-doc'>
                    <ReactMarkdown key= {key}>
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    ) 
        
};

export default Documentation;
