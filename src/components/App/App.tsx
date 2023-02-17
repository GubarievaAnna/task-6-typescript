import React from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactsList/ContactList';
import Filter from '../Filter/Filter';
import s from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={s.container}>
      <h1 className={s.titlePhonebook}>Phonebook</h1>
      <ContactForm/>
      <h2 className={s.titleContacts}>Contacts</h2>
      <Filter/>
      <ContactList />
    </div>
  );
}

export default App;
