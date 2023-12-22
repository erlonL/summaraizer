// Contact.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './App';
import Documentation from './Documentation';
import './css/Contact.css';
import CustomCard from './components/CustomCard';

import contacts from './json/contacts.json';


const Contact = () => {

    return (
      <div className='Contact'>
        <div className='contact-wrapper'>
          {contacts.map((contact) => (
            <CustomCard
              name={contact.name}
              occupation={contact.occupation}
              githubUser={contact.githubUser}
              githubURL={contact.githubURL}
              img={contact.img}
            />
          ))}
        </div>
      </div>
    );
  };

export default Contact;
