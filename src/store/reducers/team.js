import { createSlice } from '@reduxjs/toolkit';

const team = createSlice({
  name: 'team',
  initialState: {
    members: []
    // [
    //   {
    //     id: 1,
    //     position: 'Специалист инноваций Fatality',
    //     avatar: 'john.png',
    //     firstName: 'Джон',
    //     lastName: 'Смит',
    //     email: 'admin@mail.com',
    //     password: 'password123'
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Мария',
    //     lastName: 'Каллас',
    //     email: 'admin2@mail.com',
    //     position: 'Руководитель департамента развития',
    //     avatar: 'maria.png',
    //     password: 'password123'
    //   },
    //   {
    //     id: 3,
    //     position: 'Главный аналитик',
    //     avatar: 'lada.png',
    //     firstName: 'Лада',
    //     lastName: 'МаЛЬТА',
    //     email: 'admin3@mail.com',
    //     password: 'password123'
    //   },
    //   {
    //     id: 4,
    //     position: 'Ведущий разработчик',
    //     avatar: 'oscar.png',
    //     firstName: 'Оскар',
    //     lastName: 'Джонсон',
    //     email: 'admin4@mail.com',
    //     password: 'password123'
    //   }
    // ]
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
