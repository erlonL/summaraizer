import React from 'react';

const CustomRadio = (props: any) => {
    const { value, selectedValue, setSelected } = props;

    const handleChange = (event: any) => {
        setSelected(event.target.value);
    };

    const isSelected = selectedValue === value;

    return (
        <label style={{backgroundColor: isSelected? '#0B5ED8' : '#0D6EFD',
        color: 'white',
        padding: '7.5px 15px',
        margin: '5px',
        fontSize: '16px',
        border: '2px #444',
        borderRadius: '20%',
        cursor: 'pointer'}}>
            <input
                type="radio"
                value={value}
                checked={selectedValue === value}
                onChange={handleChange}
                style={{cursor: 'pointer'}}
            />
            {value}
        </label>
    );
};

export default CustomRadio;