import React from 'react';
import styled from 'styled-components';

import '.././css/App.css';

type LabelProps = {
    isSelected: boolean;
};

const StyledRadio = styled.label<LabelProps>`
    background-color: var(--props-color);
    color: var(--reverse-text-color);
    border: 2px solid var(--accent-color);

    padding: 7.5px 15px;
    font-size: 16px;
    border-radius: 15%;
    transition: 0.2s;
    cursor: pointer;

    opacity: ${(props: any) => props.isSelected ? '0.8' : '1'};

    border: ${(props: any) => props.isHovered && props.isSelected ?  '2px solid var(--reverse-props-color)' :
    props.isHovered && !props.isSelected ? '2px solid #B3B3B3' :
    '2px solid white'},

    &:hover {
        border 2px solid var(--reverse-props-color);
        // background-color: var(--reverse-props-color);
        // color: var(--text-color);
    }
    &:active {
        border 2px solid var(--props-color);
        // background-color: var(--reverse-props-color);
        // color: var(--text-color);
    }
`;

const StyledRadioInput = styled.input`
    cursor: pointer;
    color: var(--reverse-text-color);

    type: radio;
    value = ${(props: any) => props.value};
    checked = ${(props: any) => props.isSelected};
    onChange = ${(props: any) => props.handleChange};
`;

const CustomRadio = (props: any) => {
    const { value, selectedValue, setSelected, style} = props;

    // const handleChange = (event: any) => {
    //     setSelected(event.target.value);
    // };

    const isSelected = selectedValue === value;

    const [isHovered, setIsHovered] = React.useState(false);

    const RadioStyle = {
        backgroundColor: 'var(--props-color)',
        color: 'var(--reverse-text-color)',
        border: '2px solid var(--accent-color)',
        
        padding: '7.5px 15px',
        fontSize: '16px',
        borderRadius: '15%',
        transition: '0.2s',
        cursor: 'pointer',
        opacity: isSelected ? '0.8' : '1',
        ...style
    }


    return (
        <StyledRadio 
        isSelected={isSelected}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        style={{
            ...RadioStyle,
            border: (isHovered && isSelected) ?  '2px solid var(--accent-color)' :
            (isHovered && !isSelected) ? '2px solid var(--props-border-hover)' :
            (!isHovered && isSelected) ? '2px solid var(--accent-color)' :
            '2px solid var(--accent-color)'


        
        }}>
            <StyledRadioInput 
                type="radio"
                value={value}
                checked={isSelected}
                onChange={(event: any) => setSelected(event.target.value)}
                />
            {value}
        </StyledRadio>
    );
};

export default CustomRadio;