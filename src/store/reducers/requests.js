// types
import { createSlice } from '@reduxjs/toolkit';

// ==============================|| SLICE - REQUEST ||============================== //

const requests = createSlice({
  name: 'requests',
  initialState: [
    {
      id: '1',
      name: 'Сергей Чуваков',
      phoneNumber: '+7 999 999 99 99',
      serviceId: '1',
      reviewed: false
    },
    {
      id: '16',
      name: 'Евгений Овчинников',
      phoneNumber: '+7 999 999 99 99',
      serviceId: '1',
      reviewed: false
    },
    {
      id: '26',
      name: 'Елена Михайлова',
      phoneNumber: '+7 999 999 99 99',
      serviceId: '1',
      reviewed: true
    },
    {
      id: '2',
      name: 'Алексей Кириллов',
      phoneNumber: '+7 999 999 99 99',
      serviceId: '2',
      reviewed: false
    },
    {
      id: '3',
      name: 'Алексей Кириллов',
      phoneNumber: '+7 999 999 99 99',
      serviceId: '3',
      reviewed: true
    }
  ],
  reducers: {
    reviewRequest(state, action) {
      const request = state.find((request) => request.id === action.payload);
      state.find((request) => request.id === action.payload).reviewed = !request.reviewed;
    }
  }
});

export default requests.reducer;

export const { reviewRequest } = requests.actions;
