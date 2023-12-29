import React from "react";
import Select from "react-select";
import styled from "styled-components";

import ".././css/App.css";


const StyledSelect = styled(Select)`
    background-color: var(--props-color);
    color: var(--reverse-text-color);

    &:hover {
        background-color: var(--reverse-props-color);
        color: var(--text-color);
    }
    padding: 7.5px 15px;
    font-size: 16px;
    border: 2px solid var(--accent-color);
    border-radius: 10%;
    transition: 0.2s;
    cursor: pointer;
    width: fit-content;
    white-space: nowrap;

    style = ${(props: any) => props.style};
`;

const CustomDropdown = (props: any) => {
    const { supportedOptions, selectedOption, setOption } = props;

    const handleOptionChange = (eventKey: any) => {
        setOption(eventKey);
    };

    // const options = supportedOptions.map((option: any) => ({ value: option, label: option }));
    
    return (
        <Select 
        options={supportedOptions}
        onChange={handleOptionChange} 
        value={selectedOption} 
        defaultValue={selectedOption} 
        formatOptionLabel={(item: any) => (
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {(item.image === undefined) || (item.image === null) || (item.image === "") ?
                    null :
                    <img src={item.image} style={{width: '12px', height: '12px'}} />
        }
                <div style={{marginRight: '5px', color: 'var(--reverse-text-color)'}}>{item.label}</div>
            </div>
        )}
        styles={{
            control: (provided, state) => ({
                ...provided,
                background: 'var(--props-color)',
                color: 'var(--reverse-text-color)',
                border: '2px solid var(--accent-color)',
                borderRadius: '10%',
                transition: '0.2s',
                // cursor: 'pointer',
                '&:focus':{
                    color: 'var(--text-color)',

                },
                width: 'fit-content',
                whiteSpace: 'nowrap'
            }),
            option: (provided, state) => ({
                ...provided,
                background: state.isSelected ? 'var(--accent-color)' : 'var(--props-color)',
                color: 'var(--reverse-text-color)',

                transition: '0.3s',
                '&:hover': {
                    backgroundColor: 'var(--reverse-props-color)',
                    color: 'var(--text-color)'
                },
                marginRight: '5px',

                cursor: 'pointer'
            }),
            menu: (provided, state) => ({
                ...provided,
                color: 'var(--reverse-text-color)',
                background: 'white',
                border: '2px solid var(--accent-color)',
                // cursor: 'pointer',
                width: 'fit-content',
                whiteSpace: 'nowrap',
                '&:hover': {
                    // backgroundColor: 'var(--menu-color)'
                    // background: 'var(--reverse-props-color)',
                    color: 'var(--text-color)'
                }
            }),
            
        }} />
    );
};

export default CustomDropdown;