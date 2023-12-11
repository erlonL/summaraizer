import React from 'react';
import './App.css';
import DocumentArea from './components/documentArea';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import MethodDropdown from './components/MethodDropdown';
import LanguageDropdown from './components/LanguageDropdown';

function App() {
  return (
    <div className='App'>

      <div className='mainForm'>

        <div className='Dropdown'>
          <label>Algorithm</label>
          <MethodDropdown />
        </div>

        <div className='Dropdown'>
          <label>Language</label>
          <LanguageDropdown />
        </div>

        <div className='sentencesArea'>
          <label>Number of Sentences</label>
          <input type='string'/>
        </div>

        <DocumentArea />

        <div className='buttonArea'>
          <button type= "reset">Clear</button>
          <button type="submit">Submit</button>
        </div>

      </div>

      <div className='ResultArea'>
        <h1>Summary</h1>
        <DocumentArea />
      </div>
    
    </div>
  );
}

export default App;
