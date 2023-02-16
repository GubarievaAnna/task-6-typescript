import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { RootState } from "../../types/state";
import { addContact } from "../../redux/contacts/contactsActions";


const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const selectItems = (state: Pick<RootState, "contacts">) => state.contacts.items;
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

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
    dispatch(addContact(name));
    reset();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label >
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={onInputChange}
          required
        />
      </label>
      <label >
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={onInputChange}
          required
        />
      </label>
      <button type="submit">
        Add a contact
      </button>
    </form>
  );
};

export default ContactForm;
