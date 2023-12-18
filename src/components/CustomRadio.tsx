import React from 'react';

const CustomRadio = (props: any) => {
    const { value, selectedValue, setSelected } = props;

    const handleChange = (event: any) => {
        setSelected(event.target.value);
    };

    const isSelected = selectedValue === value;

    return (
        <label style={{backgroundColor: isSelected? '#01BDFC' : '#01BDFC',
        color: 'white',
        padding: '7.5px 15px',
        margin: '5px',
        fontSize: '16px',
        border: '2px #000',
        borderRadius: '20%',
        cursor: 'pointer'}}>
            <input
                type="radio"
                value={value}
                checked={selectedValue === value}
                onChange={handleChange}
                style={{cursor: 'pointer', color: '#000000', border: 'none'}}
            />
            {value}
        </label>
    );
};

export default CustomRadio;