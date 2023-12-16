import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import CustomDropdown from './components/CustomDropdown';
import CustomRadio from './components/CustomRadio';

import { client } from "@gradio/client";



function App() {
    const [selectedMethod, setMethod] = useState('LSA');
    const [selectedLanguage, setLanguage] = useState('portuguese');

    const [sentenceNumber, setSentenceNumber] = useState('5');
    const [documentType, setDocumentType] = useState('URL');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const inputTextRef = useRef<HTMLTextAreaElement | null>(null);
    const outputTextRef = useRef<HTMLTextAreaElement | null>(null);


    const isIframeDisabled = outputText === '';

    const handleInputTextChange = (event: any) => {
        setInputText(event.target.value);
    };

    useEffect(() => {
      if(inputTextRef.current){
          inputTextRef.current.style.height = '20vh';
          inputTextRef.current.style.height = `${inputTextRef.current.scrollHeight}px`;
      }
    }, [inputText]);

    useEffect(() => {
      if(outputTextRef.current){
          outputTextRef.current.style.height = '5vh';
          outputTextRef.current.style.height = `${outputTextRef.current?.scrollHeight}px`;
      }
    }, [outputText]);

    const supportedMethods = ['LSA', 'luhn'];
    const supportedLanguages = ['portuguese', 'english']; // ATS


    const handleSentenceChange = (event: any) => {
        setSentenceNumber(event.target.value);
    }

    const handleClearClick = () => {
        setInputText('');
        setOutputText('');
    };

    const handleRequest = async (jsonData: any) => {
      try{
        setIsLoading(true);
        const response = await fetch('https://issam9-sumy-space.hf.space/api/predict/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        });
    
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
    
        const data = await response.json();
    
        return data;
    
      }catch(e){
        console.log('Error on server:', e);
        return;
      } finally {
        setIsLoading(false);
      }
    }

    const handleSubmitClick = () => {
        if(inputText === ''){
          console.log('Error: empty input');
          return;
        }

        const data = {
          "cleared":false,
          'data': [
            selectedMethod,
            selectedLanguage,
            sentenceNumber,
            documentType, // URL or text
            inputText
          ],
          "example_id":null,
          "session_hash":"cb1l3gk9k7s"
        }

        const json = JSON.stringify(data);

        const response = handleRequest(json);

        response.then((data) => {
          try{
            console.log(data['data'][0]);
            setOutputText(data['data'][0]);
          }catch(e){
            console.log('Error on server:', e);
          } finally {
            setIsLoading(false);
          }
        });
    }
  
  return (

    
    <div className='App'>


      <div className='Header'>
        {/* <div id='img-header-wrapper' style={{width: '7.5vw', height: 'auto'}}>
          <div style={{background: 'black', width: '7.5vw', height: '5vw'}}></div>
          <img src="https://media.licdn.com/dms/image/C4D0BAQE-lG_lJ9CTew/company-logo_200_200/0/1630463497639/tailufpb_logo?e=2147483647&v=beta&t=x1H9GA4-qklUTbiV8FQa6LhpWUR05zwM5SwV7X_1EOc" alt="tail-logo" />
        </div> */}

        <h1 className= 'Title'>SummarizAI</h1>
      </div>

      {/* <div className='BodyHeader'>
        <p>SummarizAI Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget quam at orci rutrum semper. 
          Pellentesque eu consectetur turpis. Vestibulum eu tristique leo. Fusce congue dolor erat, 
          quis hendrerit augue sodales vel. </p>
      </div> */}

      <div className='Body'>
        
        <div className='InputSide'>
          {/* <h3>input</h3> */}

          {/* <MethodDropdown /> */}
          <div className='Dropdown'>
            <label>Algorithm</label>
            <CustomDropdown supportedOptions={supportedMethods} selectedOption={selectedMethod} setOption={setMethod} />
          </div>

          {/* Language dropdown */}
          <div className='Dropdown'>
            <label>Language</label>
            <CustomDropdown supportedOptions={supportedLanguages} selectedOption={selectedLanguage} setOption={setLanguage} />
          </div>

          <div className='sentencesArea'>
            <label>Sentences</label>
            <textarea id='sentences-textarea' value={sentenceNumber} onChange={handleSentenceChange} />
          </div>
          

          {/* Document type */}
          <div className='typeArea'>
            <label>Document Type</label> 
            <div id='radio-group'>
              <CustomRadio value='URL' selectedValue={documentType} setSelected={setDocumentType} />
              <CustomRadio value='text' selectedValue={documentType} setSelected={setDocumentType} />
            </div>
          </div>

          {/* Input text area */}
          <div style={{width: '100%', paddingTop:'5px'}}>
              <h4>input</h4>
              <textarea 
                ref={inputTextRef}
                value={inputText}
                onChange={handleInputTextChange} 
                style = {{width: '100%'}}
              />  
              <div style={{width: "100%", flexDirection: 'row', display: 'flex'}}>
                <Button 
                onClick={handleClearClick} 
                style={{width:'100%', height: '50px', fontSize: '20px', margin: '5px'}}
                disabled={isLoading}>Clear</Button> 
                <Button 
                onClick={handleSubmitClick} 
                style={{width:'100%', height: '50px', fontSize: '20px', margin: '5px'}}
                disabled={isLoading}>Submit</Button>
              </div>
              {/* <DocumentArea /> */}
          </div>

          
        </div>

        <div className='OutputSide'>
          <h4>output</h4>
          
          <div className='outputArea'>
            <textarea readOnly 
            name="output" 
            style= {{width: '100%', resize: 'none', border: outputText === "" ? '2px solid black' : '2px solid #1D493C', borderRadius: '5px', padding: '10px', fontSize: '14px'}}
            value={outputText}
            ref={outputTextRef}
            disabled={isLoading}>
            </textarea>
          </div>
          {!isIframeDisabled && (
            // <iframe src={`./tts.html?data=${outputText}`}>

            // </iframe>
            <iframe src={`https://erlonl.github.io/tts?data=${outputText}`} style={{width: '100%', height: '100%'}}>

            </iframe>
          )}

        </div>

      </div>
      
      <div className='Footer'>
        {/* <p>Veja o Github do projeto | </p>
        <a href="https://github.com/erlonL/nlp-front">
          <img src="/github-mark.png" alt="github logo" />
        </a> */}
      </div>

    </div>
  );
}

export default App;
