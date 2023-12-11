import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const MethodDropdown = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleSelect = (eventKey: any) => {
        setSelectedOption(eventKey);
    };

    const supportedLanguages = ["portuguese", "english"];
    
    return (
        <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-basic">
            {selectedOption || "portuguese"}
        </Dropdown.Toggle>
    
        <Dropdown.Menu>
            {supportedLanguages.map((language) => (
                <Dropdown.Item eventKey={language}>{language}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
        </Dropdown>
    );
};

export default MethodDropdown;