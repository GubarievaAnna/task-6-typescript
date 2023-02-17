import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice";
import s from './ContactForm.module.css';

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const items = useAppSelector((state) => state.contacts.items);
  const dispatch = useAppDispatch();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const repeatOfNames = items.find(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );
    if (repeatOfNames) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));
    reset();
  };

  return (
    <form onSubmit={onFormSubmit} className={s.form}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={onInputChange}
          className={s.input}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={onInputChange}
          className={s.input}
          required
        />
      </label>
      <button type="submit" className={s.button}>Add a contact</button>
    </form>
  );
};

export default ContactForm;
