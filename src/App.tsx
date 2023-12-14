import React, { useState, useRef, useEffect, HTMLInputTypeAttribute } from 'react';
import './App.css';
// import DocumentArea from './components/documentArea';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { RadioGroup, Radio } from 'react-radio-group';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import axios from 'axios';
// import LanguageDropdown from './components/LanguageDropdown';
// import NumberTextarea from './components/NumberTextarea';
// import { FormControlLabel } from '@material-ui/core';

function App() {
    const [selectedMethod, setMethod] = useState('');
    const [selectedLanguage, setLanguage] = useState('');
    const [sentenceNumber, setSentenceNumber] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [textareacontent, setTextareacontent] = useState('');
    const [outputText, setOutputText] = useState('');


    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const outputTextRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaChange = (event: any) => {
        setTextareacontent(event.target.value);
    };

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        setMethod('LSA');
        setLanguage('portuguese');
        setDocumentType('text');
        setSentenceNumber('5');
    }, [textareacontent]);

    useEffect(() => {
        if(outputTextRef.current){
            outputTextRef.current.style.height = 'auto';
            outputTextRef.current.style.height = `${outputTextRef.current.scrollHeight}px`;
        }
    }, [outputText]);


    const handleMethodChange = (eventKey: any) => {
        setMethod(eventKey);
    }
    const supportedMethods = ['LSA', 'luhn'];


    const handleLanguageChange = (eventKey: any) => {
        setLanguage(eventKey);
    }
    const supportedLanguages = ['portuguese', 'english']; // ATS

    const handleSentenceChange = (event: any) => {
        setSentenceNumber(event.target.value);
    }

    // const handleDocumentTypeChange = (event: any) => {
    //     setDocumentType(event.target.value);
    // }

    const handleClearClick = () => {
        setTextareacontent('');
        setOutputText('');
    };

    const handleSubmitClick = () => {
        const data = {
          'data': [
            selectedMethod,
            selectedLanguage,
            sentenceNumber,
            documentType, // URL or text
            textareacontent
          ],
          "cleared":false,
          "example_id":null,
          "session_hash":""
        }

        const json = JSON.stringify(data);

        console.log(json);

        const response = window.fetch('https://issam9-sumy-space.hf.space/api/predict/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: json
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data.data[0]);
          setOutputText(data.data[0]);
        })
    }

    const handleRadioChange = (event: any) => {
      setDocumentType(event.target.value);
    };


  return (
    <div className='App'>
      <div className='Header'>
        <h1>This is a header!</h1>
      </div>

      <div className='BodyHeader'>
        <h2>Body Header!</h2>
        {/* <p>Some cool text</p>
        <p>This project is</p>
        <p>about</p> */}
      </div>

      <div className='Body'>
        <div className='InputSide'>
          <h3>Input Area!</h3>
          <div className='Dropdown'>
            <label>Algorithm</label>
            <Dropdown onSelect={handleMethodChange}>
            <Dropdown.Toggle id="dropdown-basic">
                {selectedMethod}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {supportedMethods.map((method) => (
                    <Dropdown.Item eventKey={method}>{method}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>
            {/* <MethodDropdown /> */}
          </div>

          <div className='Dropdown'>
            <label>Language</label>
            <Dropdown onSelect={handleLanguageChange}>
            <Dropdown.Toggle id="dropdown-basic">
                {selectedLanguage}
            </Dropdown.Toggle>
        
            <Dropdown.Menu>
                {supportedLanguages.map((language) => (
                    <Dropdown.Item eventKey={language}>{language}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>
            {/* <LanguageDropdown /> */}
          </div>

          <div className='sentencesArea' style={{flexDirection: 'row', display: 'flex'}}>
            <label>Sentences</label>
            <textarea value={sentenceNumber} onChange={handleSentenceChange} style={{width: '50%', height: '50px'}} />
            {/* <NumberTextarea style={{width: '50%', height: '50px'}}/> */}
          </div>

          <div id='radio-group' style={{display: 'flex', flexDirection: 'row'}}>
            <div className='typeRadio' onChange={handleRadioChange} >
              <input type="radio" value="URL" name="documentType" /> URL
            </div>
            <div className='typeRadio' onChange={handleRadioChange}>
              <input type="radio" value="text" name="documentType"/> text
            </div>
          </div>

          <div style={{width: '100%'}}>
              <h4>Input</h4>
              <textarea 
                ref={textareaRef}
                value={textareacontent}
                onChange={handleTextareaChange} 
                style = {{width: '100%'}}
              />  
              <div style={{width: "100%", flexDirection: 'row', display: 'flex', background: "#000000"}}>
                <Button onClick={handleClearClick} style={{width:'100%', height: '50px', fontSize: '20px', margin: '5px'}}>Clear</Button> 
                <Button onClick={handleSubmitClick} style={{width:'100%', height: '50px', fontSize: '20px', margin: '5px'}}>Submit</Button>
              </div>
              {/* <DocumentArea /> */}
          </div>

          
        </div>

        <div className='OutputSide'>
          <h3>Output Area!</h3>

          <div className='outputArea'>
            <h4>Output</h4>
            <textarea readOnly 
            name="output" 
            style= {{width: '100%'}}
            value={outputText}
            ref={outputTextRef}>
            </textarea>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default App;
