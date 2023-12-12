import React, { useState } from 'react';

const NumberTextarea = (props: any) => {
    const [value, setValue] = useState('');

    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        const intValue = parseInt(inputValue, 10);

        if (!isNaN(intValue) || inputValue === '') {
            setValue(inputValue);
        }
    };

    return (
        <textarea value={value} onChange={handleChange} style={props.style} />
    );
};

export default NumberTextarea;