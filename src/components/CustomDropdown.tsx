import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CustomDropdown = (props: any) => {
    const { supportedOptions, selectedOption, setOption } = props;

    const handleOptionChange = (eventKey: any) => {
        setOption(eventKey);
    };
    
    return (
        <Dropdown  onSelect={handleOptionChange} >
        <Dropdown.Toggle style={{backgroundColor: '#0D6EFD'}} id="dropdown-basic" >
            {selectedOption}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {supportedOptions.map((option: any) => (
                <Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;