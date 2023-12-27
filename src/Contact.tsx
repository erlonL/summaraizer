// Contact.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './App';
import Documentation from './Documentation';
import './css/Contact.css';
import CustomCard from './components/CustomCard';
import { useEffect, useState, useRef } from 'react';

import contacts from './json/contacts.json';

interface Contact {
  name: string;
  githubUser: string;
  githubURL: string;
  occupation: string;
}

const Contact = () => {

    return (
      <div className='Contact'>
        <div className='contact-wrapper'>
        <CustomCard
        name={contacts[0].name}
        githubUser={contacts[0].githubUser}
        githubURL={contacts[0].githubURL}
        img={require('./img/identicons/Tiago Maritan.png')}
        occupation={contacts[0].occupation}
        >
        </CustomCard>
        {contacts.slice(1).map((contact) => (
            <CustomCard
              name={contact.name}
              githubUser={contact.githubUser}
              githubURL={contact.githubURL}
              img={require('./img/identicons/' + contact.githubUser + '.png')}
              occupation={contact.occupation}
            />
          ))}
        </div>
      </div>
    );
  };

export default Contact;
