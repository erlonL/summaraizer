import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const MethodDropdown = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (eventKey: any) => {
        setSelectedOption(eventKey);
    };
    
    const supportedMethods = ['LSA', 'Luhn'];

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle id="dropdown-basic">
                {selectedOption || 'LSA'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {supportedMethods.map((method) => (
                    <Dropdown.Item eventKey={method}>{method}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MethodDropdown;