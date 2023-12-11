import React, { useState } from 'react';

const DocumentArea = () => {
    const [textareacontent, setTextareacontent] = useState('');

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareacontent(event.target.value);
    };

    const calculateTextareaHeight = () => {
        const lineHeight = 20;
        const numberOfLines = textareacontent.split('\n').length;
        const minHeight = 40;

        return `${Math.max(numberOfLines * lineHeight, minHeight)}px`;
    };

    const textareaStyle = {
        width: '100%',
        height: calculateTextareaHeight(),
    };

    return (<textarea 
        style={textareaStyle} 
        value={textareacontent} 
        onChange={handleTextareaChange} 
        /> 
    );
};

export default DocumentArea;