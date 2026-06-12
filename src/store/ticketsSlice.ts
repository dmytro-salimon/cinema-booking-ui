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
    removeTicket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const ticket = state.items.find(item => item.id === action.payload.id);
      if (ticket && action.payload.quantity > 0) {
        ticket.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addTicket, removeTicket, updateQuantity } = ticketsSlice.actions;
export default ticketsSlice.reducer;