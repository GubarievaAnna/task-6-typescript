import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Contact = {
  name: string;
  number: string;
  id: string;
}

type typesSliseData = {
  items: Contact[];
  filter: string;
};

const initialState: typesSliseData = {
  items: [],
  filter: "",
};

const slice = createSlice({
  name: "contacts",
  initialState: initialState,
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
