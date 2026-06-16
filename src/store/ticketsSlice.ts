import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ticket {
  id: string;
  title: string;
  time: string;
  date: string;
  price: number;
  quantity: number;
}

interface TicketsState {
  items: Ticket[];
}

const initialState: TicketsState = {
  items: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Omit<Ticket, 'quantity'>>) => {
      const existingTicket = state.items.find(item => item.id === action.payload.id);
      if (existingTicket) {
        existingTicket.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    clearTickets: (state) => {
      state.items = [];
    },
  },
});

export const { addTicket, clearTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;