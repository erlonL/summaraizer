// Documentation.tsx
import React from 'react';
import './css/Documentation.css';

const Documentation = () => {
    return(
        <div className='Documentation'>
            <div className='main-doc-wrapper'>
                <h1>SummarAIzer</h1>

                <p>SummarAIzer is based on two libraries</p>
                <ul>
                    <li>Sumy</li>
                    <li>Responsive Voice JS</li>
                </ul>

                <h2>Sumy</h2>
                <p>Sumy is a simple library and command line utility for <b>extracting</b> summary from <br />HTML pages or plain texts. Implemented summarization methods are:</p>

                <ul>
                    <li><b>Latent Semantic Analysis</b></li>
                    <li><b>luhn</b></li>
                    <li>Edmundson</li>
                    <li>TextRank</li>
                    <li>LexRank</li>
                    <li>random</li>
                    <li>Reduction</li>
                    <li>KLSum</li>
                </ul>

                <h2>Responsive Voice JS</h2>
                <p>ResponsiveVoice is a HTML5-based Text-To-Speech library designed to add voice features to web sites and apps across all smartphone, tablet and desktop devices.</p>
            </div>
        </div>
    ) 
        
};

export default Documentation;
