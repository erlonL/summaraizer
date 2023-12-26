// Documentation.tsx
import React from 'react';
import './css/Documentation.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

const Documentation = () => {

    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(require('./md/documentation.md'))
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);
    
    return(
        <div className='Documentation'>
            <div className='main-doc-wrapper'>
                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    ) 
        
};

export default Documentation;
