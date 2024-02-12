// types
import { createSlice } from '@reduxjs/toolkit';

// ==============================|| SLICE - PORTFOLIO ||============================== //

const portfolio = createSlice({
  name: 'portfolio',
  initialState: {
    portfolio: [
      {
        id: 1,
        title: 'Сытый горец',
        bgColor: '#C21936',
        full: 'Приложение «Сытый горец»',
        type: 'app',
        describe: 'Приложение-агрегатор ресторанов кавказской кухни, позволяет пользователям делать заказы блюд с доставкой и самовывозом',
        cover: 'sytyygores.png',
        bg: 'Group 4.png',
        icon: 'icon.svg'
      },
      {
        id: 2,
        title: 'Цветы в метро',
        full: 'Приложение «Цветы в метро»',
        bgColor: '#E1868C',
        type: 'app',
        describe: 'Приложение-агрегатор ресторанов кавказской кухни, позволяет пользователям делать заказы блюд с доставкой и самовывозом',
        cover: 'flowers-metro.png',
        bg: 'front-view-of-fresh-delicate-rose 1.png',
        icon: 'Union.svg'
      },
      {
        id: 3,
        title: 'Tippify',
        full: 'Сервис «Tippify»',
        bgColor: '#3C45BA',
        type: 'app',
        describe: 'Приложение-агрегатор ресторанов кавказской кухни, позволяет пользователям делать заказы блюд с доставкой и самовывозом',
        cover: 'tippify-phone.png',
        bg: 'Vector (1).svg',
        icon: 'Tippify.png'
      },
      {
        id: 4,
        title: 'Начертательная геометрия',
        full: 'Сайт «Начертательная геометрия»',
        bgColor: '#007FB9',
        type: 'website',
        describe: 'Приложение-агрегатор ресторанов кавказской кухни, позволяет пользователям делать заказы блюд с доставкой и самовывозом',
        cover: '239.png',
        bg: null,
        icon: 'geometry.svg'
      }
    ]
  },
  reducers: {
    addPortfolio: (state, action) => {
      state.push(action.payload);
    },
    deletePortfolio: (state, action) => {
      const index = state.findIndex((portfolio) => portfolio.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editPortfolio: (state, action) => {
      const index = state.findIndex((portfolio) => portfolio.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { addPortfolio, deletePortfolio, editPortfolio } = portfolio.actions;

export default portfolio.reducer;
