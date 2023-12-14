import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const DocumentArea = () => {
    const [textareacontent, setTextareacontent] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaChange = (event: any) => {
        setTextareacontent(event.target.value);
    };

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareacontent]);


    const handleClearClick = () => {
        setTextareacontent('');
    };

    const handleSubmitClick = () => {
        
        console.log(textareacontent);
    }

    return (
        <div>
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
        </div>
    );
};

export default DocumentArea;