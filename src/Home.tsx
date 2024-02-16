import React, { useState, useRef, useEffect } from 'react';
import './css/Home.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Link, useRoutes, Navigate } from 'react-router-dom';
import App from './App';
import Documentation from './Documentation';
import Contact from './Contact';
import ScrollToTop from './components/ScrollToTop';

function Home() {
    const [nav, setNav] = React.useState('');

    const location = useLocation();

    const isDocumentationRoute = location.pathname.includes('documentation');

    const isContactRoute = location.pathname.includes('contact');

    const isDocumentationSelected = nav === 'documentation' || isDocumentationRoute;
    const isContactSelected = nav === 'contact' || isContactRoute;

    // Listen to nav change and scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [nav]);

    
    // const isSummarizAISelected = nav === 'summarizai';

  return (
    <>
        <ScrollToTop />
        <nav className={`nav-wrapper ${((isContactRoute) || (isDocumentationRoute) ) ? 'sticky' : ''}`}>
        {/* <nav className={`nav-wrapper sticky`}> */}

            <div className='title-wrapper'>
                <Link id='title-link'
                    onClick={() => setNav('summaraizer')} to='/'>
                        
                        <span>
                            <p>Summar<span style={{color: '#0077FF'}}>AI</span>zer</p>
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
                    onClick={() => setNav('documentation')} to='/documentation'>
                        <p>Documentation</p>
                    </Link>
                </div>
                <div className='router-element'>
                    <Link className='router-link' 
                    id={isContactSelected? 'enabled-link' : 'disabled-link'} 
                    onClick={() => setNav('contact')} to='/contact'>
                        <p>Contact</p>
                    </Link>
                </div>
            </div>
        </nav>

            <Routes>
                {/* <Route path='/' element={<Navigate to='/summaraizer' />} /> */}
                <Route path="/" element={<App />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/contact" element={<Contact />} />

                {/* <Route path="/#/documentation" element={<Navigate to= '/documentation' />} />
                <Route path="/#/contact" element={<Navigate to='/contact' />} /> */}
            </Routes>

        <div className='Footer'>
            <div className='footer-icons-wrapper'>
                <a href="https://github.com/erlonl/summaraizer">
                    <img 
                    src={require("./img/github-mark.png")} 
                    alt="github logo"
                    className='footer-icon-img'
                    />
                </a>
                <a href="https://aria.ci.ufpb.br/tail/">
                    <img 
                    src={require("./img/tail.jpg")} 
                    alt="tail logo"
                    className='footer-icon-img'
                    />
                </a>
                <a href="https://aria.ci.ufpb.br/">
                    <img 
                    src={require("./img/aria.jpg")} 
                    alt="aria logo"
                    className='footer-icon-img'
                    />
                </a>
            </div>
        </div>
    </>

      


  );
}

export default Home;