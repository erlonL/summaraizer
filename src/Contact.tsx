// Contact.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './App';
import Documentation from './Documentation';
import './css/Contact.css';
import CustomCard from './components/CustomCard';
import { useEffect, useState } from 'react';

import contacts from './json/contacts.json';
import { GET_CONTACTS } from './fetch';

interface Contact {
  name: string;
  githubUser: string;
  githubURL: string;
  img: string;
  occupation: string;
}

const Contact = () => {

    const [contacts, setContacts] = useState<Contact[]>([]); // Update the type of 'contacts'

    useEffect(() => {
        const fetchContacts = async () => {
            const contacts_response = await GET_CONTACTS();
            setContacts(contacts_response);
        }
        fetchContacts();
    }, []);

    return (
      <div className='Contact'>
        <div className='contact-wrapper'>
          {contacts.map((contact) => (
            <CustomCard
              name={contact.name}
              githubUser={contact.githubUser}
              githubURL={contact.githubURL}
              img={contact.img}
              occupation={contact.occupation} // Add the 'occupation' property
            />
          ))}
        </div>
      </div>
    );
  };

export default Contact;
