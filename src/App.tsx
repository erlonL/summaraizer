// Home.tsx
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import CustomDropdown from './components/CustomDropdown';
import CustomRadio from './components/CustomRadio';
import './css/App.css';

const App: React.FC = () => {

    const [sentenceNumber, setSentenceNumber] = useState('5');
    const [documentType, setDocumentType] = useState('URL');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);


    const inputTextRef = useRef<HTMLTextAreaElement | null>(null);
    const outputTextRef = useRef<HTMLTextAreaElement | null>(null);


    const isIframeDisabled = outputText === '';

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

    // const supportedMethods = ['LSA', 'luhn'];
    const supportedMethods = [
      { value: 'LSA', label: 'LSA', image: ''},
      { value: 'luhn', label: 'luhn', image: ''}
    ];
    // const supportedLanguages = ['portuguese', 'english']; // ATS
    const supportedLanguages = [
      { value: 'portuguese', label: 'portuguese', image: require('./img/languageIcons/brazil-.png')},
      { value: 'english', label: 'english', image: require('./img/languageIcons/united-states.png')}
    ];

    const [selectedMethod, setMethod] = useState(supportedMethods[0]);
    const [selectedLanguage, setLanguage] = useState(supportedLanguages[0]);

    const [selectedMethodValue, setSelectedMethodValue] = useState(supportedMethods[0]['value']);
    const [selectedLanguageValue, setSelectedLanguageValue] = useState(supportedLanguages[0]['value']);

    useEffect(() => {
      setSelectedMethodValue(selectedMethod['value']);
    }, [selectedMethod]);

    useEffect(() => {
      setSelectedLanguageValue(selectedLanguage['value']);
    }, [selectedLanguage]);

    const handleClearClick = (event: any) => {
        setButtonClicked(true);

        setInputText('');
        setOutputText('');
        setTimeout(() => {
          setButtonClicked(false);
        }, 150);
    };

    const handleRequest = async (jsonData: any) => {
      try{
        setIsLoading(true);
        setButtonClicked(true);
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
        setButtonClicked(false);
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
            selectedMethodValue,
            selectedLanguageValue,
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

    
    <div className='Home'>


      {/* <div className='Header'>
        <div id='img-header-wrapper' style={{width: '7.5vw', height: 'auto'}}>
          <div style={{background: 'black', width: '7.5vw', height: '5vw'}}></div>
          <img src="https://media.licdn.com/dms/image/C4D0BAQE-lG_lJ9CTew/company-logo_200_200/0/1630463497639/tailufpb_logo?e=2147483647&v=beta&t=x1H9GA4-qklUTbiV8FQa6LhpWUR05zwM5SwV7X_1EOc" alt="tail-logo" />
        </div>

        <h1 className= 'Title'>SummarizAI</h1>
      </div> */}

      {/* <div className='BodyHeader'>
        <p>SummarizAI Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget quam at orci rutrum semper. 
          Pellentesque eu consectetur turpis. Vestibulum eu tristique leo. Fusce congue dolor erat, 
          quis hendrerit augue sodales vel. </p>
      </div> */}

      <div className='Body'>
        
        <div className='InputSide'>
          {/* <h3>input</h3> */}

          {/* <MethodDropdown /> */}
          <div>
            <label className='input-label'>Algorithm</label>
            <CustomDropdown supportedOptions={supportedMethods} selectedOption={selectedMethod} setOption={setMethod}/>
          </div>

          {/* Language dropdown */}
          <div>
            <label className='input-label'>Language</label>
            <CustomDropdown supportedOptions={supportedLanguages} selectedOption={selectedLanguage} setOption={setLanguage}/>
          </div>

          <div className='sentencesArea'>
            <label className='input-label'>Sentences</label>
            <textarea id='sentences-textarea' value={sentenceNumber} onChange={(event: any) => setSentenceNumber(event.target.value)} />
          </div>
          

          {/* Document type */}
          <div className='typeArea'>
            <label className='input-label'>Document Type</label> 
            <div id='radio-group'>
              <CustomRadio value='URL' selectedValue={documentType} setSelected={setDocumentType} style={{marginRight: '5px'}} />
              <CustomRadio value='text' selectedValue={documentType} setSelected={setDocumentType} />
            </div>
          </div>

          {/* Input text area */}
          <div style={{width: '100%', paddingTop:'5px'}}>
              <h4>input</h4>
              <textarea 
                ref={inputTextRef}
                value={inputText}
                onChange={(event: any) => setInputText(event.target.value) } 
                style = {{width: '100%'}}
              />  
              <div style={{width: "100%", flexDirection: 'row', display: 'flex'}}>
                <Button 
                onClick={handleClearClick}

                style={{width:'100%', height: '50px', fontSize: '20px', margin: '5px', backgroundColor: 'var(--props-color)', color: 'var(--reverse-text-color)', border: '2px solid var(--props-color)', transition: 'all 0.1s ease-in-out'}}
                onMouseEnter={(e: any) => e.target.style.border = '2px solid var(--reverse-props-color)'}
                onMouseLeave={(e: any) => e.target.style.border = '2px solid var(--props-color)'}
                disabled={((isLoading) || (buttonClicked))}>Clear</Button> 

                <Button 
                onClick={handleSubmitClick} 
                style={{width:'100%', height: '50px', fontSize: '20px', margin: '5px', backgroundColor: 'var(--props-color)', color: 'var(--reverse-text-color)', border: '2px solid var(--props-color)', transition: 'all 0.1s ease-in-out'}}
                onMouseEnter={(e: any) => e.target.style.border = '2px solid var(--reverse-props-color)'}
                onMouseLeave={(e: any) => e.target.style.border = '2px solid var(--props-color)'}
                disabled={((isLoading) || (buttonClicked))}>Submit</Button>
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
            <iframe title='tts' src={`https://erlonl.github.io/tts?data=${outputText}`} style={{width: '100%', height: '100%'}}>

            </iframe>
          )}

        </div>

      </div>
      


    </div>
  );
}

export default App;
