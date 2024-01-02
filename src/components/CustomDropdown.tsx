import React from "react";
import Select, { StylesConfig } from "react-select";
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

const dropdownStyles: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--props-color)',
        color: 'var(--reverse-text-color)',
        border: '2px solid var(--accent-color)',
        borderRadius: '10%',
        transition: '0.2s',
        width: 'fit-content',
        whiteSpace: 'nowrap'
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'var(--props-background-selected)' : 'var(--props-background)',
        color: 'var(--reverse-text-color)',
        border: '0.2px solid var(--reverse-accent-color)',
        borderRadius: '10%',

        transition: '0.2s',
        '&:hover': {
            opacity: '0.8'
        },
        marginRight: '5px',
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--props-color)',
        color: 'var(--reverse-text-color)',
        border: '2px solid var(--accent-color)',
        // cursor: 'pointer',
        width: 'fit-content',
        whiteSpace: 'nowrap',
    }),
};




const CustomDropdown = (props: any) => {
    const { supportedOptions, selectedOption, setOption } = props;

    const [isHovered, setIsHovered] = React.useState(false);

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
                <div
                style={{
                    marginRight: '5px',
                    color: 'var(--reverse-text-color)'
                    }}

                    >
                        {item.label}</div>
            </div>
        )}
        styles={dropdownStyles} />
    );
};

export default CustomDropdown;