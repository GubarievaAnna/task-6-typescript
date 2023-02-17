import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { deleteContact } from "../../redux/contactsSlice";
import s from './ContactList.module.css';

const ContactList: React.FC = () => {
  const items = useAppSelector(state => state.contacts.items);
  const filter = useAppSelector(state => state.contacts.filter);
  const dispatch = useAppDispatch();

  const filteredContacts = items.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <p className={s.paragraph}>
            <span className={s.name}>{name}</span>: {number}
          </p>
          <button
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;