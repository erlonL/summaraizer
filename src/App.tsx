import React, { useState, useRef, useEffect } from 'react';
import './App.css';
// import DocumentArea from './components/documentArea';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


function App() {
    const [selectedMethod, setMethod] = useState('');
    const [selectedLanguage, setLanguage] = useState('');
    const [sentenceNumber, setSentenceNumber] = useState('');
    const [documentType, setDocumentType] = useState('URL');
    const [textareacontent, setTextareacontent] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const outputTextRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaChange = (event: any) => {
        setTextareacontent(event.target.value);
    };

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = '20vh';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        setMethod('LSA');
        setLanguage('portuguese');
        setSentenceNumber('5');
    }, [textareacontent]);

    useEffect(() => {
        if(outputTextRef.current){
            outputTextRef.current.style.height = '5vh';
            outputTextRef.current.style.height = `${outputTextRef.current?.scrollHeight}px`;
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
        if(textareacontent === ''){
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
            textareacontent
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

    const handleRadioChange = (event: any) => {
      setDocumentType(event.target.value);
    };


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

          {/* Language dropdown */}
          <div className='Dropdown'>
            <label>Algorithm</label>
            <Dropdown onSelect={handleMethodChange} >
            <Dropdown.Toggle id="dropdown-basic" >
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


          {/* Language dropdown */}
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

          <div className='sentencesArea'>
            <label>Sentences</label>
            <textarea value={sentenceNumber} onChange={handleSentenceChange} style={{width: '50%', height: '30px', resize: 'none', marginBottom: '5px', marginLeft: '0px', fontSize: '14px'}} />
            {/* <NumberTextarea style={{width: '50%', height: '50px'}}/> */}
          </div>

          {/* Document type */}
          <div className='typeArea'>
            <label>Document Type</label> 

            <div id='radio-group' style={{display: 'flex', alignItems: 'flex-start'}}>

              <label className='typeRadio' onChange={handleRadioChange} >
                <input style={{cursor: 'pointer'}} type="radio" value="URL" name="documentType" checked={documentType === 'URL'}/> URL
              </label>

              <label className='typeRadio' onChange={handleRadioChange}>
                <input style={{cursor: 'pointer'}}type="radio" value="text" name="documentType" checked={documentType === 'text'}/> text
              </label>

            </div>
          </div>

          {/* Input text area */}
          <div style={{width: '100%', paddingTop:'5px'}}>
              <h4>input</h4>
              <textarea 
                ref={textareaRef}
                value={textareacontent}
                onChange={handleTextareaChange} 
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
          <h3>output</h3>
          
          <div className='outputArea'>
            <textarea readOnly 
            name="output" 
            style= {{width: '100%', resize: 'none', border: '2px solid #73AD21', borderRadius: '5px', padding: '10px', fontSize: '14px'}}
            value={outputText}
            ref={outputTextRef}
            disabled={isLoading}>
            </textarea>
          </div>

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
