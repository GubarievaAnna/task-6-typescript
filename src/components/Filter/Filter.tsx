import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { filterContacts } from "../../redux/contactsSlice";
import s from './Filter.module.css';

const Filter: React.FC = () => {
  const filter = useAppSelector((state) => state.contacts.filter);
  const dispatch = useAppDispatch();

  return (
    <label className={s.label}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={(e) => dispatch(filterContacts(e.target.value))}
        className={s.input}
        required
      />
    </label>
  );
};

export default Filter;
