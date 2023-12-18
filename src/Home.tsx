import React, { useState, useRef, useEffect } from 'react';
import './css/Home.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useRoutes, Navigate } from 'react-router-dom';
import App from './App';
import Documentation from './Documentation';
import Contact from './Contact';

function Home() {
    const [nav, setNav] = React.useState('');

    const isDocumentationSelected = nav === 'documentation';
    const isContactSelected = nav === 'contact';
    
    // const isSummarizAISelected = nav === 'summarizai';

  return (
    <>
        <Router>
        <nav className='nav-wrapper'>

            <div className='title-wrapper'>
                <Link id='title-link'
                    onClick={() => setNav('summaraizer')} to='/summaraizer'>
                        <span>
                            <p>SummarAIzer</p>
                        </span>
                </Link>
            </div>

            <div className='router-section' >
                {/* <div className='nav-section'>
                    <Link className='nav-link' 
                    id={isSummarizAISelected? 'enabled-link' : 'disabled-link'} 
                    onClick={() => setNav('summarizai')} to='/summarizai'>
                    <p>SummarizAI</p>
                    </Link>
                </div> */}
                <div className='router-element'>
                    <Link className='router-link' 
                    id={isDocumentationSelected? 'enabled-link' : 'disabled-link'} 
                    onClick={() => setNav('documentation')} to='summaraizer/documentation'>
                        <p>Documentation</p>
                    </Link>
                </div>
                <div className='router-element'>
                    <Link className='router-link' 
                    id={isContactSelected? 'enabled-link' : 'disabled-link'} 
                    onClick={() => setNav('contact')} to='summaraizer/contact'>
                        <p>Contact</p>
                    </Link>
                </div>
            </div>
        </nav>

            <Routes>
                {/* <Route path='/' element={<Navigate to='/summarizai' />} /> */}
                <Route path="/summaraizer" element={<App />} />
                <Route path="/summaraizer/documentation" element={<Documentation />} />
                <Route path="/summaraizer/contact" element={<Contact />} />
            </Routes>
        </Router>

        <div className='Footer'>
            <div className='footer-icons-wrapper'>
                <a href="https://github.com/erlonl/summaraizer" className='footer-icon'>
                    <img 
                    src={require("./img/github-mark.png")} 
                    alt="github logo"
                    className='footer-icon'
                    />
                </a>
                <a href="https://aria.ci.ufpb.br/tail/" className='footer-icon'>
                    <img 
                    src={require("./img/tail.jpg")} 
                    alt="tail logo"
                    className='footer-icon'
                    />
                </a>
                <a href="https://aria.ci.ufpb.br/" className='footer-icon'>
                    <img 
                    src={require("./img/aria.jpg")} 
                    alt="aria logo"
                    className='footer-icon'
                    />
                </a>
            </div>
        </div>
    </>

      


  );
}

export default Home;