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
          <div id='first-array-half' className='contacts-half'>
            {contacts.slice(0, contacts.length / 2).map((contact) => (
              <CustomCard
                name={contact.name}
                occupation={contact.occupation}
                githubUser={contact.githubUser}
                githubURL={contact.githubURL}
                img={contact.img}
              />
            ))}
          </div>
          <div id='second-array-half' className='contacts-half'>
            {contacts.slice(contacts.length / 2).map((contact) => (
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
      </div>
    );
  };

export default Contact;
