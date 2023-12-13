import React from 'react';
import './App.css';
import DocumentArea from './components/documentArea';
import Button from 'react-bootstrap/Button';
import MethodDropdown from './components/MethodDropdown';
import LanguageDropdown from './components/LanguageDropdown';
import { RadioGroup, Radio } from 'react-radio-group';
import NumberTextarea from './components/NumberTextarea';
// import { FormControlLabel } from '@material-ui/core';

function App() {
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
            <MethodDropdown />
          </div>

          <div className='Dropdown'>
            <label>Language</label>
            <LanguageDropdown />
          </div>

          <div className='sentencesArea' style={{flexDirection: 'row', display: 'flex'}}>
            <label>Sentences</label>
            <NumberTextarea style={{width: '50%', height: '50px'}}/>
          </div>

          <div className='URL/text'>
            <RadioGroup>
              {/* <FormControlLabel value="URL" control={<Radio />} label="URL" />
              <FormControlLabel value="text" control={<Radio />} label="Text" /> */}
            </RadioGroup>

          </div>

          <div style={{width: '100%'}}>
              <h4>Input</h4>
              <DocumentArea />
          </div>

          
        </div>

        <div className='OutputSide'>
          <h3>Output Area!</h3>

          <div className='outputArea'>
            <h4>Output</h4>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default App;
