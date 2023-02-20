import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Contact = {
  name: string;
  number: string;
  id: string;
}

type State = {
  items: Contact[];
  filter: string;
};

// const initialState: State = {
//   items: [],
//   filter: "",
// };

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    filter: "",
  } as State,
  reducers: {
    addContact: (
      state,
      action: PayloadAction<Contact>
    ) => {
     state.items = [...state.items, action.payload]
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    filterContacts: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, filterContacts } = slice.actions;
export default slice.reducer;
