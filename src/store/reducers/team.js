import { createSlice } from '@reduxjs/toolkit';

const team = createSlice({
  name: 'team',
  initialState: {
    members: []
  },
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    deleteMember: (state, action) => {
      const index = state.members.findIndex((team) => team.id === action.payload);
      if (index !== -1) {
        state.members.splice(index, 1);
      }
    }
  }
});

export const { addMember, deleteMember } = team.actions;

export default team.reducer;
