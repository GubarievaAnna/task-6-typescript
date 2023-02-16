export interface RootState {
    contacts: {
      items: { name: string; number: string }[];
      filter: string;
    };
  }

